// import jwt from "jsonwebtoken";
// import { createError } from "../utils/error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return next(createError(401, "You are not authenticated!"));
//   }

//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) return next(createError(403, "Token is not valid!"));
//     req.user = user;
//     next();
//   });
// };


import  jwt from "jsonwebtoken";

// METHOD:      ALL
// MESSAGE:     To verify user auth token before modifying the db
export const verifyToken = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
  }
  if (!token) {
      return res.status(403).json({
          message: "No token, authorization denied",
      });
  }

  try {
      await jwt.verify(token, process.env.JWT, (err, decoded) => {
          if (err) {
              return res.status(403).send({
                  message: "You are not authorized",
              });
          }
          const { id, exp } = decoded;
          req.userId = id;
          const expDate = new Date(exp * 1000);
          const present = new Date();

          //Checking expiry date;
          if (expDate.getTime() < present.getTime())
              return res.status(403).json({
                  message: "Token expired",
              });
          next();
      });
  } catch (error) {
      console.log("authMiddleware() Failed!", req.originalUrl, error);
      res.status(500).json({
          message: error,
      });
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};