import { GetCities } from "@/app/domain/usecases"

export class RemoteGetCities implements GetCities {
  async get(params: GetCities.Params): Promise<GetCities.Response> {
    const requestOptions: RequestInit = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(params),
      redirect: "follow"
    }
    const { error, msg, data } = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      requestOptions
    ).then((response) => response.json())

    console.log("data: ", data)
    console.log("error: ", error)
    console.log("msg: ", msg)
    return data
  }
}
