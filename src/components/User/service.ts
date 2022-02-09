import Joi from 'joi'
import UserModel, { IUserModel } from './model'
import UserValidation from './validation';
import { Types } from 'mongoose';
import { IUserService } from './interface'


/**
 * @export
 * @implements {IUserModelService}
 */
const UserService: IUserService = {
  /**
   * @exports
   * @method findAll
   * @param {}
   * @summary get list of all users
   * @returns Promise<IUserModel[]>
   */
  async findAll (): Promise<IUserModel[]> {
    try {
      return await UserModel.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @exports
   * @method findById
   * @param {string} id
   * @summary get a user
   * @returns {Promise<IUserModel>}
   */
  async findById (id: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult = UserValidation.findById({
          id
      });

      if (validate.error) {
          throw new Error(validate.error.message);
      }

      return await UserModel.findOne({
          _id: new Types.ObjectId(id)
      });
    } catch (error) {
        throw new Error(error.message);
    }
  },

  /**
   * @exports
   * @method create
   * @param {IUserModel} user
   * @summary create a new user
   * @memberof UserService
   * @returns {Promise<UserModel>}
   */
  async create (body: IUserModel): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult = UserValidation.create(body);

      if (validate.error) {
          throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.create(body);

      return user;
    } catch (error) {
        throw new Error(error.message);
    }
  },

  /**
   * Find a user by id and update his profile
   * @exports
   * @method updateById
   * @param {string} _id
   * @param {object} newProfile
   * @summary update a user's profile
   * @returns {Promise<void>}
   */
  async updateById (body: IUserModel): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult = UserValidation.updateById(body);

      if (validate.error) {
          throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.findByIdAndUpdate({_id: new Types.ObjectId(body.id)}, body)

      return user;
  } catch (error) {
      throw new Error(error.message);
  }
  },

  /**
   * @exports
   * @method deleteById
   * @param {string} _id
   * @summary delete a user from database
   * @returns {Promise<void>}
   */
  async deleteById (id: string): Promise<IUserModel> {
    try {
      const validate: Joi.ValidationResult = UserValidation.deleteById({
          id
      });

      if (validate.error) {
          throw new Error(validate.error.message);
      }

      const user: IUserModel = await UserModel.findOneAndRemove({
          _id: new Types.ObjectId(id)
      });

      return user;
    } catch (error) {
        throw new Error(error.message);
    }
  }
}

export default UserService;