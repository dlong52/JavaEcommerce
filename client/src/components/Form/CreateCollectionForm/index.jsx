import React, { useState } from 'react';
import { createCollection } from '../../../services/CollectionServices';

const CreateCollectionForm = ({ closeForm }) => {
    const [collection, setCollection] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCollection({ ...collection, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createCollection(collection)
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
                <h2 className="text-[20px] font-semibold">Thêm loại sản phẩm mới</h2>
                <button onClick={closeForm} type="button">
                    <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
                </button>
            </div>
            <div className="mt-4">
                <input type="text" name="name" value={collection.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" required />
                <textarea name="description" value={collection.description} onChange={handleInputChange} placeholder="description" className="w-full mb-2 px-3 py-2 border rounded"></textarea>
                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                    Lưu
                </button>
            </div>
        </form>
    );
};

export default CreateCollectionForm;
