import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Create a new cartData object
    const cartData = { ...userData.cartData };

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Use markModified to ensure Mongoose detects the change to the object
    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // Create a new cartData object to ensure proper tracking of changes
    const cartData = { ...userData.cartData };

    if (quantity > 0) {
      // Update quantity
      if (cartData[itemId]) {
        cartData[itemId][size] = quantity;
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = quantity;
      }
    } else {
      // Remove item if quantity is 0
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];

        // If no sizes left for this item, remove the item
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    }

    // Save updated cart data and mark as modified
    userData.cartData = cartData;
    userData.markModified("cartData");
    await userData.save();

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
