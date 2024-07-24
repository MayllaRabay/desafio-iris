import { Form } from "@/app/components"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"

describe("Form", () => {
  it("renders the label 'País'", () => {
    render(<Form />)
    const element = screen.getByText("País")
    expect(element).toBeInTheDocument()
  })

  it("renders the label 'Estado'", () => {
    render(<Form />)
    const element = screen.getByText("Estado")
    expect(element).toBeInTheDocument()
  })

  it("renders the label 'Cidade'", () => {
    render(<Form />)
    const element = screen.getByText("Cidade")
    expect(element).toBeInTheDocument()
  })

  it("state 'isCountryLoading' as true", () => {
    render(<Form />)
    const element = screen.getByText("Carregando...")
    expect(element).toBeInTheDocument()
  })

  it("list of countries loaded after first render", async () => {
    render(<Form />)
    expect(screen.queryByText("Selecione um País")).toBeNull()
    await waitFor(() =>
      expect(screen.getByText("Selecione um País")).toBeInTheDocument()
    )
  })
})
