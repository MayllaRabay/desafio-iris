import type { Metadata } from "next"
import { Source_Sans_3 } from "next/font/google"
import "./globals.scss"

const sourceSans = Source_Sans_3({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Encontre a sua cidade - Desafio Iris",
  description: "Desafio front-end da Iris Data Tech"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={sourceSans.className}>{children}</body>
    </html>
  )
}
