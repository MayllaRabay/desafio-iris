import { FormStateModel } from "@/app/domain/models"

export const initialState: FormStateModel = {
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
