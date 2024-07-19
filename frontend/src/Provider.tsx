import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { CategoryProvider } from "./app/admin/context/CategoryContext";
import { UserProvider } from "./app/admin/context/userContext";
import { MenuProvider } from "./app/admin/context/menuContext";
import { StatsProvider } from "./app/admin/context/statsContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <MenuProvider>
      <UserProvider>
        <CategoryProvider>
          <HomeProvider>{children}</HomeProvider>
        </CategoryProvider>
        <StatsProvider>
          <HomeProvider>{children}</HomeProvider>
        </StatsProvider>
      </UserProvider>
    </MenuProvider>
  );
};

export default Provider;
