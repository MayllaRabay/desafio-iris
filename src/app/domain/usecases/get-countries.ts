import { CountryModel } from "@/app/domain/models"

export interface GetCountries {
  get(): Promise<GetCountries.Response>
}

export namespace GetCountries {
  export type Response = Array<CountryModel>
}
