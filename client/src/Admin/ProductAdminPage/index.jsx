import React, { Fragment, useEffect, useState } from 'react'
import CreateProductForm from '../../components/Form/CreateProductForm'
import { deleteProduct, getAllProducts, getDetailProduct } from '../../services/ProductServices';
import { useQuery } from '@tanstack/react-query';
import EditProductForm from '../../components/Form/EditProductForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import DeleteDialog from '../../components/DeleteDialog';

const ProductAdminPage = () => {
    const [id, setId] = useState(null)

    const [searchName, setSearchName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCollection, setSelectedCollection] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedPage, setSelectedPage] = useState(1);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [orderBy, setOrderBy] = useState('');

    const page_size = 4

    const { data, refetch } = useQuery({
        queryKey: ['products', { name: searchName, category: selectedCategory, collection: selectedCollection, size: selectedSize, min_price: minPrice, max_price: maxPrice, order_by: orderBy, page: selectedPage, page_size: page_size }],
        queryFn: getAllProducts
    });
    const query = useQuery({
        queryKey: ['productDetails', id],
        queryFn: () => getDetailProduct(id),
        enabled: !!id
    });

    useEffect(() => {
        if (id && query?.data && activeForm != 'delete') {
            setActiveForm('edit');
        }
    }, [id, query?.data]);
    const handleShowEditForm = (id) => {
        setId(id);
    };

    const handleShowDeleteForm = (id) => {
        setId(id);
        setActiveForm('delete');
    };

    const [activeForm, setActiveForm] = useState(null);
    const handleShowCreateForm = () => setActiveForm('create');

    const closeForm = () => {
        setActiveForm(null)
        refetch();
        setId(null)
    };

    const handlePrevPage = () => {
        if (selectedPage > 1)
            setSelectedPage(selectedPage - 1);
    };

    const handleNextPage = () => {
        if (selectedPage < Math.ceil(products?.count / page_size))
            setSelectedPage(selectedPage + 1);
    };
    const handleDelete = async (id) => {
        try {
            if (id) {
                const res = await deleteProduct(id)
                closeForm()
                return res.data
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="px-6 py-3">
            {activeForm === 'create' && <CreateProductForm handleClose={closeForm} />}
            {activeForm === 'edit' && id && <EditProductForm data={query?.data} handleClose={closeForm} />}
            {activeForm === 'delete' && <DeleteDialog handleDelete={handleDelete} name={query?.data?.name} id={id} handleClose={closeForm} />}

            {(activeForm !== 'create' && activeForm !== 'edit') &&
                <Fragment>
                    <div className="p-5 bg-white rounded-md shadow-lg">
                        <h1 className='text-[20px] font-semibold'>Sản phẩm</h1>
                        <div className="flex mt-4">
                            <div className="flex w-[350px] rounded bg-slate-300">
                                <input className=" w-full border-none bg-transparent px-3 py-1 text-gray-400 outline-none focus:outline-none " type="search" name="search" placeholder="Search..." />
                                <button type="submit" className="m-2 rounded bg-main px-4 py-1 text-white">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <button
                                className="bg-main hover:bg-gray-700 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-300 rounded ml-7"
                                onClick={handleShowCreateForm}
                            >
                                <i className="fa-solid fa-plus"></i> Thêm sản phẩm
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
                        {(data?.content?.length !== 0) ?
                            <>
                                <table className='w-full text-center bg-white rounded-md min-w-full table-fixed shadow-xl'>
                                    <thead>
                                        <tr className=' font-medium text-main h-[40px] uppercase text-[16px]'>
                                            <th className='bg-main text-white text-[12px] rounded-tl-md'>Hình ảnh</th>
                                            <th className='bg-main text-white text-[12px]'>Tên sản phẩm</th>
                                            <th className='bg-main text-white text-[12px]'>Số lượng</th>
                                            <th className='bg-main text-white text-[12px] w-[50px]'>Lượt bán</th>
                                            <th className='bg-main text-white text-[12px] w-[100px]'>Trạng thái</th>
                                            <th className='bg-main text-white text-[12px] w-[250px] rounded-tr-md'>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.content?.map((item, index) => {
                                            return (
                                                <tr key={index} className='hover:bg-gray-100'>
                                                    <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5 flex justify-center'>
                                                        <img src={item?.images[0]} className='h-[60px]' alt="" />
                                                    </td>
                                                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap lg:p-5">
                                                        <div className="text-base font-semibold text-gray-900" bis_skin_checked="1">{item?.name}</div>
                                                    </td>
                                                    <td className='p-4 text-base font-medium text-gray-950 whitespace-nowrap lg:p-5'>{item.stock_quantity}</td>
                                                    <td className='p-4 text-base font-medium text-gray-950 whitespace-nowrap lg:p-5'>{item?.sales_count}</td>
                                                    <td className='p-4 text-base font-medium text-gray-950 whitespace-nowrap lg:p-5'>{item?.status? "Hoạt động": "Không hoạt động"}</td>
                                                    <td className='p-4 space-x-2 whitespace-nowrap lg:p-5'>
                                                        <button onClick={() => { handleShowEditForm(item?.productId) }} className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all'>Cập nhật</button>

                                                        <button onClick={() => { handleShowDeleteForm(item?.productId) }} className='inline-flex items-center py-2 px-3 text-sm font-medium text-center bg-main text-white rounded-lg hover:scale-[1.02] transition-transform'>Xóa bỏ</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="flex items-center gap-x-4 mt-[40px] justify-center">
                                    <button onClick={handlePrevPage} disabled={selectedPage === 1}>
                                        <FontAwesomeIcon icon={faAnglesLeft} size='lg' />
                                    </button>
                                    {Array.from({ length: Math.ceil(data?.count / page_size) }, (_, index) => (
                                        <div
                                            onClick={() => { setSelectedPage(index + 1) }}
                                            key={index}
                                            className={`px-2 py-1 text-[12px] rounded-[10px] cursor-pointer ${selectedPage === (index + 1) ? "bg-black text-white" : " bg-gray-300 text-white"}`}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                                    <button onClick={handleNextPage} disabled={selectedPage >= Math.ceil(data?.count / page_size)}>
                                        <FontAwesomeIcon icon={faAnglesRight} size='lg' />
                                    </button>
                                </div>
                            </> :
                            <div className="flex justify-center items-center min-h-[300px]">
                                <h1 className="text-[25px] text-gray-300">Chưa có sản phẩm nào</h1>
                            </div>
                        }
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default ProductAdminPage;
