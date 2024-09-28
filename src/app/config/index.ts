import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  bcrypt_salt_rounds: process.env.BYCRIPT_PASS,
  reset_password_email: process.env.RESET_PASSWORD_EMAIL,
  reset_password_password: process.env.RESET_PASSWORD_PASSWORD,
};
