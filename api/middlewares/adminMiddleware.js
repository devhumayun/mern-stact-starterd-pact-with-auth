import createError from "../controllers/createError.js";
import jwt from 'jsonwebtoken';

//  authenticated middlewares"
export const adminMiddleware = ( req, res, next ) => {

    try{

        const token = req.cookies.access_token

        // checked token
        if( !token ){
            return next(createError(401, "You are not authenticated!"))
        }

        // verify token
        const loin_user = jwt.verify(token, process.env.TOKEN_SECRET);

        if(!loin_user){
            return next(createError(401, "Invalid Token!"))
        }

        if( !loin_user.isAdmin ){
            return next(createError(401, "Only admin can access"))
        }

        if(loin_user){
            req.user = loin_user;
            next();
        }

    }catch(error){
        next(error)
    }
    

};


