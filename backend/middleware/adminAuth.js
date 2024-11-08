import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.json({
        success: false,
        message: "Token not found in headers",
      });
    }

    const [, token] = authorization.split(" ");
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      console.log(token_decode);
      return res.json({ success: false, message: "User is not admin" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
