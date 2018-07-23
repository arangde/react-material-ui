// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import MemberList from "views/MemberList";
import MemberCreate from "views/MemberCreate";
import MemberDetail from "views/MemberDetail";
import SaleList from "views/SaleList";
import IncomeList from "views/IncomeList";

const routes = [
  {
    path: "/admin/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/admin/sales",
    sidebarName: "Sale List",
    navbarName: "Sale List",
    icon: Person,
    component: SaleList
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
    component: MemberCreate
  },
  {
    path: "/admin/members/:id",
    component: MemberDetail
  },
  {
    path: "/admin/members/:id/incomes",
    component: IncomeList
  },
  { redirect: true, path: "/admin", to: "/admin/dashboard", navbarName: "Redirect" },
];

export default routes;
