import React, { useState } from 'react'
import { updateCategory } from '../../../services/CategoryServices';

const EditCategoryForm = ({ closeForm, data }) => {
    const [category, setCategory] = useState({
        name: data?.name,
        description: data?.description,
        active: data?.active
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateCategory(data?.categoryId, category);
            closeForm()
            return res;
        } catch (error) {
            setError('Error submitting product');
        }
        setLoading(false);
    };

    return (
        <form className="p-5 bg-white rounded-md" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <h2 className="text-[20px] font-semibold">Cập nhật sản phẩm</h2>
                <button onClick={closeForm} type="button">
                    <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
                </button>
            </div>
            <div className="mt-4">
                <input type="text" name="name" value={category?.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" required />
                <textarea name="description" value={category?.description} onChange={handleInputChange} placeholder="Description" className="w-full mb-2 px-3 py-2 border rounded"></textarea>
                <select name="active" value={category?.active} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
                    <option value="">Trạng thái sản phẩm</option>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>

                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                    Cập nhật
                </button>
            </div>
        </form>
    )
}

export default EditCategoryForm
