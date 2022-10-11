import { ObjectId } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  middleName: string;
  username: string;
  email: string;
  phoneNumber: string;
  profilePic?: string;
  password: string;
  isValidPassword: (password: string) => Promise<boolean>;
  id?: ObjectId;
}
