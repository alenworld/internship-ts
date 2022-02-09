import { UpdateQuery, UpdateWithAggregationPipeline } from 'mongoose'
import User, {UserModel} from './model'

/**
 * @exports
 * @method findAll
 * @param {}
 * @summary get list of all users
 * @returns Promise<UserModel[]>
 */
function findAll (): Promise<UserModel[]> {
  return User.find({}).exec()
}

/**
 * @exports
 * @method findById
 * @param {string} id
 * @summary get a user
 * @returns {Promise<UserModel>}
 */
function findById (id: String): Promise<UserModel> {
  return User.findById(id).exec()
}

/**
 * @exports
 * @method create
 * @param {object} profile
 * @summary create a new user
 * @returns {Promise<UserModel>}
 */
function create (profile: object): Promise<UserModel> {
  return User.create(profile)
}

/**
 * Find a user by id and update his profile
 * @exports
 * @method updateById
 * @param {string} _id
 * @param {object} newProfile
 * @summary update a user's profile
 * @returns {Promise<void>}
 */
function updateById (_id: String, newProfile: UpdateQuery<UserModel> | UpdateWithAggregationPipeline) {
  return User.updateOne({ _id }, newProfile).exec()
}

/**
 * @exports
 * @method deleteById
 * @param {string} _id
 * @summary delete a user from database
 * @returns {Promise<void>}
 */
function deleteById (_id: String) {
  return User.deleteOne({ _id }).exec()
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById
}
