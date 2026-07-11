import { Response, NextFunction } from 'express'
import { AuthRequest } from '@/middleware/auth'
import { AppError } from '@/middleware/errorHandler'
import { Event, EventType } from '@/models/Event'

const EVENT_TYPES: EventType[] = ['workshop', 'meetup', 'hackathon', 'webinar']

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get upcoming community events (real, DB-backed)
 *     tags: [Events]
 */
export const getEvents = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const events = await Event.find({ date: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } })
      .sort({ date: 1 })
      .populate('createdBy', 'name avatar')
      .lean()

    const userId = req.user?.id

    const data = events.map((e) => ({
      id: String(e._id),
      title: e.title,
      description: e.description,
      type: e.type,
      date: e.date,
      link: e.link,
      location: e.location,
      participantsCount: e.participants.length,
      isRegistered: userId ? e.participants.some((p) => String(p) === String(userId)) : false,
      createdBy: e.createdBy,
    }))

    res.status(200).json({ success: true, count: data.length, data })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a community event (mentor/admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
export const createEvent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, type, date, link, location } = req.body

    if (!title || !description || !type || !date || !link) {
      throw new AppError('כותרת, תיאור, סוג, תאריך וקישור הם שדות חובה', 400)
    }
    if (!EVENT_TYPES.includes(type)) {
      throw new AppError('סוג אירוע לא תקין', 400)
    }
    const parsedDate = new Date(date)
    if (Number.isNaN(parsedDate.getTime())) {
      throw new AppError('תאריך לא תקין', 400)
    }

    const event = await Event.create({
      title,
      description,
      type,
      date: parsedDate,
      link,
      location: location || 'אונליין',
      createdBy: req.user!.id,
      participants: [],
    })

    res.status(201).json({ success: true, data: event })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/events/{id}/register:
 *   post:
 *     summary: Register the current user for an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
export const registerForEvent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    if (!event) throw new AppError('אירוע לא נמצא', 404)

    const userId = req.user!.id
    if (!event.participants.some((p) => String(p) === String(userId))) {
      event.participants.push(req.user!._id as any)
      await event.save()
    }

    res.status(200).json({ success: true, data: { participantsCount: event.participants.length } })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/events/{id}/unregister:
 *   post:
 *     summary: Unregister the current user from an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
export const unregisterFromEvent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    if (!event) throw new AppError('אירוע לא נמצא', 404)

    const userId = req.user!.id
    event.participants = event.participants.filter((p) => String(p) !== String(userId))
    await event.save()

    res.status(200).json({ success: true, data: { participantsCount: event.participants.length } })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event (creator or admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 */
export const deleteEvent = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    if (!event) throw new AppError('אירוע לא נמצא', 404)

    if (String(event.createdBy) !== String(req.user!.id) && req.user!.role !== 'admin') {
      throw new AppError('אין הרשאה למחוק אירוע זה', 403)
    }

    await event.deleteOne()
    res.status(200).json({ success: true, message: 'האירוע נמחק בהצלחה' })
  } catch (error) {
    next(error)
  }
}
