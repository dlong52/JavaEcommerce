import axios from 'axios'
import env from 'dotenv'
const axiosJwt = axios.create()
const createOrder = async (userId, paymentMethod, username, phoneNumber, address) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/orders`,
        {
            userId,
            paymentMethod,
            address,
            phoneNumber,
            username,
        }
    );
    return res.data;
}
const getAllOrder = async (filters = {}, page = 1, pageSize = 10) => {
    const params = {
        ...filters,
        page,
        size: pageSize,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
        status: filters.status || undefined,
        paymentMethod: filters.paymentMethod || undefined,
        username: filters.username || undefined
    };
    const res = await axios.get(`${import.meta.env.VITE_API}/orders`, { params });
    return res.data;
};

const getOrderDetail = async (order_id) => {
    const res = await axios.get(`${import.meta.env.VITE_API}/orders/${order_id}`);
    return res.data;
}
const getAllOrderByUser = async (user_id, filters = {}) => {
    // Tạo đối tượng tham số truy vấn từ filters
    const params = new URLSearchParams(filters).toString();
    const url = `${import.meta.env.VITE_API}/orders/user/${user_id}`;

    const res = await axios.get(`${url}?${params}`);
    return res.data;
};

const updateOrderStatus = async (order_id, new_status) => {
    const res = await axios.put(`${import.meta.env.VITE_API}/orders/${order_id}/status?status=${new_status}`);
    return res.data;
}

const createVnPayPayment = async (total_amount) => {
    const res = await axios.get(`${import.meta.env.VITE_API}/payment/vn-pay?amount=${total_amount}&bankCode=NCB`);
    return res.data;
}
const verifyTransaction = async (transactionNo, hmac) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/payment/verify-transaction`, {
        transactionNo, hmac
    })
    return res.data;
}
const createPayPalPayment = async (total_amount, order_id) => {
    const res = await axios.post(`${import.meta.env.VITE_API}/payment/create/`, {
        total_amount,
        order_id,
    });
    return res.data;
};
const executePayment = async (paymentId, payerId) => {
    const response = await axios.post(`${import.meta.env.VITE_API}/payment/execute/`, {
        paymentId,
        payerId,
    });
    return response.data;
};


export {
    createOrder,
    getAllOrder,
    getAllOrderByUser,
    getOrderDetail,
    updateOrderStatus,
    createPayPalPayment,
    executePayment,
    createVnPayPayment,
    verifyTransaction
}