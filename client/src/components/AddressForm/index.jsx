import React, { useEffect, useState } from 'react';
import address from '../../apis/addressApi';
import { updateUser } from '../../services/UserService';
import { updateUser as updateUserUi } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

const AddressForm = ({ user, showAddressForm, updateAddressInState }) => {
    const dispatch = useDispatch();

    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    const [provinceData, setProvinceData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [wardData, setWardData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProvinces = async () => {
            setIsLoading(true);
            try {
                const provincesData = await address.fetchProvincesData();
                setProvinceData(provincesData);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchDistricts = async () => {
            if (province) {
                setIsLoading(true);
                try {
                    const districtsData = await address.fetchDistrictData(JSON.parse(province).province_id);
                    setDistrictData(districtsData);
                } catch (error) {
                    console.error("Error fetching districts:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setDistrictData([]);
            }
        };
        fetchDistricts();
    }, [province]);

    useEffect(() => {
        const fetchWards = async () => {
            if (district) {
                setIsLoading(true);
                try {
                    const wardsData = await address.fetchWardData(JSON.parse(district).district_id);
                    setWardData(wardsData);
                } catch (error) {
                    console.error("Error fetching wards:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setWardData([]);
            }
        };
        fetchWards();
    }, [district]);

    const handleUpdateAddress = async (e) => {
        e.preventDefault();
        const data = {
            address: `${detailAddress}, ${JSON.parse(ward).ward_name}, ${JSON.parse(district).district_name}, ${JSON.parse(province).province_name}`,
        };
        try {
            await updateUser(user?.userId, data);
            dispatch(updateUserUi({ ...user, address: data?.address }));
            updateAddressInState(data.address)
            showAddressForm()
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    return (
        <div className='fixed inset-0 z-50 transition-all duration-500'>
            <div className="fixed inset-0 bg-[#051c425b]"></div>
            <form onSubmit={handleUpdateAddress} className='bg-white rounded-[5px] w-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute p-5'>
                <h1 className='text-[20px] font-semibold pb-3'>Địa chỉ mới</h1>
                <div className="grid grid-cols-12 gap-4">
                    <select
                        className="rounded-[5px] outline-none px-3 h-[45px] shadow-input col-span-6"
                        onChange={(e) => { setProvince(e.target.value) }}
                        value={province}
                    >
                        <option value="">Tỉnh/Thành phố</option>
                        {provinceData.map((item, index) => (
                            <option key={index} value={JSON.stringify(item)}>{item.province_name}</option>
                        ))}
                    </select>
                    <select
                        className="rounded-[5px] outline-none px-3 h-[45px] shadow-input col-span-6"
                        onChange={(e) => { setDistrict(e.target.value) }}
                        value={district}
                    >
                        <option value="">Quận/Huyện</option>
                        {districtData.map((item, index) => (
                            <option key={index} value={JSON.stringify(item)}>{item.district_name}</option>
                        ))}
                    </select>
                    <select
                        className="rounded-[5px] outline-none px-3 h-[45px] shadow-input col-span-12"
                        onChange={(e) => { setWard(e.target.value) }}
                        value={ward}
                    >
                        <option value="">Phường/Xã</option>
                        {wardData.map((item, index) => (
                            <option key={index} value={JSON.stringify(item)}>{item.ward_name}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder='Địa chỉ cụ thể'
                        className="rounded-[5px] outline-none pl-3 h-[45px] shadow-input col-span-12"
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)}
                    />
                    <div className="col-span-12 flex gap-x-4 items-center justify-end">
                        <button type='button' onClick={() => { showAddressForm() }} className="">Trở lại</button>
                        <button type='submit' className="py-2 px-4 bg-main text-white rounded-[5px]">Hoàn thành</button>
                    </div>
                </div>
            </form>
            {isLoading && <div>Loading...</div>}
        </div>
    );
};

export default AddressForm;
