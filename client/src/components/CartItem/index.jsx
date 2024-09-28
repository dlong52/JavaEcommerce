import { faDeleteLeft, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import helpers from '../../utils/helper';
import { getDetailProduct } from '../../services/ProductServices';
import { useQuery } from '@tanstack/react-query';

const CartItem = ({ data, onIncrease, onDecrease, onDelete, onUpdateSize }) => {
    const queryProduct = useQuery({
        queryKey: ['product', data?.productId],
        queryFn: () => getDetailProduct(data?.productId),
        enabled: !!data?.productId
    });
    const [sizes, setSizes] = useState(queryProduct?.data?.sizes)

    useEffect(() => {
        if (queryProduct?.data) {
            setSizes(JSON.parse(queryProduct?.data?.sizes))
        }
    }, [queryProduct?.data?.sizes])
    console.log(queryProduct);
    return (
        <tr className="h-[100px] bg-white text-footer border-b last:border-none">
            <td className="flex items-center w-[350px] p-5">
                <img className="w-[80px] object-cover rounded-md" src={JSON.parse(data?.productImage)[0]} alt={data?.productName} />
                <div className="flex flex-col gap-y-1 ml-4">
                    <h1 className="font-semibold text-[14px] w-[200px] truncate">{data?.productName}</h1>
                    <div className="flex items-center gap-x-2">
                        <label className='text-sm text-gray-500' htmlFor="">Size:</label>
                        <select
                            name="size"
                            value={data?.size}
                            onChange={(e) => onUpdateSize(data, e.target.value)}
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                        >
                            {sizes?.map((size, i) => (
                                <option value={size} key={i}>{size}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </td>
            <td className="p-5 text-center">
                <div className="flex justify-center items-center space-x-2">
                    <FontAwesomeIcon
                        className="cursor-pointer text-gray-600 hover:text-black"
                        icon={faMinus}
                        onClick={() => onDecrease(data)}
                    />
                    <span className="font-semibold text-lg">{data?.quantity}</span>
                    <FontAwesomeIcon
                        className="cursor-pointer text-gray-600 hover:text-black"
                        icon={faPlus}
                        onClick={() => onIncrease(data)}
                    />
                </div>
            </td>
            <td className="p-5 text-[16px] font-semibold text-center">
                {helpers.numberFormat(helpers.roundNumber(data?.price * (1 - data?.discount / 100)) * data?.quantity)}₫
            </td>
            <td className="p-5 text-center">
                <FontAwesomeIcon
                    className="cursor-pointer text-red-600 hover:text-red-800"
                    icon={faDeleteLeft}
                    size="lg"
                    onClick={() => onDelete(data)}
                />
            </td>
        </tr>
    );
};

export default CartItem;
