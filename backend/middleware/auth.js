import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // Extract the token from Authorization header
    const authHeader = req.headers.authorization;
    console.log("authHeader is", authHeader);
    console.log("All headers from auth middleware:", req.headers);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized. Login Again" });
    }
    const token = authHeader.split(" ")[1];
    console.log("token in auth.js is", token);

    // Verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("token decode is", token_decode);

    // Attach user info to the request
    req.user = { id: token_decode.id };

    // Continue to the next middleware
    next();
  } catch (error) {
    console.error("Error in auth middleware:", error);

    // Handle JWT errors
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Session expired. Login again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token. Login again." });
    }
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default authUser;
