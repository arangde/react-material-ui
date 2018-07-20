import Dashboard from "containers/Dashboard.jsx";
import Login from "containers/Login.jsx";
import Home from "containers/home";

const routes = [
    { path: "/home", component: Home },
    { path: "/login", component: Login },
    { path: "/", component: Dashboard },
];

export default routes;
