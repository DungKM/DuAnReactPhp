/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Icons from "views/Icons.js";
import Categories from "views/Categories/Categories";
import CreateCategory from "views/Categories/CreateCategory";
import EditCategory from "views/Categories/EditCategory";
import Brands from "views/Brands/Brands";
import CreateBrand from "views/Brands/CreateBrand";
import EditBrand from "views/Brands/EditBrand";
import Products from "views/Products/Products";
import CreateProduct from "views/Products/CreateProduct";
import EditProduct from "views/Products/EditProduct";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Categories",
    icon: "nc-icon nc-bullet-list-67",
    component: Categories,
    layout: "/admin",
  },
  {
    path: "/category/create",
    name: "CreateCategories",
    component: CreateCategory,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/category/edit/:id",
    name: "EditCategories",
    component: EditCategory,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/brands",
    name: "Brands",
    icon: "nc-icon nc-layers-3",
    component: Brands,
    layout: "/admin",
  },
  {
    path: "/brand/create",
    name: "CreateBrands",
    component: CreateBrand,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/brand/edit/:id",
    name: "EditBrands",
    component: EditBrand,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/products",
    name: "Products",
    icon: "nc-icon nc-cart-simple",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/product/create",
    name: "CreateProducts",
    component: CreateProduct,
    layout: "/admin",
    redirect: true,
  },
  {
    path: "/product/edit/:id",
    name: "EditProducts",
    component: EditProduct,
    layout: "/admin",
    redirect: true,
  },
];

export default dashboardRoutes;
