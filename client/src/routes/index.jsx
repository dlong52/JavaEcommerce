import ProfileLayout from "../components/layouts/ProfileLayout"
import {
    CartPage,
    ChangeAddressPage,
    HomePage,
    NotFoundPage,
    NotifyPage,
    OrderPage,
    ProductDetail,
    ProfilePage,
    ShopPage,
    SignInPage,
    SignUpPage
} from "../pages"

import {
    HomePageAdmin,
} from "../Admin"
import ProductAdminPage from "../Admin/ProductAdminPage"
import CategoryAdminPage from "../Admin/CategoryAdminPage"
import OrderAdminPage from "../Admin/OrderAminPage"
import UserAdminPage from "../Admin/UserAdminPage"
import CollectionAdminPage from "../Admin/CollectionAdminPage"
import NoFooterLayout from "../components/layouts/NoFooterLayout"
import OrderDetailAdminPage from "../Admin/OrderDetailAdminPage"
import UserDetailAdminPage from "../Admin/UserDetailAdminPage"
import ProductDetailAdminPage from "../Admin/ProductDetailAdminPage"
import OrderDetailPage from "../pages/OrderDetailPage"
import SearchPage from "../pages/SearchPage"

const publicRoutes = [
    {
        path: "/",
        component: HomePage
    },
    {
        path: "/shop",
        component: ShopPage
    },
    {
        path: "/search",
        component: SearchPage
    },
    {
        path: "/shop/:p_id",
        component: ProductDetail
    },
    {
        path: "/cart",
        component: CartPage,
        layout: NoFooterLayout
    },
    {
        path: "/profile",
        component: ProfilePage,
        layout: ProfileLayout
    },
    {
        path: "/profile/address",
        component: ChangeAddressPage,
        layout: ProfileLayout
    },
    {
        path: "/profile/order",
        component: OrderPage,
        layout: ProfileLayout
    },
    {
        path: "/profile/order/:order_id",
        component: OrderDetailPage,
        layout: ProfileLayout
    },
    {
        path: "/profile/notify",
        component: NotifyPage,
        layout: ProfileLayout
    }, {
        path: "/profile/order",
        component: OrderPage,
        layout: ProfileLayout
    },
    {
        path: "/signin",
        component: SignInPage,
        layout: null
    },
    {
        path: "/signup",
        component: SignUpPage,
        layout: null
    },
    {
        path: "*",
        component: NotFoundPage,
        layout: null
    }
]
const privateRoutes = [
    {
        path: "/admin",
        component: HomePageAdmin
    },
    {
        path: "/admin/product",
        component: ProductAdminPage
    },
    {
        path: "/admin/product/:productId",
        component: ProductDetailAdminPage
    },
    {
        path: "/admin/category",
        component: CategoryAdminPage
    },
    {
        path: "/admin/collection",
        component: CollectionAdminPage
    },
    {
        path: "/admin/order",
        component: OrderAdminPage
    },
    {
        path: "/admin/order/:orderId",
        component: OrderDetailAdminPage
    },
    {
        path: "/admin/user",
        component: UserAdminPage
    },
    {
        path: "/admin/user/:userId",
        component: UserDetailAdminPage
    },
]
const headerRoutes = [
    {
        path: "",
        name: "FLASH SALE",
    },
    {
        path: "/shop#",
        name: `Tất cả sản phẩm`,
        dropdown: true,
    },
    {
        path: "/shop#category=2",
        name: "Đồ thể thao",
    },
    {
        path: "/shop#category=1",
        name: "Mặc hàng ngày",
    },
    {
        path: "/shop#category=3",
        name: "Đồ lót",
    },
    {
        path: "/shop#category=4",
        name: "Nước hoa",
    },
]
const sidebarRouter = [
    {
        path: "/admin",
        name: "Dashboard",
        icon: <i className="fa-lg fa-solid fa-gauge-high"></i>
    },
    {
        path: "/admin/product",
        name: "Sản phẩm",
        icon: <i className="fa-lg fa-solid fa-layer-group"></i>
    },
    {
        path: "/admin/category",
        name: "Danh mục",
        icon: <i className="fa-solid fa-list fa-lg"></i>
    },
    {
        path: "/admin/collection",
        name: "Loại sản phẩm",
        icon: <i className="fa-solid fa-shirt"></i>
    },
    {
        path: "/admin/order",
        name: "Đơn hàng",
        icon: <i className="fa-lg fa-regular fa-rectangle-list"></i>
    },
    {
        path: "/admin/user",
        name: "Người dùng",
        icon: <i className="fa-lg fa-regular fa-user"></i>
    },
]
export { publicRoutes, privateRoutes, headerRoutes, sidebarRouter }