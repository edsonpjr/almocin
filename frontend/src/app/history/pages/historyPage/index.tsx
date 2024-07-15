import BaseLayout from "../../../admin/components/baseLayout";
import { mockOrders } from "../../../../shared/types/mockorder";

const HistoryPage = () => {
  return (
    <BaseLayout titlePage="historico">
      <ul>
        {mockOrders.map((order, index) => (
          <li key={index}>
            <p>ID: {order.id}</p>
            <p>Items ID: {order.itemsId.join(', ')}</p>
            <p>User ID: {order.userID}</p>
            <p>Total Price: ${order.totalPrice}</p>
            <p>Status: {order.status}</p>
            <p>Total Delivery Time: {order.totalDeliveryTime} days</p>
            <p>CEP: {order.cep}</p>
            <p>Address Number: {order.address_number}</p>
          </li>
        ))}
      </ul>
    </BaseLayout>
    
  );
}

export default HistoryPage;