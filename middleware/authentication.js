import { StatusCodes } from "http-status-codes";
import jwt  from "jsonwebtoken";
import "dotenv/config"

export const checkToken = ( req ) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer"){
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

export const authentication = ( req, res, next ) => {
    try {
        const token = checkToken( req )
        if (!token || token === null){
            return res.status(StatusCodes.FORBIDDEN).json({
                message: "No token in header, Authorization denied"
            })
        }

        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch(err) {
        console.error(err.message)
        return res.status(StatusCodes.FORBIDDEN).json({
            message: "Token Expired",
            code: StatusCodes.FORBIDDEN
        })
    }
}