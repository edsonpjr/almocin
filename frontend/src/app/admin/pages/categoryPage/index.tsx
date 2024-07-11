import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { CategoryContext } from "../../context/categoryContext";
import LoadingComponent from "../../../../shared/components/Loading";
import Modal from "../../../../shared/components/model";

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

    state.createCategoryRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => {
        setShowLoading(true)
        setTimeout(() => {
          setShowLoading(false) 
        }, 1000);
      }
    })
    state.updateCategoryRequestStatus.maybeMap({
      failed: (error) => {
        console.log(error.message)
        setErrorMsg(error.message)
      },
      loading: () => {
        setShowLoading(true)
        setTimeout(() => {
          setShowLoading(false) 
        }, 1000);
      }
    })
    state.deleteCategoryRequestStatus.maybeMap({
      failed: (error) => setErrorMsg(error.message),
      loading: () => {
        setShowLoading(true)
        setTimeout(() => {
          setShowLoading(false) 
        }, 1000);
      }
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
                  <div key={category.id} className={styles.listItem}>
                    <span
                      data-cy={`category-${category.name}`}
                      className={styles.listItemText}
                    >{category.name}</span>
                    <div className={styles.buttons}>
                      <button
                        name="Editar categoria"
                        className={styles.editButton}
                        onClick={
                          onEditCategory(category.id, category.name)
                        }
                        disabled={createOrEdit === 'edit'
                          && categoryToEdit !== category.id
                        }
                      >
                        Editar
                      </button>
                      <button
                        name="Excluir categoria"
                        className={styles.deleteButton}
                        onClick={deleteCategory(category.id)}
                        disabled={createOrEdit === 'edit'}
                      >
                        X
                      </button>
                    </div>
                  </div>
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