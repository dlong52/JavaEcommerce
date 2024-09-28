import React, { useState } from 'react';
import { updateUser } from '../../../services/UserService';

const EditUserForm = ({ closeForm, data }) => {
    const [user, setUser] = useState({
        username: data?.username,
        email: data?.email,
        password: data?.password,
        role: data?.role,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateUser(data?.user_id, user)
            closeForm()
            return res
        } catch (error) {
            setError('Error submitting product');
        }
        setLoading(false);
    };
    return (
        <form className="p-5 bg-white rounded-md" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <h2 className="text-[20px] font-semibold">Cập nhật người dùng</h2>
                <button onClick={closeForm} type="button">
                    <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
                </button>
            </div>
            <div className="mt-4">
                <input type="text" name="username" value={user?.username} onChange={handleInputChange} placeholder="Họ tên" className="w-full mb-2 px-3 py-2 border rounded" required />
                <input type="text" name="email" value={user?.email} onChange={handleInputChange} placeholder="Email" className="w-full mb-2 px-3 py-2 border rounded" required />
                <input type="text" name="password" value={user?.password} onChange={handleInputChange} placeholder="Mật khẩu" className="w-full mb-2 px-3 py-2 border rounded" required />
                <select name="role" value={user?.role} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
                    <option value="">Vai trò</option>
                    <option value={"user"}>User</option>
                    <option value={"admin"}>Admin</option>
                </select>
                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                    Cập nhật
                </button>
            </div>
        </form>
    );
};

export default EditUserForm;
