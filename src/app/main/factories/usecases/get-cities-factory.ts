import { RemoteGetCities } from "@/app/data/usecases"
import { GetCities } from "@/app/domain/usecases"

export const makeRemoteGetCities = (): GetCities => {
  return new RemoteGetCities()
}
