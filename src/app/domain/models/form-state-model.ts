import { CountryModel } from "@/app/domain/models"

export interface FormStateModel {
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
