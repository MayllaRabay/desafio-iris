export interface FormStateModel {
  mainError: string
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
