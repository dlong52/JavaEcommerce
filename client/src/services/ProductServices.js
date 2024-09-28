import axios from 'axios'
import env from 'dotenv'
const axiosJwt = axios.create()
const getAllProducts = async ({ queryKey }) => {
    const [_key, filters] = queryKey;

    const params = new URLSearchParams();
console.log(filters);

    if (filters.name) params.append('search', filters.name);
    if (filters.categoryId) params.append('categoryId', filters.categoryId);
    if (filters.collectionId) params.append('collectionId', filters.collectionId);
    if (filters.size) params.append('size', filters.size);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.status !== undefined) params.append('status', filters.status);
    if (filters.page) params.append('page', filters.page);
    if (filters.pagesize) params.append('pagesize', filters.pagesize);

    const res = await axios.get(`${import.meta.env.VITE_API}/products?${params.toString()}`);
    return res.data;
};

const getDetailProduct = async (id, accessToken) => {
    try {
        const res = await axiosJwt.get(`${import.meta.env.VITE_API}/products/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`, // Đảm bảo token được gửi với tiền tố Bearer
            },
            withCredentials: true,  // Cho phép gửi cookie nếu cần
        });
        return res.data;
    } catch (error) {
        console.error('Error fetching user details:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
};
const createProduct = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/products`, data)
    return res.data
}
const updateProduct = async (id, data) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API}/products/${id}`, data);
        return res.data;
    } catch (error) {
        console.error('Error update user:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
}
const deleteProduct = async (id) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API}/product/delete/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error delete product:', error.response || error.message);
        throw error; // hoặc xử lý lỗi theo cách bạn muốn
    }
}
export {
    getAllProducts,
    getDetailProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}