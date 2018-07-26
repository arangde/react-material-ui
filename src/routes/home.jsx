import LandingPage from "views/LandingPage";
import Profile from "views/Profile";

const routes = [
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/", name: "LandingPage", component: LandingPage },
];

export default routes;
