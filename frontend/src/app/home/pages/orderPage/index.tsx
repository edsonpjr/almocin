import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { OrderContext } from "../../context/OrderContext";
import LoadingComponent from "../../../../shared/components/Loading";
import Modal from "../../../../shared/components/Modal";
import ListOrder from "../../components/listorder";
import BaseLayout from "../../../../shared/components/BaseLayout";
import { OrderStatus } from "../../../../shared/types/order";
import { listItemUser } from "../../../../shared/types/base-layout";

const OrderPage = () => {
  const { service, state } = useContext(OrderContext);
  const [createOrEdit, setCreateOrEdit] = useState<"create" | "edit">("create");
  const [orderToEdit, setOrderToEdit] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);


  const closeModalAlert = useCallback(() => {
    setErrorMsg('');
  }, []);

  function onEditOrder(orderId: string) {
    return () => {
      if (createOrEdit === 'edit' && orderToEdit === orderId) {
        setCreateOrEdit("create");
        setOrderToEdit(null);
        return;
      }
      setOrderToEdit(orderId);
      setCreateOrEdit("edit");
    };
  }


  useEffect(() => {
    service.getOrders()

    function loading() {
      setShowLoading(true)
      setTimeout(() => {
        setShowLoading(false) 
      }, 1000);
    }

    state.createOrderRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => loading()
    })
    state.updateOrderRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => loading()
    })
  }, 
  [service,
    state.updateOrderRequestStatus,
    state.createOrderRequestStatus
  ]);

  return (
    <BaseLayout titlePage="Pedidos" listItem={listItemUser}>
      <div className={styles.listContainer}>
        {state.getOrdersRequestStatus.maybeMap({
          loading: () => <LoadingComponent></LoadingComponent>,
          failed: () => (
            <Modal
              open={true}
              title="Ocorreu um erro inesperado."
              closeButtonCallback={closeModalAlert}
            >
              <span>Erro ao carregar as categorias!</span>
            </Modal>
          ),
          succeeded: (orders) => (
            <>
              {orders.filter(order => order.status===OrderStatus.inProgress ).map(
                (order, i) => {
                  return (
                    <ListOrder
                      key={order.id + i}
                      name={order.id}
                      totalPrice={order.totalPrice.toString()}
                      timeToDelivery={order.totalDeliveryTime.toString()}
                      items={order.itemsId}
                      editButtonCallback={onEditOrder(order.id)}
                      editDisabled={createOrEdit == 'edit' && order.id !== orderToEdit}
                    ></ListOrder>
                  );
                }
              )}
            </>
          ),
        })}
      </div>
      <br />

      
      {showLoading && <LoadingComponent></LoadingComponent>}
      <Modal
        open={errorMsg !== ''}
        title="Ocorreu um erro inesperado."
        closeButtonCallback={closeModalAlert}
      >
        <span>{errorMsg}</span>
      </Modal>
    </BaseLayout>
  );
};

export default OrderPage;
