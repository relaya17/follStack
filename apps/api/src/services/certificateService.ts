import { Certificate, ICertificate } from '@/models/Certificate'
import { getModuleCompletionStatus } from '@/services/lessonProgressService'
import { AppError } from '@/middleware/errorHandler'

/**
 * Issues a real completion certificate for a module, but only if the user has actually
 * completed every lesson in it (checked live against LessonProgress — see
 * getModuleCompletionStatus). Idempotent: calling this again for an already-earned
 * certificate just returns the existing record instead of creating a duplicate.
 */
export async function issueCertificateIfEligible(
  userId: string,
  recipientName: string,
  moduleId: string,
): Promise<ICertificate> {
  const existing = await Certificate.findOne({ user: userId, moduleId })
  if (existing) return existing

  const status = await getModuleCompletionStatus(userId, moduleId)
  if (!status) throw new AppError('מודול לא נמצא', 404)
  if (!status.isComplete) {
    throw new AppError(
      `עדיין לא השלמת את כל השיעורים במודול (${status.completedLessons}/${status.totalLessons}) — התעודה נפתחת רק אחרי סיום כל השיעורים.`,
      400,
    )
  }

  const certificate = await Certificate.create({
    user: userId,
    recipientName,
    moduleId,
    moduleTitle: status.moduleTitle,
  })

  return certificate
}

export async function listUserCertificates(userId: string): Promise<ICertificate[]> {
  return Certificate.find({ user: userId }).sort({ issuedAt: -1 })
}

export async function findCertificateByVerifyCode(verifyCode: string): Promise<ICertificate | null> {
  return Certificate.findOne({ verifyCode })
}
