import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../../../services/CategoryServices';
import { getAllCollections } from '../../../services/CollectionServices';
import { updateProduct } from '../../../services/ProductServices';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const EditProductForm = ({ handleClose, data }) => {
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  
  const query = useQuery({ queryKey: ['categories'], queryFn: getAllCategories });
  const query1 = useQuery({ queryKey: ['collection'], queryFn: getAllCollections });
  const categories = query.data;
  const collections = query1.data;

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    categoryId: '',
    collectionId: '',
    stockQuantity: '',
    discount: '',
    images: [],
    status: '',
    sizes: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setProduct({
        name: data.name,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId,
        collectionId: data.collectionId,
        stockQuantity: data.stockQuantity,
        discount: data.discount,
        images: JSON.parse(data.images) || [],
        status: data.status,
        sizes: JSON.parse(data.sizes) || [],
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const urls = await Promise.all(files.map(async (file) => {
        const imageRef = ref(storage, `Products/${file.name}-${uuidv4()}`);
        await uploadBytes(imageRef, file);
        return getDownloadURL(imageRef);
      }));
      setProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, ...urls],
      }));
    } catch (error) {
      setError('Error uploading images');
    } finally {
      setLoading(false);
    }
  };

  const removeImageInput = (index) => {
    const newImages = product.images.filter((_, i) => i !== index);
    setProduct({ ...product, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Chuyển đổi images và sizes thành chuỗi JSON
      const updatedProduct = {
        ...product,
        images: JSON.stringify(product.images),  // Chuyển đổi mảng hình ảnh thành chuỗi
        sizes: JSON.stringify(product.sizes),    // Chuyển đổi mảng kích thước thành chuỗi
      };
  
      const res = await updateProduct(data.productId, updatedProduct);
      console.log('Product submitted:', updatedProduct);
      handleClose();
      return res;
    } catch (error) {
      setError('Error submitting product: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <form className="p-5 bg-white rounded-md" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <h2 className="text-[20px] font-semibold">Cập nhật sản phẩm</h2>
        <button onClick={handleClose} type="button">
          <i className="text-[#100e3d] fa-solid fa-circle-arrow-left fa-xl"></i>
        </button>
      </div>
      <div className="mt-4">
        <input type="text" name="name" value={product.name} onChange={handleInputChange} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded" required />
        <input type="number" name="price" value={product.price} onChange={handleInputChange} placeholder="Price" className="w-full mb-2 px-3 py-2 border rounded" required />
        <textarea name="description" value={product.description} onChange={handleInputChange} placeholder="Description" className="w-full mb-2 px-3 py-2 border rounded"></textarea>
        <input type="number" name="stockQuantity" value={product.stockQuantity} onChange={handleInputChange} placeholder="Stock Quantity" className="w-full mb-2 px-3 py-2 border rounded" required />
        
        <select name="categoryId" value={product.categoryId} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
          <option value="">Chọn danh mục</option>
          {categories?.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
          ))}
        </select>

        <select name="collectionId" value={product.collectionId} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
          <option value="">Chọn loại sản phẩm</option>
          {collections?.map((collection) => (
            <option key={collection.collectionId} value={collection.collectionId}>{collection.name}</option>
          ))}
        </select>
        
        <select name="status" value={product.status} onChange={handleInputChange} className="w-full mb-2 px-3 py-2 border rounded" required>
          <option value="">Trạng thái sản phẩm</option>
          <option value={true}>Hoạt động</option>
          <option value={false}>Không hoạt động</option>
        </select>
        
        <input type="text" name="discount" value={product.discount} onChange={handleInputChange} placeholder="Discount" className="w-full mb-2 px-3 py-2 border rounded" />
        
        <div className="mt-4">
          <h3 className="text-[16px] font-semibold">Sizes</h3>
          {["XS", "SM", "M", "L", "XL", "2XL", "3XL", "4XL"].map((size) => (
            <label key={size} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={size}
                checked={product.sizes.includes(size)}
                onChange={(e) => {
                  const { checked, value } = e.target;
                  setProduct((prevProduct) => ({
                    ...prevProduct,
                    sizes: checked
                      ? [...prevProduct.sizes, value]
                      : prevProduct.sizes.filter((s) => s !== value),
                  }));
                }}
                className="mr-2"
              />
              {size}
            </label>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="text-[16px] font-semibold">Images</h3>
          {product.images.map((image, index) => (
            <div key={index} className="flex mb-2 items-center">
              <input type="text" value={image} readOnly className="w-full px-3 py-2 border rounded" />
              <button type="button" onClick={() => removeImageInput(index)} className="ml-2 bg-red-500 text-white px-3 py-1 rounded">Remove</button>
            </div>
          ))}
          <input type="file" multiple onChange={handleImageUpload} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded" />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          Cập nhật
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;
