import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/ProductServices';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProductItem } from '../../components';
import { getAllCategories } from '../../services/CategoryServices';
import { getAllCollections } from '../../services/CollectionServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Lấy query từ URL
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name') || '';
    const category = queryParams.get('category') || '';
    const collection = queryParams.get('collection') || '';
    const size = queryParams.get('size') || '';
    const minPrice = queryParams.get('min_price') || '';
    const maxPrice = queryParams.get('max_price') || '';
    const orderBy = queryParams.get('order_by') || '';
    const page = parseInt(queryParams.get('page') || 1, 10);

    // Các state để lưu giá trị tìm kiếm
    const [searchName, setSearchName] = useState(name);
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [selectedCollection, setSelectedCollection] = useState(collection);
    const [selectedSize, setSelectedSize] = useState(size);
    const [selectedPage, setSelectedPage] = useState(page);
    const [minPriceState, setMinPriceState] = useState(minPrice);
    const [maxPriceState, setMaxPriceState] = useState(maxPrice);
    const [orderByState, setOrderByState] = useState(orderBy);

    const page_size = 10;

    const queryProducts = useQuery({
        queryKey: ['products', { search: searchName, categoryId: Number(selectedCategory), collectionId: Number(selectedCollection), minPrice: minPrice, maxPrice: maxPrice, order_by: orderBy, page: selectedPage, pagesize: page_size, size: selectedSize }],
        queryFn: getAllProducts,
        staleTime: 1000 * 60,
        onError: (error) => console.error('Error fetching products:', error),
      });

    const queryCategories = useQuery({
        queryKey: ['categories'],
        queryFn: getAllCategories,
        onError: (error) => console.error('Error fetching categories:', error)
    });

    const queryCollections = useQuery({
        queryKey: ['collections'],
        queryFn: getAllCollections,
        onError: (error) => console.error('Error fetching collections:', error)
    });

    const products = queryProducts?.data?.content;
    const categories = queryCategories?.data;
    const collections = queryCollections?.data;

    useEffect(() => {
        setSearchName(name);
        setSelectedCategory(category);
        setSelectedCollection(collection);
        setSelectedSize(size);
        setMinPriceState(minPrice);
        setMaxPriceState(maxPrice);
        setOrderByState(orderBy);
        setSelectedPage(page);
    }, [location.search]);

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchName) params.append('name', searchName);
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedCollection) params.append('collection', selectedCollection);
        if (selectedSize) params.append('size', selectedSize);
        if (minPriceState) params.append('min_price', minPriceState);
        if (maxPriceState) params.append('max_price', maxPriceState);
        if (orderByState) params.append('order_by', orderByState);
        params.append('page', selectedPage);

        navigate({ search: params.toString() });
    };

    const handlePrevPage = () => {
        if (selectedPage > 1) {
            setSelectedPage(selectedPage - 1);
        }
    };

    const handleNextPage = () => {
        if (selectedPage < Math.ceil(products?.count / page_size)) {
            setSelectedPage(selectedPage + 1);
        }
    };

    return (
        <div className='container mx-auto p-6'>
            <div className="search-filters mb-6 p-4 bg-gray-100 rounded-lg shadow-md flex flex-col md:flex-row md:items-center md:justify-between">
                <span className="text-lg font-semibold">Tìm kiếm sản phẩm</span>
                <div className="flex flex-col md:flex-row md:items-center">
                    <input
                        name='name'
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        placeholder="Nhập tên sản phẩm"
                        className="border border-gray-300 rounded-md p-2 mb-2 md:mb-0 md:mr-2 outline-none"
                    />
                    <select
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mb-2 md:mb-0 md:mr-2 outline-none"
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories?.map((cat) => (
                            <option key={cat.id} value={cat.categoryId}>{cat.name}</option>
                        ))}
                    </select>
                    <select
                        name="collection"
                        value={selectedCollection}
                        onChange={(e) => setSelectedCollection(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mb-2 md:mb-0 md:mr-2 outline-none"
                    >
                        <option value="">Tất cả bộ sưu tập</option>
                        {collections?.map((coll) => (
                            <option key={coll.id} value={coll.collectionId}>{coll.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                {queryProducts.isLoading ? (
                    <div className="text-center">Đang tải sản phẩm...</div>
                ) : products?.length > 0 ? (
                    <>
                        <div className="grid grid-cols-10 gap-x-4 gap-y-6">
                            {products.map((product) => (
                                <div className="col-span-2" key={product.id}>
                                    <ProductItem data={product} />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-x-4 mt-[40px] justify-center">
                            <button onClick={handlePrevPage} disabled={selectedPage === 1}>
                                <FontAwesomeIcon icon={faAnglesLeft} size='lg' />
                            </button>
                            <span>{selectedPage}/{Math.ceil(products.count / page_size)}</span>
                            <button onClick={handleNextPage} disabled={selectedPage === Math.ceil(products.count / page_size)}>
                                <FontAwesomeIcon icon={faAnglesRight} size='lg' />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">Không có sản phẩm nào.</div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
