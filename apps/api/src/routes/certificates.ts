import { Router } from 'express'
import {
  getCertificates,
  getCertificateStatus,
  generateCertificate,
  verifyCertificate,
} from '@/controllers/certificateController'
import { protect } from '@/middleware/auth'

const router = Router()

// Public — anyone with a verify code (e.g. a recruiter) can confirm a certificate is real.
router.get('/verify/:code', verifyCertificate)

router.use(protect)

router.get('/', getCertificates)
router.get('/status/:moduleId', getCertificateStatus)
router.post('/generate', generateCertificate)

export default router
