declare namespace Express {
  interface Request {
    currentUserId?: string;
    session?: ClientSession;
    files?: FileArray | null | undefined;
  }
}
