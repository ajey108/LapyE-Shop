import userModel from "../models/userModel.js";

//add products to user cart

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, selectedVariant, quantity } = req.body;
    console.log("Request Body:", req.body);
    console.log("Request Body:", req.body);

    // Check if quantity is valid
    if (
      quantity === undefined ||
      quantity === null ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return res.json({ success: false, message: "Invalid quantity" });
    }

    // Build path for variant within item
    const variantPath = `cartData.${itemId}.${selectedVariant}`;
    console.log("Quantity:", quantity);
    // Use $set to explicitly set the quantity for the specific variant
    await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          [`cartData.${itemId}.${selectedVariant}`]: quantity,
        },
      },
      { new: true, upsert: true }
    );

    res.json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//update user cart

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, selectedVariant, quantity } = req.body;
    const userData = await userModel.findById(userId);
    //extract cart data
    let cartData = await userData.cartData;

    cartData[itemId][selectedVariant] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//get user cart data

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    let cartData = userData.cartData ? userData.cartData : []; // add a default value if cartData is null

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
