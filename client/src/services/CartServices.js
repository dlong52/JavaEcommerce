import axios from "axios";

const addToCart = async (productId, quantity, size, user_id) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API}/cart/add`, { 
            userId: user_id,
            productId: productId,
            quantity: quantity,
            size: size
        });
        return response?.data;
    } catch (error) {
        console.error('Error adding to cart:', error.response ? error.response.data : error.message);
    }
};

const getAllCartItems = async (user_id) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API}/cart/user/${user_id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching cart items:', error.response ? error.response.data : error.message);
    }
};

const updateCartItem = async (cart_item_id, quantity, size) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API}/cart/update`, {
            "cartItemId": cart_item_id,
            "quantity": quantity,
            "size": size
        }
        );
        return res.data;
    } catch (error) {
        console.error('Error updating cart item:', error.response ? error.response.data : error.message);
    }
};

const deleteCartItem = async (cart_item_id) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/cart/delete/${cart_item_id}`);
        return res.data;
    } catch (error) {
        console.error('Error deleting cart item:', error.response ? error.response.data : error.message);
    }
};

export {
    addToCart,
    getAllCartItems,
    updateCartItem,
    deleteCartItem
};
