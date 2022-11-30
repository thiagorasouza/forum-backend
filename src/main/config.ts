export const config = {
  saltRounds: 12,

  getPort: (): number => {
    if (!process.env.PORT) {
      throw new Error("PORT is not set in process.env");
    }

    return Number(process.env.PORT);
  },

  getSequelizeUri: (): string => {
    if (!process.env.DATABASE_URI) {
      throw new Error("DATABASE_URI is not set in process.env");
    }

    return process.env.DATABASE_URI;
  },
};
