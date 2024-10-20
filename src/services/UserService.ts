import { DeepPartial } from "typeorm";
import bcrypt from 'bcryptjs';
import { User } from "../entities/user.entity";
import { AppDataSource, getConfig, signJwt } from "../utils";

export class UserService {
  private static readonly userRepository = AppDataSource.getRepository(User);

  public static async create(payload: DeepPartial<User>): Promise<User> {
    if (!payload.password) {
      throw new Error("Password is required");
    }
    // const create = this.userRepository.create(payload);
    // return this.userRepository.save(create);

    const hashedPassword = await bcrypt.hash(payload.password, 10);    
    payload.password = hashedPassword;    
    return await AppDataSource.query(
      `INSERT INTO users (firstname, lastname, email, password)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [payload.firstname, payload.lastname, payload.email, payload.password] 
    );
  }

  public static findByEmail(email: User["email"]): Promise<User | null> {
    return this.userRepository
      .query("SELECT * FROM users WHERE email = $1", [email])
      .then((res) => res?.length > 0 ? res[0] : null);
  }

  public static async signTokens(user: User) {    
    const access_token = signJwt({ sub: user.email, id: user.id}, "accessTokenPrivateKey", {
      expiresIn: `${getConfig<number>("accessTokenExpiresIn")}m`,
    });

    const refresh_token = signJwt({ sub: user.email, id: user.id }, "refreshTokenPrivateKey", {
      expiresIn: `${getConfig<number>("refreshTokenExpiresIn")}m`,
    });

    return { access_token, refresh_token };
  }
}
