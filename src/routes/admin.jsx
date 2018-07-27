// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import { Group, Person, Payment, Settings, LocalOffer } from "@material-ui/icons";
// core components/views
import DashboardPage from "views/admin/Dashboard";
import MemberList from "views/admin/MemberList";
import MemberCreate from "views/admin/MemberCreate";
import MemberDetail from "views/admin/MemberDetail";
import SaleList from "views/admin/SaleList";
import SaleCreate from "views/admin/SaleCreate";
import SaleDetail from "views/admin/SaleDetail";
import MemberIncomes from "views/admin/MemberIncomes";
import MemberWithdrawals from "views/admin/MemberWithdrawals";
import MemberPoints from "views/admin/MemberPoints";
import MemberSales from "views/admin/MemberSales";
import MemberRefers from "views/admin/MemberRefers";
import WithdrawalList from "views/admin/WithdrawalList";
import WithdrawalDetail from "views/admin/WithdrawalDetail";
import UserList from "views/admin/UserList";
import UserCreate from "views/admin/UserCreate";
import UserDetail from "views/admin/UserDetail";
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
    icon: Group,
    component: MemberList
  },
  {
    path: "/admin/withdrawals",
    sidebarName: "Withdrawal List",
    navbarName: "Withdrawal List",
    icon: Payment,
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
    path: "/admin/members/:id/refers",
    component: MemberRefers
  },
  {
    path: "/admin/members/:id/sales",
    component: MemberSales
  },
  {
    path: "/admin/sales",
    sidebarName: "Sale List",
    navbarName: "Sale List",
    icon: LocalOffer,
    component: SaleList
  },
  {
    path: "/admin/sales/create",
    navbarName: "Create New Sale",
    component: SaleCreate
  },
  {
    path: "/admin/sales/:id",
    component: SaleDetail
  },
  {
    path: "/admin/users",
    sidebarName: "User List",
    navbarName: "User List",
    icon: Person,
    component: UserList
  },
  {
    path: "/admin/users/create",
    navbarName: "Create New User",
    component: UserCreate
  },
  {
    path: "/admin/users/:id",
    component: UserDetail
  },
  {
    path: "/admin/settings",
    sidebarName: "System Settings",
    navbarName: "System Settings",
    icon: Settings,
    component: SystemSettings
  },
  { redirect: true, path: "/admin", to: "/admin/dashboard", navbarName: "Redirect" },
];

export default routes;
