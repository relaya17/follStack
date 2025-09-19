import { Router } from 'express'
import {
    getCertificates,
    generateCertificate,
    verifyCertificate,
    getCertificateDetails,
    downloadCertificate,
    transferCertificate
} from '@/controllers/blockchainController'
import { protect } from '@/middleware/auth'

const router = Router()

// All routes are protected
router.use(protect)

/**
 * @swagger
 * /api/blockchain/certificates:
 *   get:
 *     summary: Get user's blockchain certificates
 *     tags: [Blockchain Certificates]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Certificates retrieved successfully
 */
router.get('/certificates', getCertificates)

/**
 * @swagger
 * /api/blockchain/generate-certificate:
 *   post:
 *     summary: Generate a new blockchain certificate
 *     tags: [Blockchain Certificates]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moduleId
 *               - completionData
 *               - walletAddress
 *               - network
 *             properties:
 *               moduleId:
 *                 type: string
 *               completionData:
 *                 type: object
 *               walletAddress:
 *                 type: string
 *               network:
 *                 type: string
 *                 enum: [ethereum, polygon, bsc]
 *     responses:
 *       201:
 *         description: Certificate generated successfully
 */
router.post('/generate-certificate', generateCertificate)

/**
 * @swagger
 * /api/blockchain/verify-certificate/{id}:
 *   get:
 *     summary: Verify a blockchain certificate
 *     tags: [Blockchain Certificates]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate verification result
 */
router.get('/verify-certificate/:id', verifyCertificate)

/**
 * @swagger
 * /api/blockchain/certificate/{id}:
 *   get:
 *     summary: Get certificate details
 *     tags: [Blockchain Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate details retrieved successfully
 */
router.get('/certificate/:id', getCertificateDetails)

/**
 * @swagger
 * /api/blockchain/certificate/{id}/download:
 *   get:
 *     summary: Download certificate as PDF
 *     tags: [Blockchain Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate PDF downloaded
 */
router.get('/certificate/:id/download', downloadCertificate)

/**
 * @swagger
 * /api/blockchain/certificate/{id}/transfer:
 *   post:
 *     summary: Transfer certificate to another wallet
 *     tags: [Blockchain Certificates]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - toAddress
 *             properties:
 *               toAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Certificate transferred successfully
 */
router.post('/certificate/:id/transfer', transferCertificate)

export default router
