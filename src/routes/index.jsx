import Dashboard from "containers/Dashboard.jsx";
import Login from "containers/Login.jsx";

const routes = [
    { path: "/login", component: Login },
    { path: "/", component: Dashboard },
];

export default routes;
