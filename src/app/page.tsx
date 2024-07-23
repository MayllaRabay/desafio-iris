import { Form } from "./components";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Encontre a sua cidade!</h1>
      <Form />
    </main>
  );
}
