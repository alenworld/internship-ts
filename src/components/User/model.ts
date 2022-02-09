import { Schema, Document } from 'mongoose'
import connections from '../../config/connection'

export interface UserModel extends Document {
  fullName: string
  email: string
}

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: true
    }
  },
  {
    collection: 'usermodel',
    versionKey: false
  }
)

export default connections.model<UserModel>('UserModel', UserSchema)
