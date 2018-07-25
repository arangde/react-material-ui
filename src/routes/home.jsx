import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";

const routes = [
  { path: "/profile", name: "ProfilePage", component: ProfilePage },
  { path: "/components", name: "Components", component: Components },
  { path: "/", name: "LandingPage", component: LandingPage },
];

export default routes;
