"use client"
import { CountryModel } from "@/app/domain/models"
import { useContext, useLayoutEffect, useState } from "react"
import { CountriesContext } from "../contexts"
import { makeLocalStorageAdapter } from "../factories/cache"
import { makeRemoteGetCountries } from "../factories/usecases"

type Props = {
  children: React.ReactNode
}

export function CountriesProvider({ children }: Props) {
  const [countries, setCountries] = useState<Array<CountryModel>>([])
  const getCountries = makeRemoteGetCountries()
  const localStorage = makeLocalStorageAdapter()

  const handleGetCountries = async () => {
    if (localStorage.contains("countries")) {
      const countriesList = localStorage.get("countries")
      setCountries(countriesList)
    } else {
      try {
        const responseCountries = await getCountries.get()
        localStorage.set("countries", responseCountries)
        setCountries(responseCountries)
      } catch (error: any) {
        throw new Error(error.message)
      }
    }
  }

  useLayoutEffect(() => {
    handleGetCountries()
  }, [])

  return (
    <CountriesContext.Provider value={{ countries, setCountries }}>
      {children}
    </CountriesContext.Provider>
  )
}

export function useCountriesContext() {
  const context = useContext(CountriesContext)
  if (!context) {
    throw new Error(
      "useCountriesContext must be used within a CountriesContextProvider"
    )
  }
  return context
}
