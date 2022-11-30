export const config = {
  getSequelizeUri: (): string => {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not set in process.env");
    }

    return process.env.DATABASE_URI;
  },
};
