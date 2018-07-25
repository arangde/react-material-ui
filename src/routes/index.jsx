import Admin from "containers/Admin.jsx";
import Home from "containers/Home.jsx";
import Login from "containers/Login.jsx";
import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";

const routes = [
    { path: "/admin/login", component: Login },
    { path: "/login", component: Login },
    { path: "/admin", component: Admin },
    { path: "/landing-page", name: "LandingPage", component: LandingPage },
    { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
    { path: "/login-page", name: "LoginPage", component: LoginPage },
    { path: "/components", name: "Components", component: Components },
    { path: "/", name: "Home", component: Home }
];

export default routes;
