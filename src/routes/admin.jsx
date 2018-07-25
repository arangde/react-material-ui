// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views
import DashboardPage from "views/admin/Dashboard";
import MemberList from "views/admin/MemberList";
import MemberCreate from "views/admin/MemberCreate";
import MemberDetail from "views/admin/MemberDetail";
import SaleList from "views/admin/SaleList";
import MemberIncomes from "views/admin/MemberIncomes";
import MemberWithdrawals from "views/admin/MemberWithdrawals";
import MemberPoints from "views/admin/MemberPoints";
import WithdrawalList from "views/admin/WithdrawalList";
import WithdrawalDetail from "views/admin/WithdrawalDetail";
import UserList from "views/admin/UserList";
import SystemSettings from "views/admin/SystemSettings";

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
    path: "/admin/users",
    sidebarName: "User List",
    navbarName: "User List",
    icon: Person,
    component: UserList
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
