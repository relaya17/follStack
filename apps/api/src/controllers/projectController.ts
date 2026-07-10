import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import { Project } from '@/models/Project'
import { AppError } from '@/middleware/errorHandler'

function catalogItem(p: any) {
  return {
    id: String(p._id),
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    technologies: p.technologies,
    difficulty: p.difficulty,
    estimatedTime: p.estimatedTime,
    status: p.status,
    contributors: p.members?.length ?? 0,
    stars: p.starredBy?.length ?? 0,
    lastUpdated: p.updatedAt,
  }
}

/**
 * @swagger
 * /api/project:
 *   get:
 *     summary: Get all projects (public catalog)
 *     tags: [Project]
 */
export const getProjects = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, category, difficulty } = req.query
    const query: Record<string, unknown> = { isPublished: true }
    if (status) query.status = status
    if (category) query.category = category
    if (difficulty) query.difficulty = difficulty

    const projects = await Project.find(query).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects.map(catalogItem),
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 */
export const createProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description, category, technologies, difficulty, estimatedTime, maxMembers, repoUrl } = req.body

    if (!title || !description || !category) {
      throw new AppError('כותרת, תיאור וקטגוריה הם שדות חובה', 400)
    }

    const slug = String(title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9֐-׿\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 60) + '-' + Date.now().toString(36)

    const project = await Project.create({
      title,
      slug,
      description,
      category,
      technologies: technologies || [],
      difficulty: difficulty || 'beginner',
      estimatedTime: estimatedTime || 'לא צוין',
      status: 'planned',
      isTemplate: false,
      maxMembers,
      repoUrl,
      isPublished: true,
      members: [{ user: req.user!.id, role: 'owner' }],
      createdBy: req.user!.id,
      updatedBy: req.user!.id,
    })

    res.status(201).json({ success: true, data: catalogItem(project) })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/project/{id}:
 *   get:
 *     summary: Get a specific project
 *     tags: [Project]
 */
export const getProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params

    const project = id.match(/^[0-9a-fA-F]{24}$/)
      ? await Project.findById(id).populate('members.user', 'name avatar').populate('createdBy', 'name avatar')
      : await Project.findOne({ slug: id }).populate('members.user', 'name avatar').populate('createdBy', 'name avatar')

    if (!project) {
      throw new AppError('פרויקט לא נמצא', 404)
    }

    res.status(200).json({
      success: true,
      data: {
        ...catalogItem(project),
        maxMembers: project.maxMembers,
        repoUrl: project.repoUrl,
        createdBy: project.createdBy,
        members: project.members,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/project/{id}:
 *   put:
 *     summary: Update a project (owner only)
 *     tags: [Project]
 */
export const updateProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)

    if (!project) throw new AppError('פרויקט לא נמצא', 404)
    if (String(project.createdBy) !== req.user!.id) {
      throw new AppError('רק היוצר יכול לעדכן את הפרויקט', 403)
    }

    const allowed = ['title', 'description', 'category', 'technologies', 'difficulty', 'estimatedTime', 'status', 'repoUrl']
    for (const key of allowed) {
      if (key in req.body) (project as any)[key] = req.body[key]
    }
    project.updatedBy = req.user!.id as any
    await project.save()

    res.status(200).json({ success: true, data: catalogItem(project) })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/project/{id}:
 *   delete:
 *     summary: Delete a project (owner only)
 *     tags: [Project]
 */
export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)

    if (!project) throw new AppError('פרויקט לא נמצא', 404)
    if (String(project.createdBy) !== req.user!.id) {
      throw new AppError('רק היוצר יכול למחוק את הפרויקט', 403)
    }

    await project.deleteOne()
    res.status(200).json({ success: true, message: 'פרויקט נמחק בהצלחה' })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/project/{id}/join:
 *   post:
 *     summary: Join a project
 *     tags: [Project]
 */
export const joinProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)
    if (!project) throw new AppError('פרויקט לא נמצא', 404)

    const alreadyMember = project.members.some((m) => String(m.user) === req.user!.id)
    if (alreadyMember) {
      res.status(200).json({ success: true, message: 'כבר הצטרפת לפרויקט הזה' })
      return
    }

    if (project.maxMembers && project.members.length >= project.maxMembers) {
      throw new AppError('הפרויקט מלא', 400)
    }

    project.members.push({ user: req.user!.id, role: 'developer', joinedAt: new Date() } as any)
    await project.save()

    res.status(200).json({ success: true, message: 'הצטרפת לפרויקט בהצלחה', data: catalogItem(project) })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/project/{id}/leave:
 *   post:
 *     summary: Leave a project
 *     tags: [Project]
 */
export const leaveProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)
    if (!project) throw new AppError('פרויקט לא נמצא', 404)

    project.members = project.members.filter((m) => String(m.user) !== req.user!.id) as any
    await project.save()

    res.status(200).json({ success: true, message: 'עזבת את הפרויקט בהצלחה', data: catalogItem(project) })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/project/{id}/star:
 *   post:
 *     summary: Star or unstar a project (toggle)
 *     tags: [Project]
 */
export const toggleStarProject = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const project = await Project.findById(id)
    if (!project) throw new AppError('פרויקט לא נמצא', 404)

    const userId = req.user!.id
    const alreadyStarred = project.starredBy.some((u) => String(u) === userId)

    if (alreadyStarred) {
      project.starredBy = project.starredBy.filter((u) => String(u) !== userId) as any
    } else {
      project.starredBy.push(userId as any)
    }
    await project.save()

    res.status(200).json({
      success: true,
      starred: !alreadyStarred,
      stars: project.starredBy.length,
    })
  } catch (error) {
    next(error)
  }
}
