import { RemoteGetCountries } from "@/app/data/usecases"
import { GetCountries } from "@/app/domain/usecases"

export const makeRemoteGetCountries = (): GetCountries => {
  return new RemoteGetCountries()
}
