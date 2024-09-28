import React, { useEffect, useState } from 'react'
import * as UserService from '../../services/UserService'
import { useMutationHook } from '../../hooks/useMutationHook'
import LayzyLoad from '../../components/LazyLoad'
import Toastify from '../../components/Toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const SignUpPage = () => {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errors, setErrors] = useState({})
  const [toastifyData, setToastifyData] = useState({ status: '', message: '' });
  const mutation = useMutationHook((data) => UserService.signUp(data))

  const validate = () => {
    const newErrors = {}

    if (!username) newErrors.name = "Họ tên không được để trống"
    if (!email) newErrors.email = "Email không được để trống"
    if (!password) newErrors.password = "Mật khẩu không được để trống"
    if (password !== confirmPassword) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"

    return newErrors
  }

  const handleSignup = () => {
    const validationErrors = validate()
    if (Object.keys(validationErrors).length === 0) {
      mutation.mutate({
        username,
        email,
        password,
        confirmPassword
      })
    } else {
      setErrors(validationErrors)
    }
  }
  useEffect(() => {
    if (mutation.data) {
      setToastifyData({
        status: mutation?.data?.status,
        message: mutation?.data?.message
      });
    }
  }, [mutation.data]);
  const { data, isPending } = mutation
  console.log(toastifyData);

  return (
    <div className="py-16 bg-slate-100 min-h-screen">
      <div className="flex bg-white rounded-lg shadow-brand overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover relative"
          style={{ background: `url(${"https://cdn.techinasia.com/wp-content/uploads/2022/09/1662307723_coolmate.jpeg"})`, backgroundPosition: "center", backgroundSize: "auto 100%", backgroundRepeat: "no-repeat" }}
        >
          <a href="/" className=' absolute top-2 left-2 size-[40px] bg-white rounded-full flex items-center justify-center'>
            <FontAwesomeIcon className=' absolute' icon={faArrowLeft} />
          </a>
        </div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center uppercase">đăng ký</h2>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Họ Tên</label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="text"
              onChange={(e) => { setUserName(e.target.value) }}
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Địa Chỉ Email</label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              onChange={(e) => { setEmail(e.target.value) }}
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">Mật Khẩu</label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              onChange={(e) => { setPassword(e.target.value) }}
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">Xác Nhận Mật Khẩu</label>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              onChange={(e) => { setConfirmPassword(e.target.value) }}
            />
            {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword}</span>}
          </div>
          <div className="mt-8">
            <button
              onClick={handleSignup}
              className={
                `${(username && email && password && confirmPassword) ? "bg-main hover:bg-blue-500" : "bg-gray-500"} 
                flex items-center justify-center text-white font-bold h-[45px] w-full rounded`
              }
            >
              {isPending && <LayzyLoad />}
              {!isPending && "Đăng ký"}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <span className='text-sm text-gray-500'>Đã có tài khoản? <a href="/signin" className="text-main">Đăng nhập</a></span>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
