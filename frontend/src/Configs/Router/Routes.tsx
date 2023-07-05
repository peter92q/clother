import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import BasketPage from "../../Pages/BasketPage";
import Checkout from "../../Pages/Checkout";
import Homepage from "../../Pages/Homepage";
import Orders from "../../Pages/Orders";
import Register from "../../Pages/Register";
import RequireAuth from "./RequireAuth";
import ProductPage from "../../Pages/ProductPage";
import Login from "../../Pages/Login";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {element: <RequireAuth/>, children: [
                {path: 'checkout', element: <Checkout/>}
            ]},
            {path: '', element: <Homepage/>},
            {path: 'productDetails/:id', element: <ProductPage/>},
            {path: 'basket', element: <BasketPage/>},
            {path: 'login', element: <Login/>},
            {path: 'register', element: <Register/>},
            {path: 'orders', element: <Orders/>},
        ]
    }
])