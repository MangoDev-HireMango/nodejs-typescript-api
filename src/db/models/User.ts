import mongoose, { Schema } from 'mongoose';
import { IUser } from '@interfaces/models';
import { comparePasswords, hashPassword } from '@utils/password';

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String },
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: process.env.DEFAULT_AVATAR_IMG },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = (await hashPassword(this.password)) as string;
  }
  next();
});

userSchema.methods.isValidPassword = function (password: string): Promise<boolean> {
  return comparePasswords(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
