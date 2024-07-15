import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { CategoryProvider } from "./app/admin/context/categoryContext";
import { UserProvider } from "./app/admin/context/userContext";
import { MenuProvider } from "./app/admin/context/menuContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <MenuProvider>
      <UserProvider>
        <CategoryProvider>
          <HomeProvider>{children}</HomeProvider>
        </CategoryProvider> 
      </UserProvider>
    </MenuProvider>
  );
};

export default Provider;
