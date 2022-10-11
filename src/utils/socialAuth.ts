import { OAuth2Client, TokenPayload } from 'google-auth-library';

const client = new OAuth2Client(String(process.env.CLIENT_ID));

export const verifyGoogleIDToken = async (token: string): Promise<boolean> => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const payload: TokenPayload = ticket.getPayload() as TokenPayload;
  if (payload) {
    return true;
  }
  return false;
};
