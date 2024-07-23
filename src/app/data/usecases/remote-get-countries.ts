import { GetCountries } from "@/app/domain/usecases"

export class RemoteGetCountries implements GetCountries {
  async get(): Promise<GetCountries.Response> {
    const requestOptions: RequestInit = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json"
      },
      redirect: "follow"
    }
    const { error, msg, data } = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      requestOptions
    ).then((response) => response.json())

    console.log("data: ", data)
    console.log("error: ", error)
    console.log("msg: ", msg)
    return data
  }
}
