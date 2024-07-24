import { CountryModel } from "@/app/domain/models"

interface FormStateTypes {
  mainError: string
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
  cityMessageSuccess: boolean
}

export const initialState: FormStateTypes = {
  mainError: "",
  countriesAndStatesList: [],
  countriesList: [],
  currentCountry: "",
  isCountryLoading: false,
  statesList: [],
  currentState: "",
  isStateLoading: false,
  citiesList: [],
  currentCity: "",
  isCityLoading: false,
  cityMessageSuccess: false
}
