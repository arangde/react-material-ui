import Admin from "views/admin/Admin.jsx";
import AdminLogin from "views/admin/Login";

import Home from "views/Home.jsx";
import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";

const routes = [
    { path: "/admin/login", component: AdminLogin },
    { path: "/admin", component: Admin },
    { path: "/landing", name: "LandingPage", component: LandingPage },
    { path: "/profile", name: "ProfilePage", component: ProfilePage },
    { path: "/login", name: "LoginPage", component: LoginPage },
    { path: "/components", name: "Components", component: Components },
    { path: "/", name: "Home", component: Home }
];

export default routes;
