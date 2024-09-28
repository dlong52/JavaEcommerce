import React, { useState } from 'react';
import { createUser } from '../../../services/UserService';

const CreateUserForm = ({ closeForm, role }) => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        role: 'user',
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
            const res = await createUser(user)
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
                <h2 className="text-[20px] font-semibold">Thêm người dùng mới</h2>
                <button onClick={closeForm} type="button">
                    <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
                </button>
            </div>
            <div className="mt-4">
                <input type="text" name="username" value={user?.username} onChange={handleInputChange} placeholder="Họ tên" className="w-full mb-2 px-3 py-2 border rounded" required />
                <input type="text" name="email" value={user?.email} onChange={handleInputChange} placeholder="Email" className="w-full mb-2 px-3 py-2 border rounded" required />
                <input type="text" name="password" value={user?.password} onChange={handleInputChange} placeholder="Mật khẩu" className="w-full mb-2 px-3 py-2 border rounded" required />
                {role === "admin"&&<select name="role" value={user?.role} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
                    <option value="">Vai trò</option>
                    <option value={"user"}>User</option>
                    <option value={"admin"}>Admin</option>
                </select>}
                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default CreateUserForm;
