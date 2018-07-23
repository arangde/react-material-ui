import Admin from "containers/Admin.jsx";
import Home from "containers/Home.jsx";
import Login from "containers/Login.jsx";

const routes = [
    { path: "/admin/login", component: Login },
    { path: "/login", component: Login },
    { path: "/admin", component: Admin },
    { path: "/", component: Home },
];

export default routes;
