import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  db: {
    host:
      process.env.NODE_ENV === "production"
        ? process.env.MYSQLHOST
        : process.env.DEV_DB_HOST || "localhost",
    port:
      process.env.NODE_ENV === "production"
        ? process.env.MYSQLPORT
        : process.env.DEV_DB_PORT || 3306,
    name:
      process.env.NODE_ENV === "production"
        ? process.env.MYSQLDATABASE
        : process.env.DEV_DB_NAME || "my_database",
    user:
      process.env.NODE_ENV === "production"
        ? process.env.MYSQLUSER
        : process.env.DEV_DB_USER || "root",
    password:
      process.env.NODE_ENV === "production"
        ? process.env.MYSQLPASSWORD
        : process.env.DEV_DB_PASSWORD || "",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your_secret_key",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
};
