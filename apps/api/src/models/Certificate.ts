import mongoose, { Document, Schema } from 'mongoose'
import crypto from 'crypto'

/**
 * Real completion certificate — issued only once a user has actually completed every
 * lesson in a module (see certificateService.issueCertificateIfEligible / getModuleCompletionStatus).
 *
 * This replaces a previous "blockchain certificate" feature that was explicitly a mock
 * (random fake transaction IDs / block numbers, no real chain, no persistence). This
 * version is honest about what it is: an internal, DB-backed record with a verification
 * code and a SHA-256 integrity hash — not a blockchain, not an NFT. It can be verified by
 * anyone via the public verify endpoint, which looks up the real record in this collection.
 */
export interface ICertificate extends Document {
  user: mongoose.Types.ObjectId
  recipientName: string
  moduleId: string
  moduleTitle: string
  verifyCode: string
  integrityHash: string
  issuedAt: Date
}

const CertificateSchema = new Schema<ICertificate>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipientName: { type: String, required: true },
  moduleId: { type: String, required: true },
  moduleTitle: { type: String, required: true },
  verifyCode: { type: String, required: true, unique: true },
  integrityHash: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now },
})

CertificateSchema.index({ user: 1, moduleId: 1 }, { unique: true })

CertificateSchema.pre('validate', function (next) {
  if (!this.verifyCode) {
    this.verifyCode = crypto.randomBytes(12).toString('hex')
  }
  if (!this.integrityHash) {
    this.integrityHash = crypto
      .createHash('sha256')
      .update(`${String(this.user)}|${this.moduleId}|${this.recipientName}|${this.issuedAt?.toISOString() ?? new Date().toISOString()}`)
      .digest('hex')
  }
  next()
})

export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema)
