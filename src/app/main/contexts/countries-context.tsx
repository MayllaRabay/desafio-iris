import { CountryModel } from "@/app/domain/models"
import { createContext, Dispatch, SetStateAction } from "react"

type CountriesContext = {
  countries: Array<CountryModel>
  setCountries: Dispatch<SetStateAction<Array<CountryModel>>>
}

export const CountriesContext = createContext<CountriesContext | null>(null)
