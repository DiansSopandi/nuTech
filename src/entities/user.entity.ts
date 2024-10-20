import { BeforeInsert, Column, Entity } from "typeorm"
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import BaseEntity from "./base.entity";
import { NextFunction } from "express";

@Entity('users')
export class User extends BaseEntity {
    @Column({
        unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    private _isPasswordModified: boolean = false;

    @BeforeInsert()
    async hashPassword(next: NextFunction) {
      // if (this._isPasswordModified ) return next();
      if (!this._isPasswordModified ) {
         const salt = await bcrypt.genSalt(12);
         this.password = await bcrypt.hash(this.password, salt);
         this._isPasswordModified = true;
         // next();
       }      
    }    

//     setPassword(value: string) {
//       this._isPasswordModified = true;
//       this.password = value;
//     }    

//     getPassword(): string {
//       return this.password;
//   }    

    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
     ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
     }     
  
     static createVerificationCode() {
        const verificationCode = crypto.randomBytes(32).toString('hex');
        const hashedVerificationCode = crypto
           .createHash('sha256')
           .update(verificationCode)
           .digest('hex');
  
        return { verificationCode, hashedVerificationCode };
     }
  
     toJSON() {
        return { ...this, password: undefined, verificationCode: undefined };
     }    
}