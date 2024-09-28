import React from 'react'
import { email, facebook, instagram, logo, phone, tiktok, youtube, zalo } from '../../../../assets'

const Footer = () => {
    return (
        <div className='bg-black min-h-[300px] text-white'>
            <div className="container mx-auto flex flex-col gap-y-5">
                <div className="grid grid-cols-12 py-6 gap-x-10">
                    <div className="col-span-5 flex flex-col gap-y-4">
                        <h1 className="text-[20px] font-bold">COOLMATE lắng nghe bạn!</h1>
                        <span className='text-[14px] text-gray-400 font-medium'>Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt hơn nữa.</span>
                        <button className='bg-blue-700 text-white font-medium rounded-full py-2 px-4 w-fit text-[14px]'>Đóng góp ý kiến</button>
                    </div>
                    <div className="col-span-3 flex flex-col gap-y-4">
                        <div className="flex gap-x-4">
                            <img className='h-[30px]' src={phone} alt="" />
                            <div className="flex flex-col">
                                <span className='text-[14px] font-medium'>Hotline</span>
                                <span className='font-semibold'>1900.272737 - 028.7777.2737 <br />(8:30 - 22:00)</span>
                            </div>
                        </div>
                        <div className="flex gap-x-4">
                            <img className='h-[30px]' src={email} alt="" />
                            <div className="flex flex-col">
                                <span className='text-[14px] font-medium'>Email</span>
                                <span className='font-semibold'>Cool@coolmate.me</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-4 flex gap-x-6 items-center">
                        <a href=""><img className='h-[45px]' src={facebook} alt="" /></a>
                        <a href=""><img className='h-[45px]' src={zalo} alt="" /></a>
                        <a href=""><img className='h-[45px]' src={tiktok} alt="" /></a>
                        <a href=""><img className='h-[45px]' src={instagram} alt="" /></a>
                        <a href=""><img className='h-[45px]' src={youtube} alt="" /></a>
                    </div>
                </div>
                <div className="grid grid-cols-10 py-6 border-t-[1px] border-gray-500">
                    <div className="col-span-2 flex flex-col gap-y-6">
                        <div className="flex flex-col gap-y-3">
                            <span className='text-[16px] font-semibold'>COOLCLUB</span>
                            <div className="text-[14px] font-medium text-gray-400 flex flex-col gap-y-2">
                                <a href="">Đăng kí thành viên</a>
                                <a href="">Ưu đãi & Đặc quyền</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-y-6">
                        <div className="flex flex-col gap-y-3">
                            <span className='text-[16px] font-semibold'>Chính sách</span>
                            <div className="text-[14px] font-medium text-gray-400 flex flex-col gap-y-2">
                                <a href="">Chính sách đổi trả 60 ngày</a>
                                <a href="">Chính sách khuyến mãi</a>
                                <a href="">Chính sách bảo mật</a>
                                <a href="">Chính sách giao hàng</a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <span className='text-[16px] font-semibold'>Coolmate.me</span>
                            <div className="text-[14px] font-medium text-gray-400 flex flex-col gap-y-2">
                                <a href="">Lịch sử thay đổi website</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-y-6">
                        <div className="flex flex-col gap-y-3">
                            <span className='text-[16px] font-semibold'>Chăm sóc khách hàng</span>
                            <div className="text-[14px] font-medium text-gray-400 flex flex-col gap-y-2">
                                <a href="">Trải nghiệm mua sắm 100% hài lòng</a>
                                <a href="">Hỏi đáp - FAQs</a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <span className='text-[16px] font-semibold'>Kiến thức mặc đẹp</span>
                            <div className="text-[14px] font-medium text-gray-400 flex flex-col gap-y-2">
                                <a href="">Hướng dẫn chọn size</a>
                                <a href="">Blog</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-y-6">
                        <div className="flex flex-col gap-y-3">
                            <span className='text-[16px] font-semibold'>Tài liệu - Tuyển dụng</span>
                            <div className="text-[14px] font-medium text-gray-400 flex flex-col gap-y-2">
                                <a href="">Tuyển dụng</a>
                                <a href="">Đăng ký bản quyền</a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <span className='text-[16px] font-semibold'>Về COOLMATE</span>
                            <div className="text-[14px] font-medium text-gray-400 flex flex-col gap-y-2">
                                <a href="">Coolmate 101</a>
                                <a href="">DVKH xuất sắc</a>
                                <a href="">Câu chuyện về Coolmate</a>
                                <a href="">Nhà máy</a>
                                <a href="">Care & Share</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex flex-col gap-y-6">
                        <div className="flex flex-col gap-y-3">
                            <span className='text-[16px] font-semibold'>Địa chỉ liên hệ</span>
                            <div className="text-[14px] font-medium text-gray-400 flex flex-col gap-y-2 leading-loose">
                                <a href=""><span className='underline'>Văn phòng Hà Nội:</span> Tầng 3 Tòa nhà BMM, KM2, Đường Phùng Hưng, Phường Phúc La, Quận Hà Đông, TP Hà Nội Trung tâm vận hành Hà Nội: Lô C8, KCN Lại Yên, Xã Lại Yên, Huyện Hoài Đức, Thành phố Hà Nội</a>
                                <a href=""><span className="underline">Văn phòng và Trung tâm vận hành TP. HCM:</span> Lô C3, đường D2, KCN Cát Lái, Thạnh Mỹ Lợi, TP. Thủ Đức, TP. Hồ Chí Minh.</a>
                                <a href=""><span className="undeline">Trung tâm R&D:</span> Tầng 2, NXLP - 24, Khu The Manhattan - Vinhomes Grand Park, TP. Thủ Đức, TP. HCM</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
