import { PrivateKey } from "../types";
import jwt, { SignOptions } from "jsonwebtoken";
import { getConfig } from "./config";

export const signJwt = <T extends string | Buffer | object>(
    payload: T,
    keyName: PrivateKey,
    options: SignOptions
 ): string => {      
    const privateKey = Buffer.from(
       getConfig<string>(keyName),
       'base64'
    ).toString('ascii');    
 
    return jwt.sign(payload, privateKey, {
       ...(options && options),
       issuer: 'nuTech',
       algorithm: 'HS256',
      //  algorithm: 'RS256',
    });
 
 };