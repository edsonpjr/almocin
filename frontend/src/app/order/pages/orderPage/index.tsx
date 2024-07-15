import { mockItems, mockOrders, mockOrderStatus } from "../../../../shared/types/mockorder";
import BaseLayout from "../../../admin/components/baseLayout";
import styles from "./index.module.css"

const OrderPage = () => {
  let inProgressOrders = mockOrders.filter((order)=> order.status === mockOrderStatus.inProgress);
  const allItemsIds = inProgressOrders.flatMap(order => order.itemsId);
  const Items = mockItems.filter(item => allItemsIds.includes(item.id));
  return (
    <BaseLayout titlePage="order">
      <ul >
        <div>
            {inProgressOrders.map((order, index) => (
              <div>
                  <li key={index} className={styles.orderPanel}>
                    <div className={styles.orderInfo}>
                      <p> id: {order.id}</p>
                      <p> delivery time: {order.totalDeliveryTime}</p>
                      <p> user id: {order.userID}</p>
                      <p>total Price: ${order.totalPrice}</p>
                    </div>

                    <div className={styles.itemInfo}>
                      {order.itemsId.map((itemId) => {
                        const item = mockItems.find((item) => item.id === itemId);
                        return item ? (
                          <div key={item.id} className={styles.itemInfo}>
                            <p>{item.name}</p>
                            <p>price: ${item.price}</p>
                            <img src={item.image}  />
                          </div>
                        ) : (
                          <div key={itemId} >
                            <p>Item not found</p>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div>
                      <div>
                        <p>total price: </p>
                      </div>
                  
                      <div className={styles.summaryButtons}>
                        <button className={styles.cancelButton}>
                          cancelar
                        </button>
                    </div>
                    </div> 

                  </li>
              </div>
            ))}
        

        
      </div>
      </ul>
    </BaseLayout>
  );
}

export default OrderPage;