// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import MemberList from "views/MemberList";
import MemberCreate from "views/MemberCreate";
import MemberDetail from "views/MemberDetail";
import SaleList from "views/SaleList";

const routes = [
  {
    path: "/admin/dashboard",
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
    path: "/admin/members/create",
    navbarName: "Create New Member",
    icon: Person,
    component: MemberCreate
  },
  {
    path: "/admin/members/:id",
    navbarName: "Update Member Details",
    icon: Person,
    component: MemberDetail
  },
  {
    path: "/admin/sales",
    sidebarName: "Sale List",
    navbarName: "Sale List",
    icon: Person,
    component: SaleList
  },
  { redirect: true, path: "/admin", to: "/admin/dashboard", navbarName: "Redirect" }
];

export default routes;
