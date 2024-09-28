import { useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect, useState } from 'react'
import { deleteCollection, getAllCollections, getDetailCollection } from '../../services/CollectionServices'
import CreateCollectionForm from '../../components/Form/CreateCollectionForm'
import EditCollectionForm from '../../components/Form/EditCollectionForm'
import DeleteDialog from '../../components/DeleteDialog'

const CollectionAdminPage = () => {
    const [id, setId] = useState(null)

    const { data, refetch } = useQuery({ queryKey: ['collection'], queryFn: getAllCollections })
    const [activeForm, setActiveForm] = useState(null);

    const query = useQuery({
        queryKey: ['collectionDetails', id],
        queryFn: () => getDetailCollection(id),
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

    const handleShowCreateForm = () => { 
        console.log("Create form active");
        setActiveForm('create');
    };

    const closeForm = () => {
        setActiveForm(null)
        setId(null)
        refetch();
    };
    const handleDelete = async (id) => {
        try {
            if (id) {
                const res = await deleteCollection(id)
                closeForm()
                return res.data
            }
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className="px-6 py-3">
            {/* Form */}
            {(activeForm === 'create') && <CreateCollectionForm closeForm={closeForm} />}
            {(activeForm === 'edit') && <EditCollectionForm data={query?.data} closeForm={closeForm} />}
            {(activeForm === 'delete') && <DeleteDialog handleDelete={handleDelete} name={query?.data?.name} id={id} handleClose={closeForm} />}

            {(activeForm !== 'create' && activeForm !== 'edit') &&
                <Fragment>
                    <div className="p-5 bg-white rounded-md shadow-lg">
                        <h1 className='text-[20px] font-semibold'>Danh mục sản phẩm</h1>
                        <div className="flex mt-4">
                            <div className="flex w-[350px] rounded bg-slate-300">
                                <input className=" w-full border-none bg-transparent px-3 py-1 text-gray-400 outline-none focus:outline-none " type="search" name="search" placeholder="Search..." />
                                <button type="submit" className="m-2 rounded bg-main px-4 py-1 text-white">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                            </div>
                            <button onClick={handleShowCreateForm} className="bg-main hover:bg-gray-700 text-white font-bold py-2 px-4 border-b-4 border-gray-600 hover:border-gray-300 rounded ml-7">
                                <i className="fa-solid fa-plus"></i> Thêm danh mục
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
                        {/* Table data */}
                        <table className='w-full text-center bg-white rounded-md min-w-full table-fixed shadow-xl'>
                            <thead>
                                <tr className=' font-medium text-main h-[40px] uppercase text-[16px]'>
                                    <th className='bg-main text-white text-[12px] rounded-tl-md'>ID</th>
                                    <th className='bg-main text-white text-[12px]'>Danh mục</th>
                                    <th className='bg-main text-white text-[12px]'>Mô tả</th>
                                    <th className='bg-main text-white text-[12px] w-[50px]'>Trạng thái</th>
                                    <th className='bg-main text-white text-[12px] w-[250px] rounded-tr-md'>Hành động</th>
                                </tr>
                            </thead>
                            {/* Render data */}
                            <tbody>
                                {data?.map((item, index) => {
                                    return (
                                        <tr key={index} className='hover:bg-gray-100'>
                                            <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap lg:p-5 flex justify-center'>
                                                #{item?.collectionId}
                                            </td>
                                            <td className="p-4 text-sm font-medium text-gray-950 whitespace-nowrap lg:p-5">
                                                {item?.name}
                                            </td>
                                            <td className='p-4 text-base font-normal text-gray-500 whitespace-nowrap lg:p-5'>{item?.description}</td>
                                            <td className='p-4 text-base font-medium text-gray-950 whitespace-nowrap lg:p-5'>{item?.active ? "Active" : "Inactive"}</td>
                                            <td className='p-4 space-x-2 whitespace-nowrap lg:p-5'>
                                                <button onClick={() => { handleShowEditForm(item?.collectionId) }} className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 hover:text-gray-900 hover:scale-[1.02] transition-all'>Edit</button>

                                                <button onClick={() => { handleShowDeleteForm(item?.collectionId) }} className='inline-flex items-center py-2 px-3 text-sm font-medium text-center bg-main text-white rounded-lg hover:scale-[1.02] transition-transform'>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default CollectionAdminPage
