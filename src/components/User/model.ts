import { Schema, Document } from 'mongoose'
import connections from '../../config/connection'

export interface IUserModel extends Document {
  fullName: string
  email: string
}

const UserSchema: Schema = new Schema(
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

export default connections.model<IUserModel>('UserModel', UserSchema)
