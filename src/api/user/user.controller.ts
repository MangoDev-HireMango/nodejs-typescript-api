import { Response, Request } from 'express';
import { uploadFile } from '@utils/s3';
import { generateToken } from '@utils/jwt';
import statusCodes from '@constants/statusCodes';
import jsonResponse from '@utils/jsonResponse';
import { UserModel } from '@models';

/**
 * @author Mwibutsa Floribert
 */
class UserController {
  /**
   * @author Mwibutsa Floribert
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async createAccount(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    // check duplicates

    let profileURL = '';

    const existingUserEmail = await UserModel.findOne({
      email: body.email,
    });

    const existingUserPhoneNumber = await UserModel.findOne({
      phoneNumber: body.phoneNumber,
    });

    const existingUserUsername = await UserModel.findOne({
      username: body.username,
    });

    if (existingUserEmail || existingUserPhoneNumber || existingUserUsername) {
      return jsonResponse({
        status: statusCodes.HTTP_CONFLICT,
        res,
        errors: {
          email: existingUserEmail ? 'Email is already in use' : undefined,
          phoneNumber: existingUserPhoneNumber ? 'Phone number is already in use' : undefined,
          username: existingUserUsername ? 'Username is taken' : undefined,
        },
      });
    }

    if (req.files && req.files.profilePic) {
      const uploadResult = await uploadFile(req.files.profilePic);
      profileURL = uploadResult.Location;
    }

    const newUser = await UserModel.create({ ...body, profilePic: profileURL });

    return jsonResponse({
      res,
      data: newUser,
      token: generateToken({ id: newUser.id }),
      status: statusCodes.HTTP_CREATED,
    });
  }

  /**
   * @author Mwibutsa Floribert
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise} -
   */
  static async userLogin(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const user = await UserModel.findOne({
      $or: [{ email: body.accountIdentifier }, { username: body.accountIdentifier }],
    });

    if (user && (await user.isValidPassword(body.password))) {
      return jsonResponse({
        res,
        token: generateToken({ id: user.id }),
        data: user,
      });
    }

    return jsonResponse({
      res,
      message: 'Invalid account credentials',
      status: statusCodes.HTTP_UNAUTHORIZED,
    });
  }
}

export default UserController;
