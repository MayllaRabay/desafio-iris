export interface GetCities {
  get(params: GetCities.Params): Promise<GetCities.Response>
}

export namespace GetCities {
  export interface Params {
    country: string
    state: string
  }
  export type Response = Array<string>
}
