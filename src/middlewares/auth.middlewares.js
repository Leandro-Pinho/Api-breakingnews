import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../service/user.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        //console.log(authorization)
        if (!authorization) {
            return res.status(401).json({});
        }

        const parts = authorization.split(' ');

        if (parts.length !== 2) {
            return res.status(401)
        }

        const [schema, token] = parts

        if (schema !== "Bearer") {
            return res.status(401)
        }
        // console.log(process.env.SECRET_JWT)
        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Token invalido!" })
            }
            // console.log(decoded)
            const user = await userService.findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).json({ message: "Invalido token!" })
            }

            req.userId = user.id;
           
           return next();
        });

    } catch (error) {
        res.status(500).json(error)
    }
}