import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { v4 } from 'uuid';
import { getClientIp } from 'request-ip';
import { JwtPayload } from './jwt.strategy';
import { RefreshToken, UserSchemaInterface } from '@saas-quick-start/infrastructure/database/models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('RefreshToken')
    private readonly refreshTokenModel: Model<RefreshToken>,
    @InjectModel('User')
    private userModel: Model<UserSchemaInterface>,
  ) { }

  async createAccessToken(userId: string) {
    const accessToken = sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
    return this.encryptText(accessToken);
  }

  async createRefreshToken(req: Request, userId: string): Promise<string> {
    const refreshToken = new this.refreshTokenModel({
      userId,
      refreshToken: v4(),
      ip: this.getIp(req),
      browser: this.getBrowserInfo(req),
      country: this.getCountry(req),
    });
    await refreshToken.save();
    return refreshToken.refreshToken;
  }

  async findRefreshToken(token: string): Promise<string> {
    const refreshToken = await this.refreshTokenModel.findOne({
      refreshToken: token,
    });
    if (!refreshToken) {
      throw new UnauthorizedException('User has been logged out.');
    }
    return refreshToken.userId;
  }

  async validateUser(jwtPayload: JwtPayload): Promise<UserSchemaInterface> {
    const user = await this.userModel.findById(jwtPayload.userId);
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  private jwtExtractor(request: Request): Promise<string> {
    // TODO lo primero que hace es buscar el token en el header !!! TODO implement for company
    let token = null;
    if (request.header('x-token')) {
      token = request.get('x-token');
    } else if (request.headers.authorization) {
      token = request.headers.authorization
        .replace('Bearer ', '')
        .replace(' ', '');
    } else if (request.body.token) {
      token = request.body.token.replace(' ', '');
    }
    if (request.query.token) {
      token = request.body.token.replace(' ', '');
    }
    if (token) {
      // try {
      //   token = JSON.parse(
      //     CryptoTS.AES.decrypt(token, process.env.ENCRYPT_JWT_SECRET).toString(
      //       CryptoTS.enc.Utf8,
      //     ),
      //   );
      // } catch (err) {
      //   throw new BadRequestException('Bad request.');
      // }
    }
    return token;
  }

  returnJwtExtractor() {
    return this.jwtExtractor;
  }

  getIp(req: Request): string {
    return getClientIp(req);
  }

  getBrowserInfo(req: Request): string {
    return req.header['user-agent'] || 'XX';
  }

  getCountry(req: Request): string {
    return req.header['cf-ipcountry'] ? req.header['cf-ipcountry'] : 'XX';
  }

  encryptText(text: string): string {
    return text;
    // return CryptoTS.AES.encrypt(
    //   JSON.stringify(text),
    //   process.env.ENCRYPT_JWT_SECRET,
    // ).toString();
  }
}
