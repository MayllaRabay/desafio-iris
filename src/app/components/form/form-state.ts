interface FormStateTypes {
  countriesList: Array<string>;
  currentCountry: string;
  isCountryLoading: boolean;
  statesList: Array<string>;
  currentState: string;
  isStateLoading: boolean;
  citiesList: Array<string>;
  currentCity: string;
  isCityLoading: boolean;
}

export const initialState: FormStateTypes = {
  countriesList: [],
  currentCountry: "",
  isCountryLoading: false,
  statesList: [],
  currentState: "",
  isStateLoading: false,
  citiesList: [],
  currentCity: "",
  isCityLoading: false,
};
