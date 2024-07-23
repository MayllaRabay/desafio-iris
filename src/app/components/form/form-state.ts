import { CountryModel } from "@/app/domain/models"

interface FormStateTypes {
  countriesAndStatesList: Array<CountryModel>
  countriesList: Array<string>
  currentCountry: string
  isCountryLoading: boolean
  statesList: Array<string>
  currentState: string
  isStateLoading: boolean
  citiesList: Array<string>
  currentCity: string
  isCityLoading: boolean
}

export const initialState: FormStateTypes = {
  countriesAndStatesList: [],
  countriesList: [],
  currentCountry: "",
  isCountryLoading: false,
  statesList: [],
  currentState: "",
  isStateLoading: false,
  citiesList: [],
  currentCity: "",
  isCityLoading: false
}
