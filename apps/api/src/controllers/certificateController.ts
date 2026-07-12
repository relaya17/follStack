import { AuthRequest } from '@/middleware/auth'
import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/middleware/errorHandler'
import {
  issueCertificateIfEligible,
  listUserCertificates,
  findCertificateByVerifyCode,
} from '@/services/certificateService'
import { getModuleCompletionStatus } from '@/services/lessonProgressService'

/**
 * @swagger
 * /api/certificates:
 *   get:
 *     summary: Get the logged-in user's real completion certificates
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 */
export const getCertificates = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const certificates = await listUserCertificates(req.user!.id)
    res.status(200).json({ success: true, count: certificates.length, data: certificates })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/certificates/status/{moduleId}:
 *   get:
 *     summary: Check real completion status for a module (used to show/hide the "get certificate" button)
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 */
export const getCertificateStatus = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { moduleId } = req.params
    const status = await getModuleCompletionStatus(req.user!.id, moduleId)
    if (!status) throw new AppError('מודול לא נמצא', 404)
    res.status(200).json({ success: true, data: status })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/certificates/generate:
 *   post:
 *     summary: Issue a certificate for a module — only succeeds if all lessons are actually completed
 *     tags: [Certificates]
 *     security:
 *       - bearerAuth: []
 */
export const generateCertificate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { moduleId } = req.body
    if (!moduleId || typeof moduleId !== 'string') {
      throw new AppError('moduleId הוא שדה חובה', 400)
    }

    const certificate = await issueCertificateIfEligible(req.user!.id, req.user!.name, moduleId)
    res.status(201).json({ success: true, data: certificate })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/certificates/verify/{code}:
 *   get:
 *     summary: Public verification of a certificate by its verify code — real DB lookup, no auth required
 *     tags: [Certificates]
 */
export const verifyCertificate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { code } = req.params
    const certificate = await findCertificateByVerifyCode(code)

    if (!certificate) {
      res.status(200).json({ success: true, data: { verified: false } })
      return
    }

    res.status(200).json({
      success: true,
      data: {
        verified: true,
        recipientName: certificate.recipientName,
        moduleTitle: certificate.moduleTitle,
        issuedAt: certificate.issuedAt,
        integrityHash: certificate.integrityHash,
      },
    })
  } catch (error) {
    next(error)
  }
}
