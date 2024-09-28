import { Fragment, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

import { privateRoutes, publicRoutes } from './routes';
import helpers from './utils/helper';
import * as UserService from '../src/services/UserService';
import { updateUser } from './redux/userSlice';

import { MainLayout } from './components/layouts';
import AdminLayout from './components/layouts/AdminLayout';
import { LoadingPage } from './components';

function App() {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const { decoded, storageData } = handleDecode();
    if (decoded?.sub) {
      handleGetUserDetails(Number(decoded?.sub), storageData);
    } else {
      setLoading(false); 
    }
  }, []);
  UserService.axiosJwt.interceptors.request.use(async (config) => {
    const currenrTime = new Date()
    let { decoded, storageData } = handleDecode()
    if (decoded?.exp < (currenrTime.getTime() / 1000)) {
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data.access_token}`
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
console.log("document.cookie",document.cookie);

  const handleGetUserDetails = async (id, token) => {
    try {
      const res = await UserService.getDetailUser(id, token);
      dispatch(updateUser({ ...res, accessToken: token }));
    } catch (error) {
      console.error(error);
      dispatch(updateUser(null)); 
    } finally {
      setLoading(false); 
    }
  };
  const handleDecode = () => {
    let storageData = localStorage.getItem('accessToken')
    let decoded = {}
    if (storageData && helpers.isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }
  if (loading) {
    return <LoadingPage />; 
  }
  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = MainLayout
          if (route.layout)
            Layout = route.layout
          else if (route.layout === null)
            Layout = Fragment
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}
        {user?.role === "admin" || user?.role === "subadmin" ?
          privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = AdminLayout
            if (route.layout)
              Layout = route.layout
            else if (route.layout === null)
              Layout = Fragment
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          }) :
          <></>
        }

      </Routes>
    </>
  )
}

export default App
