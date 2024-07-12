import { BaseLayoutProps } from "../../types/components-props";
import styles from "./index.module.css";

const BaseLayout = ({ children, titlePage }: BaseLayoutProps) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{ titlePage }</h1>
      {children}
    </section>
  );
};

export default BaseLayout;