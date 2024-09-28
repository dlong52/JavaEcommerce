import axios from 'axios'
import env from 'dotenv'
const axiosJwt = axios.create()
const getAllCategories = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API}/categories`)    
    return res.data
}
const getDetailCategory = async (id) => {
    try {
        const res = await axiosJwt.get(`${import.meta.env.VITE_API}/categories/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching category details:', error.response || error.message);
        throw error; 
    }
};
const createCategory = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/categories`, data)    
    return res.data
}
const updateCategory = async (id, data) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API}/categories/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error update user:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
}
const deleteCategory = async (id) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/categories/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error delete category:', error.response || error.message);
        throw error; 
    }
}
export {
    getAllCategories,
    createCategory,
    updateCategory,
    getDetailCategory,
    deleteCategory
}