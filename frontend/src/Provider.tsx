import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { CategoryProvider } from "./app/admin/context/CategoryContext";
import { UserProvider } from "./app/admin/context/userContext";
import { MenuProvider } from "./shared/context/menuContext";
import { StatsProvider } from "./app/admin/context/statsContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <MenuProvider>
      <UserProvider>
        <CategoryProvider>
          <StatsProvider>
            <HomeProvider>{children}</HomeProvider>
          </StatsProvider>
        </CategoryProvider>
      </UserProvider>
    </MenuProvider>
  );
};

export default Provider;
