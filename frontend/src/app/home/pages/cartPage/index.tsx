import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext";

import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../../../shared/components/BaseLayout";

import styles from './index.module.css';
import { OrderStatus } from "../../../../shared/types/order";
import { listItemUser } from "../../../../shared/types/base-layout";

const CartPage = () => {
  const { service, state } = useContext(OrderContext);

  useEffect(() => {
    service.getOrders()
  }, 
  [service
  ]);

  return (
    <BaseLayout titlePage="Order" listItem={listItemUser}>
      <div>
        {state.getOrdersRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => (
            <span>Erro ao carregar o order!</span>
          ),
          succeeded: (orders) => (
            <>
              {orders.filter((order)=> order.status===OrderStatus.inCart).map((order,index) => {
                return (
                    <div key={index}>
                        <li className= {styles.orderPanel}>
                          <div className="list-elem-left">
                            <p>Items ID: {order.itemsId.join(', ')}</p>
                            <p>price: {order.totalPrice}</p>
                            <p>status: {order.status}</p>
                          </div>
                          <div className="list-elem-right">
                            
                          </div>
                            
                        </li>
                    </div>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
      
    </BaseLayout>
  );
};

export default CartPage;
