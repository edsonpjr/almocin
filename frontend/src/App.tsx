import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import CategoryPage from "./app/admin/pages/categoryPage";
import UserPage from "./app/admin/pages/userPage";
import MenuPage from "./app/admin/pages/menuPage";
import AdminPage from "./app/admin/pages/adminPage";

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: '/adm',
    children: [
      {
        path: '',
        Component: AdminPage
      },
      {
        path: 'cardapio',
        Component: MenuPage
      },
      {
        path: 'usuarios',
        Component: UserPage
      },
      {
        path: 'categorias',
        Component: CategoryPage
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
