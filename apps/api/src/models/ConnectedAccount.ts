import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export type IntegrationProvider = 'github' | 'vercel' | 'render'

export interface IConnectedAccount extends Document {
  user: Types.ObjectId
  provider: IntegrationProvider
  providerAccountId: string
  providerUsername?: string
  accessToken: string
  refreshToken?: string
  tokenExpiresAt?: Date
  scopes: string[]
  metadata: Record<string, unknown>
  connectedAt: Date
  lastSyncedAt?: Date
  createdAt: Date
  updatedAt: Date
}

interface IConnectedAccountModel extends Model<IConnectedAccount> {}

const ConnectedAccountSchema = new Schema<IConnectedAccount>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    provider: {
      type: String,
      enum: ['github', 'vercel', 'render'],
      required: true,
    },
    providerAccountId: { type: String, required: true },
    providerUsername: { type: String },
    accessToken: { type: String, required: true, select: false },
    refreshToken: { type: String, select: false },
    tokenExpiresAt: { type: Date },
    scopes: { type: [String], default: [] },
    metadata: { type: Schema.Types.Mixed, default: {} },
    connectedAt: { type: Date, default: Date.now },
    lastSyncedAt: { type: Date },
  },
  { timestamps: true },
)

ConnectedAccountSchema.index({ user: 1, provider: 1 }, { unique: true })

export const ConnectedAccount = mongoose.model<IConnectedAccount, IConnectedAccountModel>(
  'ConnectedAccount',
  ConnectedAccountSchema,
)
