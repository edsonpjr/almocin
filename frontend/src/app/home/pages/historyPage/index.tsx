import { useContext, useEffect } from "react";
import { OrderContext } from "../../context/OrderContext";

import LoadingComponent from "../../../../shared/components/Loading";
import BaseLayout from "../../../../shared/components/BaseLayout";

import styles from './index.module.css';
import { listItemUser } from "../../../../shared/types/base-layout";

const HistoryPage = () => {
  const { service, state } = useContext(OrderContext);

  useEffect(() => {
    service.getOrders()
  }, 
  [service
  ]);

  return (
    <BaseLayout titlePage="Historico" listItem={listItemUser}>
      <div>
        {state.getOrdersRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => (
            <span>Erro ao carregar o order!</span>
          ),
          succeeded: (orders) => (
            <>
              {orders.map((order,index) => {
                return (
                    <div key={index}>
                        <li className= {styles.orderPanel}>
                          <div className="list-elem-left">
                            <p>ID: {order.id}</p>
                            <p>Items ID: {order.itemsId.join(', ')}</p>
                            <p>User ID: {order.userID}</p>
                            <p>Total Price: ${order.totalPrice}</p>
                            <p>Status: {order.status}</p>
                            <p>Total Delivery Time: {order.totalDeliveryTime} days</p>
                            <p>CEP: {order.cep}</p>
                            <p>Address Number: {order.address_number}</p>
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

export default HistoryPage;
