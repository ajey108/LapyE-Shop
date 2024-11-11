import userModel from "../models/userModel.js";



//add products to user cart



const addToCart = async (req, res) => {
    
    try {
      const { userId, itemId, selectedVariant, quantity } = req.body;
  
     
      const userData = await userModel.findById(userId);
  
      if (!userData) {
        return res.json({ success: false, message: "User not found" });
      }
  
      if (!userData.cartData) {
        userData.cartData = {};
      }
  
      if (!userData.cartData[itemId]) {
        userData.cartData[itemId] = {};
      }
  
      if (userData.cartData[itemId][selectedVariant]) {
        userData.cartData[itemId][selectedVariant] += quantity;
      } else {
        userData.cartData[itemId][selectedVariant] = quantity;
      }
  
      await userData.save();
  
      res.json({ success: true, message: "Product added to cart" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };


//update user cart

const updateCart = async (req, res) => {
    try{

        const {userId, itemId, selectedVariant, quantity} = req.body;
        const userData = await userModel.findById(userId);
        //extract cart data
        let cartData = await userData.cartData;

        cartData[itemId][selectedVariant] = quantity
        await userModel.findByIdAndUpdate(userId, {cartData })
        res.json({ success: true, message: "Cart updated" })

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}




//get user cart data

const getUserCart = async (req, res) => {
    try{
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        //extract cart data
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    }catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



export { addToCart, updateCart, getUserCart }


