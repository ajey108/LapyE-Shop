import jwt from "jsonwebtoken";



const adminAuth = async (req, res, next) => {
    try {
        const {token} =req.headers;
        if(!token){
            return res.json({success:false,message:"Unauthorized"})
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Unauthorized"})
        }

        next()

    } catch(error){
        console.log(error)
        return res.status(401).json({success:false,message:"Unauthorized"})
    }

}

export default adminAuth;
             