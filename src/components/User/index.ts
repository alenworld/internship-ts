import {Request, Response, NextFunction} from 'express'
import { IUserModel } from './model';
import UserService from './service'
import ValidationError from '../../error/ValidationError'

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users: IUserModel[]  = await UserService.findAll()

    res.status(200).json({
      data: users
    })
  } catch (error) {
    res.status(500).json({
      error: error.message,
      details: null
    })

    next(error)
  }
}

/**
 * @function
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
async function findById (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await UserService.findById(req.params.id)

    res.status(200).json({
      data: user
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        error: error.name,
        details: error.message
      })
    }

    res.status(500).json({
      message: error.name,
      details: error.message
    })

    return next(error)
  }
}

/**
 * @function
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
async function create (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user: IUserModel = await UserService.create(req.body)

    res.status(201).json({
      data: user
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: error.name,
        details: error.message
      })
    }

    res.status(500).json({
      message: error.name,
      details: error.message
    })

    return next(error)
  }
}

/**
 * @function
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
async function updateById (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const updatedUser: IUserModel = await UserService.updateById(req.body)

    res.status(200).json({
      data: updatedUser
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: error.name,
        details: error.message
      })
    }

    res.status(500).json({
      message: error.name,
      details: error.message
    })

    return next(error)
  }
}

/**
 * @function
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
async function deleteById (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const deletedUser: IUserModel = await UserService.deleteById(req.body.id)

    res.status(200).json({
      data: deletedUser
    })
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        message: error.name,
        details: error.message
      })
    }

    res.status(500).json({
      message: error.name,
      details: error.message
    })

    return next(error)
  }
}

export default {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
}
