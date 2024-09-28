import React, { useState } from 'react';
import { createCategory } from '../../../services/CategoryServices';

const CreateCategoryForm = ({ closeForm }) => {
    const [category, setCategory] = useState({
        name: '',
        description: ''
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
            const res = await createCategory(category)
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
                <h2 className="text-[20px] font-semibold">Thêm danh mục mới</h2>
                <button onClick={closeForm} type="button">
                    <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
                </button>
            </div>
            <div className="mt-4">
                <input type="text" name="name" value={category.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" required />
                <textarea name="description" value={category.description} onChange={handleInputChange} placeholder="Description" className="w-full mb-2 px-3 py-2 border rounded"></textarea>
                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default CreateCategoryForm;
