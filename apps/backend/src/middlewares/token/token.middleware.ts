import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    try {
      const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
        email: string;
        id: string;
      };

      req.headers['email'] = decoded.email;
      req.headers['userId'] = decoded.id;

      next();
    } catch {
      return res.status(403).json({ message: 'Forbidden' });
    }
  }
}
