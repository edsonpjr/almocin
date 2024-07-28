import { ReactNode } from "react";
import { HomeProvider } from "./app/home/context/HomeContext";
import { CategoryProvider } from "./app/admin/context/CategoryContext";
import { UserProvider } from "./app/admin/context/userContext";
import { MenuProvider } from "./shared/context/menuContext";
import { StatsProvider } from "./app/admin/context/statsContext";
import { OrderProvider } from "./app/home/context/OrderContext";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <OrderProvider>
      <MenuProvider>
        <UserProvider>
          <CategoryProvider>
            <StatsProvider>
              <HomeProvider>{children}</HomeProvider>
            </StatsProvider>
          </CategoryProvider>
        </UserProvider>
      </MenuProvider>
    </OrderProvider>
  );
};

export default Provider;
