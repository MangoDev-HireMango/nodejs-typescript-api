import bcrypt from 'bcryptjs';

/**
 * @author Mwibutsa Floribert
 * @param {string} password
 * @returns {Promise<string>} hashedPassword
 */
export const hashPassword = async (password: string): Promise<string | unknown> => {
  const saltRounds = 10;
  const saltString = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, saltString);
};

/**
 * @author Mwibutsa Floribert
 * @param {string} plainPassword
 * @param {string} hashedPassword
 * @returns {Promise<boolean>} comparison result
 */
export const comparePasswords = (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
