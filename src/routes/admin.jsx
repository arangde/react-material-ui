// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import MemberList from "views/MemberList";
import MemberCreate from "views/MemberCreate";
import MemberDetail from "views/MemberDetail";
import SaleList from "views/SaleList";
import MemberIncomes from "views/MemberIncomes";
import MemberWithdrawals from "views/MemberWithdrawals";
import MemberPoints from "views/MemberPoints";
import WithdrawalList from "views/WithdrawalList";
import WithdrawalDetail from "views/WithdrawalDetail";
import SystemSettings from "views/SystemSettings";

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
    path: "/admin/withdrawals",
    sidebarName: "Withdrawal List",
    navbarName: "Withdrawal List",
    icon: Person,
    component: WithdrawalList
  },
  {
    path: "/admin/withdrawals/:id",
    component: WithdrawalDetail
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
    component: MemberIncomes
  },
  {
    path: "/admin/members/:id/withdrawals",
    component: MemberWithdrawals
  },
  {
    path: "/admin/members/:id/points",
    component: MemberPoints
  },
  {
    path: "/admin/sales",
    sidebarName: "Sale List",
    navbarName: "Sale List",
    icon: Person,
    component: SaleList
  },
  {
    path: "/admin/settings",
    sidebarName: "System Settings",
    navbarName: "System Settings",
    icon: Person,
    component: SystemSettings
  },
  { redirect: true, path: "/admin", to: "/admin/dashboard", navbarName: "Redirect" },
];

export default routes;
