export interface CountryModel {
  name: string
  iso3: string
  states: [
    {
      name: string
      state_code: string
    }
  ]
}
