import { Box } from "@mui/material"
import { Form } from "./components"
import styles from "./page.module.scss"

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      gap="2rem"
      padding="2rem"
      minHeight="100vh"
    >
      <h1>Encontre a sua cidade!</h1>
      <Form />
      <footer className={styles.footer}>
        Feito com ❤️ por Maylla Rabay ©2024
      </footer>
    </Box>
  )
}
