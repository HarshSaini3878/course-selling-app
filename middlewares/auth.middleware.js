import jwt from 'jsonwebtoken';

export const isSignin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 
    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }

   
    const user = jwt.verify(token, process.env.JWT_SECRET);

  
    req.user_id = user.id;  
    next();
  } catch (error) {
    return res.status(403).json({
      message: "You are not signed in or the token is invalid."
    });
  }
};
