// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import MemberList from "views/MemberList";
import SaleList from "views/SaleList";

const routes = [
  {
    path: "/admin",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/admin/members",
    sidebarName: "Member List",
    navbarName: "Member List",
    icon: Person,
    component: MemberList
  },
  {
    path: "/admin/sales",
    sidebarName: "Sale List",
    navbarName: "Sale List",
    icon: Person,
    component: SaleList
  },
];

export default routes;
