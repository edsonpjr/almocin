import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CategoryPage from "./app/admin/pages/categoryPage";
import UserPage from "./app/admin/pages/userPage";
import MenuPage from "./app/admin/pages/menuPage";
import AdminPage from "./app/admin/pages/adminPage";
import StatsPage from "./app/admin/pages/statsPage";
import RegisterPage from "./app/login/pages/registerPage";
import LoginPage from "./app/login/pages/loginPage";

const router = createBrowserRouter([
  {
    path: "*",
    Component: LoginPage,
  },
  {
    path: "/cadastro",
    Component: RegisterPage,
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
      },
      {
        path: 'estatisticas',
        Component: StatsPage
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
