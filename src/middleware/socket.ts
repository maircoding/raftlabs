import { ISocket } from "../interfaces/socket";
import { User } from "../models/user";
import jwt from 'jsonwebtoken';

export const socketMiddleware = (socket: ISocket, next) => {
    
    const token = socket.handshake.query.token;
    if (token == undefined || !token) console.log('Authentication error, headers token not send')
    
    jwt.verify(token, 'LOCKED', async (err, decoded) => {
      if (err) return next(new Error('Authentication error'));
      
      const user = await User.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) {
        throw new Error('User Not Found');
      } 
  
      socket.user = user
      next();
    });
  }