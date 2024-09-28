import React, { useRef, useState, useEffect } from 'react';
import { storage } from '../../../firebaseConfig';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { userAvatar } from '../../assets';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../services/UserService';
import AddressForm from '../../components/AddressForm';
import helpers from '../../utils/helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { updateUser as updateUserUi } from '../../redux/userSlice'; // Giả sử bạn có action để cập nhật thông tin người dùng

const ProfilePage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [avatar, setAvatar] = useState(user?.image || userAvatar);
    const fileInputRef = useRef(null);

    const [data, setData] = useState({
        username: user?.username,
        phoneNumber: user?.phone_number,
    });
    
    const updateAddressInState = (newAddress) => {
        setData((prevData) => ({
            ...prevData,
            address: newAddress,
        }));
    };
    const handleUpdateUser = async () => {
        try {
            if (helpers.validatePhoneNumber(data.phoneNumber)) {
                await updateUser(user?.userId, data);
                dispatch(updateUserUi({ ...user, ...data, image: avatar }));
                alert("Cập nhật thành công")
            } else {
                alert("Định dạng điện thoại không đúng")
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        setLoading(true);
        try {
            const urls = await Promise.all(files.map(async (file) => {
                const imageRef = ref(storage, `Avatars/${file.name + uuidv4()}`);
                await uploadBytes(imageRef, file);
                return getDownloadURL(imageRef);
            }));
            const newAvatar = urls[0]; // Chọn URL của ảnh đầu tiên
            setAvatar(newAvatar); // Cập nhật trạng thái avatar
            await updateUser(user?.userId, { image: newAvatar }); // Cập nhật avatar với URL của ảnh mới
            // Cập nhật thông tin người dùng trong Redux store
            dispatch(updateUserUi({ ...user, image: newAvatar }));
        } catch (error) {
            setError('Error uploading image');
        }
        setLoading(false);
    };

    useEffect(() => {
        setAvatar(user?.image || userAvatar);
    }, [user]);
    return (
        <div className='flex-1 bg-white rounded-[5px] p-5 shadow-md'>
            {showAddressForm && <AddressForm user={user} showAddressForm={() => setShowAddressForm(!showAddressForm)} updateAddressInState={updateAddressInState} />}
            <div className="">
                <h1 className="text-[20px] font-bold pb-3 border-b-2">Quản lý thông tin hồ sơ</h1>
            </div>
            <div className="flex justify-between">
                <div className="">
                    <div className="flex mt-[20px]">
                        <label className='w-[150px] block font-semibold' htmlFor="">Họ tên:</label>
                        <input
                            className='min-w-[400px] h-[35px] shadow-input rounded-[5px] pl-4 outline-none'
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex mt-[20px]">
                        <label className='w-[150px] block font-semibold' htmlFor="">Số điện thoại:</label>
                        <input
                            className='min-w-[400px] h-[35px] shadow-input rounded-[5px] pl-4 outline-none'
                            type="text"
                            name="phoneNumber"
                            value={data.phoneNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex mt-[20px]">
                        <label className='w-[150px] block font-semibold' htmlFor="">Email:</label>
                        <span className='text-[15px] font-medium'>{helpers.maskEmail(user?.email)}</span>
                    </div>
                    <div className="flex mt-[20px]">
                        <label className='w-[150px] block font-semibold' htmlFor="">Địa chỉ:</label>
                        <div className="">
                            {user?.address && <span className='text-[15px] font-medium'>{user?.address}</span>}
                            <button
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className='text-main ml-3 underline'>
                                {user?.address ? "Thay đổi" : "Thêm địa chỉ"}
                            </button>
                        </div>
                    </div>
                    <div className="flex mt-[20px]">
                        <button
                            className='px-6 py-2 rounded-[5px] bg-main text-white'
                            onClick={handleUpdateUser}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
                <div className="flex justify-center flex-1">
                    <div className="relative flex flex-col items-center gap-y-2 mt-[30px] size-[80px]">
                        <div className="size-[80px] border-[5px] border-gray-200 rounded-full">
                            <img 
                            src={avatar} 
                            alt="Avatar" 
                            className='relative bg-gray-400 rounded-full size-full object-cover' />
                        </div>
                        <input
                            onChange={handleImageUpload}
                            accept=".jpg,.jpeg,.png"
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        <button
                            className='bottom-0 right-0 absolute py-[5px] px-[10px] rounded-full bg-gray-600 text-white font-medium'
                            onClick={handleButtonClick}
                        >
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                        {loading && <p>Đang tải ảnh...</p>}
                        {error && <p className='text-red-500'>{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
