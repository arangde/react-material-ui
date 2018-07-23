// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
// import UserList from "views/UserProfile/UserList.jsx";
// import MemberList from "views/MemberList/MemberList.jsx";

const routes = [
  {
    path: "/admin",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  // {
  //   path: "/admin/members",
  //   sidebarName: "Member List",
  //   navbarName: "Member List",
  //   icon: Person,
  //   component: MemberList
  // },
  // {
  //   path: "/admin/users",
  //   sidebarName: "User List",
  //   navbarName: "User List",
  //   icon: Person,
  //   component: UserList
  // },
];

export default routes;
