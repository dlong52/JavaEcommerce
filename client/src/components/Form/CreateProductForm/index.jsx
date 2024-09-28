import React, { useState } from 'react';
import { storage } from '../../../../firebaseConfig';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { createProduct } from '../../../services/ProductServices';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '../../../services/CategoryServices';
import { getAllCollections } from '../../../services/CollectionServices';

const CreateProductForm = ({ handleClose, updateUid }) => {
    const query = useQuery({ queryKey: ['categories'], queryFn: getAllCategories });
    const query1 = useQuery({ queryKey: ['collection'], queryFn: getAllCollections });
    const categories = query?.data;
    const collections = query1?.data;

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: {
            categoryId: ''
        },
        collection: {
            collectionId: ''
        },
        stockQuantity: '',
        discount: '',
        images: [],
        sizes: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'categoryId') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                category: { categoryId: value },
            }));
        } else if (name === 'collectionId') {
            setProduct((prevProduct) => ({
                ...prevProduct,
                collection: { collectionId: value },
            }));
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setLoading(true);
        try {
            const urls = await Promise.all(files.map(async (file) => {
                if (!file.type.startsWith('image/')) {
                    throw new Error('Please upload only image files');
                }
                const imageRef = ref(storage, `Products/${file.name + uuidv4()}`);
                await uploadBytes(imageRef, file);
                return getDownloadURL(imageRef);
            }));
            setProduct((prevProduct) => ({
                ...prevProduct,
                images: [...prevProduct.images, ...urls],
            }));
        } catch (error) {
            setError('Error uploading images: ' + error.message);
        }
        setLoading(false);
    };

    const removeImageInput = (index) => {
        const newImages = product.images.filter((_, i) => i !== index);
        setProduct({ ...product, images: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedProduct = {
                ...product,
                images: JSON.stringify(product.images),
                sizes: JSON.stringify(product.sizes),
            };

            const res = await createProduct(updatedProduct);
            handleClose();
            updateUid();
            return res;
        } catch (error) {
            setError('Error submitting product: ' + error.message);
        }
        setLoading(false);
    };

    return (
        <form className="p-5 bg-white rounded-md" onSubmit={handleSubmit}>
            <div className="flex justify-between">
                <h2 className="text-[20px] font-semibold">Thêm sản phẩm mới</h2>
                <button onClick={handleClose} type="button">
                    <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
                </button>
            </div>
            <div className="mt-4">
                <input type="text" name="name" value={product.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" required />
                <input type="number" name="price" value={product.price} onChange={handleInputChange} placeholder="Price" className="w-full mb-2 px-3 py-2 border rounded" required />
                <textarea name="description" value={product.description} onChange={handleInputChange} placeholder="Description" className="w-full mb-2 px-3 py-2 border rounded"></textarea>
                <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleInputChange} placeholder="Stock Quantity" className="w-full mb-2 px-3 py-2 border rounded" required />

                <select name="categoryId" value={product.category.categoryId} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
                    <option value="">Chọn danh mục</option>
                    {categories?.map((category, index) => (
                        <option key={index} value={category.categoryId}>{category.name}</option>
                    ))}
                </select>

                <select name="collectionId" value={product.collection.collectionId} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
                    <option value="">Chọn loại sản phẩm</option>
                    {collections?.map((collection, index) => (
                        <option key={index} value={collection.collectionId}>{collection.name}</option>
                    ))}
                </select>
                <input type="text" name="discount" value={product.discount} onChange={handleInputChange} placeholder="Discount" className="w-full mb-2 px-3 py-2 border rounded" />

                <div className="mt-4">
                    <h3 className="text-[16px] font-semibold">Sizes</h3>
                    {["XS", "SM", "M", "L", "XL", "2XL", "3XL", "4XL"].map((size, index) => (
                        <label key={index} className="inline-flex items-center mr-4">
                            <input
                                type="checkbox"
                                value={size}
                                onChange={(e) => {
                                    const { checked, value } = e.target;
                                    setProduct((prevProduct) => ({
                                        ...prevProduct,
                                        sizes: checked
                                            ? [...prevProduct.sizes, value]
                                            : prevProduct.sizes.filter(s => s !== value)
                                    }));
                                }}
                            />
                            {size}
                        </label>
                    ))}
                </div>

                <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                <div className="mt-2">
                    {product.images.map((image, index) => (
                        <div key={index} className="flex items-center mt-2">
                            <img src={image} alt="Product" className="w-20 h-20 object-cover rounded" />
                            <button type="button" onClick={() => removeImageInput(index)} className="ml-2 text-red-500">Remove</button>
                        </div>
                    ))}
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className={`mt-4 p-2 rounded bg-blue-500 text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </form>
    );
};

export default CreateProductForm;
