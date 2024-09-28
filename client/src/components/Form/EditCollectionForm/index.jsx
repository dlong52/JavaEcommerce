import React, { useState } from 'react';
import { updateCollection } from '../../../services/CollectionServices';

const EditCollectionForm = ({ closeForm, data }) => {
    const [collection, setCollection] = useState({
        name: data?.name,
        description: data?.description,
        active: data?.active
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCollection({ ...collection, [name]: name === 'active' ? value === 'true' : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateCollection(data?.collectionId, collection);
            closeForm();
            return res;
        } catch (error) {
            setError('Error submitting collection');
        }
        setLoading(false);
    };

    return (
        <form className="p-5 bg-white rounded-md" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <h2 className="text-[20px] font-semibold">Cập nhật nhóm sản phẩm</h2>
                <button onClick={closeForm} type="button">
                    <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
                </button>
            </div>
            <div className="mt-4">
                <input type="text" name="name" value={collection?.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" required />
                <textarea name="description" value={collection?.description} onChange={handleInputChange} placeholder="Description" className="w-full mb-2 px-3 py-2 border rounded"></textarea>
                <select name="active" value={collection?.active} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
                    <option value="">Trạng thái sản phẩm</option>
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                </select>

                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
                    Cập nhật
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default EditCollectionForm;
