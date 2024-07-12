import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { CategoryContext } from "../../context/categoryContext";
import LoadingComponent from "../../../../shared/components/Loading";
import Modal from "../../../../shared/components/model";
import ListItem from "../../components/listItem";

const CategoryPage = () => {
  const { service, state } = useContext(CategoryContext);
  const [createOrEdit, setCreateOrEdit] = useState<"create" | "edit">("create");
  const [categoryToEdit, setCategoryToEdit] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [errorMsg, setErrorMsg] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  function createCategory() {
    return () => {
      if (!newCategoryName) return;
      service.createCategory({ name: newCategoryName });
    }
  }

  const onChangeNewCategoryName = useCallback((event) => {
    setNewCategoryName(event.target.value);
  }, []);

  const closeModalAlert = useCallback(() => {
    setErrorMsg('');
  }, []);

  function editCategory() {
    return () => {
      if (!categoryToEdit) return;
      service.updateCategory(categoryToEdit, { name: newCategoryName })
    };
  }

  function onEditCategory(categoryId: string, categoryName: string) {
    return () => {
      if (createOrEdit === 'edit' && categoryToEdit === categoryId) {
        setCreateOrEdit("create");
        setCategoryToEdit(null);
        setNewCategoryName("");
        return;
      }
      setCategoryToEdit(categoryId);
      setNewCategoryName(categoryName);
      setCreateOrEdit("edit");
    };
  }

  function deleteCategory(categoryId: string) {
    return () => service.deleteCategory(categoryId);
  }

  useEffect(() => {
    service.getCategories()

    function loading() {
      setShowLoading(true)
      setTimeout(() => {
        setShowLoading(false) 
      }, 1000);
    }

    state.createCategoryRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => loading()
    })
    state.updateCategoryRequestStatus.maybeMap({
      failed: (error) => {
        console.log(error.message)
        setErrorMsg(error.message)
      },
      loading: () => loading()
    })
    state.deleteCategoryRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => loading()
    })
  }, 
  [service,
    state.updateCategoryRequestStatus,
    state.deleteCategoryRequestStatus,
    state.createCategoryRequestStatus
  ]);

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Categorias</h1>
      <div className={styles.listContainer}>
        {state.getCategoriesRequestStatus.maybeMap({
          loading: () => <span>Carregando...</span>,
          failed: () => <span>Erro ao carregar categorias!</span>,
          succeeded: (categories) => (
            <>
              {categories.map((category) => {
                return (
                  <ListItem
                    key={category.id}
                    name={category.name}
                    deleteDisabled={createOrEdit == 'edit'}
                    deleteBtnCallback={deleteCategory(category.id)}
                    editButtonCallback={onEditCategory(category.id, category.name)}
                    editDisabled={createOrEdit == 'edit' && category.id !== categoryToEdit}
                  ></ListItem>
                );
              })}
            </>
          ),
        })}
      </div>
      <br />
      <div className={styles.buttons}>
        <input
          onChange={onChangeNewCategoryName}
          value={newCategoryName}
          className={styles.createInput}
          placeholder="Nome da nova categoria"
        ></input>
        {createOrEdit === 'edit' ?
          <button 
            className={styles.createButton}
            name={'Editar categoria'}
            onClick={editCategory()}
          >Editar Categoria</button>
          :
          <button 
            className={styles.createButton}
            name={'Adicionar categoria'}
            onClick={createCategory()}
            disabled={createOrEdit === 'create' && newCategoryName === ''}
          >Adicionar Categoria</button>
        }
      </div>
      {showLoading && <LoadingComponent></LoadingComponent>}
      <Modal
        open={errorMsg !== ''}
        title="Ocorreu um erro inesperado."
        closeButtonCallback={closeModalAlert}
      >
        <span>{errorMsg}</span>
      </Modal>
    </section>
  );
};

export default CategoryPage;