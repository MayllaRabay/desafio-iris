"use client"
import { CountryModel } from "@/app/domain/models"
import {
  makeRemoteGetCities,
  makeRemoteGetCountries
} from "@/app/main/usecases"
import {
  Alert,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar
} from "@mui/material"
import { useEffect, useState } from "react"
import { initialState } from "./form-state"
import styles from "./form-style.module.scss"

export default function Form({
  getCountries = makeRemoteGetCountries(),
  getCities = makeRemoteGetCities()
}) {
  const [state, setState] = useState(initialState)

  const selectInputStyle = {
    boxShadow: 1,
    borderRadius: 2,
    color: "var(--color-theme)",
    height: "3rem"
  }

  const handleGetCountries = async () => {
    setState((old) => ({ ...old, isCountryLoading: true, mainError: "" }))
    try {
      const responseCountries = await getCountries.get()
      const countriesList = responseCountries?.map(
        (country: any) => country.name
      )
      const countriesAndStatesList = responseCountries
      setState((old) => ({ ...old, countriesList, countriesAndStatesList }))
    } catch (error: any) {
      setState((old) => ({ ...old, mainError: error.message }))
    } finally {
      setState((old) => ({ ...old, isCountryLoading: false }))
    }
  }

  const handleGetCities = async () => {
    setState((old) => ({ ...old, isCityLoading: true, mainError: "" }))
    try {
      const responseCities = await getCities.get({
        country: state.currentCountry,
        state: state.currentState
      })
      const citiesList = responseCities
      setState((old) => ({ ...old, citiesList }))
    } catch (error: any) {
      setState((old) => ({ ...old, mainError: error.message }))
    } finally {
      setState((old) => ({ ...old, isCityLoading: false }))
    }
  }

  const handleChangeCountry = (e: SelectChangeEvent<string>) => {
    const currentCountryObject: Array<CountryModel> =
      state.countriesAndStatesList.filter(
        (item) => item.name === e.target.value
      )
    const statesList = currentCountryObject[0].states.map((state) => state.name)
    setState((old) => ({
      ...old,
      currentCountry: e.target.value,
      currentState: "",
      statesList,
      currentCity: "",
      citiesList: []
    }))
  }

  const handleChangeState = (e: SelectChangeEvent<string>) => {
    setState((old) => ({
      ...old,
      currentState: e.target.value,
      currentCity: "",
      citiesList: []
    }))
  }

  const handleChangeCity = (e: SelectChangeEvent<string>) => {
    setState((old) => ({
      ...old,
      currentCity: e.target.value,
      cityMessageSuccess: true
    }))
  }

  useEffect(() => {
    if (state.currentState !== "") {
      handleGetCities()
    }
  }, [state.currentState])

  useEffect(() => {
    handleGetCountries()
  }, [])

  return (
    <div className={styles.formWrapper}>
      <FormControl
        fullWidth
        className={styles.fieldWrapper}
        data-style={state.isCountryLoading && "disabled"}
      >
        <label htmlFor="country-select">País</label>
        <Select
          id="country-select"
          displayEmpty
          renderValue={
            state.currentCountry !== ""
              ? undefined
              : () =>
                  state.isCountryLoading ? "Carregando..." : "Selecione um País"
          }
          value={state.currentCountry}
          onChange={handleChangeCountry}
          disabled={state.isCountryLoading}
          sx={selectInputStyle}
        >
          {state.countriesList?.map((country: string, index: number) => {
            return (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        className={styles.fieldWrapper}
        data-style={
          ((state.currentCountry && state.statesList.length === 0) ||
            state.isStateLoading ||
            !state.currentCountry) &&
          "disabled"
        }
      >
        <label htmlFor="state-select">Estado</label>
        <Select
          id="state-select"
          displayEmpty
          renderValue={
            state.currentState !== ""
              ? undefined
              : () =>
                  state.isStateLoading
                    ? "Carregando..."
                    : !state.currentCountry
                    ? "Selecione antes um País"
                    : state.currentCountry && state.statesList.length === 0
                    ? "Nenhum Estado disponível..."
                    : "Selecione um Estado"
          }
          value={state.currentState}
          onChange={handleChangeState}
          disabled={
            (state.currentCountry && state.statesList.length === 0) ||
            state.isStateLoading ||
            !state.currentCountry
          }
          sx={selectInputStyle}
        >
          {state.statesList?.map((state: string, index: number) => {
            return (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        className={styles.fieldWrapper}
        data-style={
          ((state.currentState && state.citiesList.length === 0) ||
            state.isCityLoading ||
            !state.currentState) &&
          "disabled"
        }
      >
        <label htmlFor="city-select">Cidade</label>
        <Select
          id="city-select"
          displayEmpty
          renderValue={
            state.currentCity !== ""
              ? undefined
              : () =>
                  state.isCityLoading
                    ? "Carregando..."
                    : !state.currentState
                    ? "Selecione antes um Estado"
                    : state.currentState && state.citiesList.length === 0
                    ? "Nenhuma Cidade disponível..."
                    : "Selecione uma Cidade"
          }
          value={state.currentCity}
          onChange={handleChangeCity}
          disabled={
            (state.currentState && state.citiesList.length === 0) ||
            state.isCityLoading ||
            !state.currentState
          }
          sx={selectInputStyle}
        >
          {state.citiesList?.map((city: string, index: number) => {
            return (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Snackbar
        open={state.cityMessageSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="outlined"
          onClose={() => {
            setState((old) => ({ ...old, cityMessageSuccess: false }))
          }}
        >
          Parabéns! Você encontrou sua cidade!
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!state.mainError}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {state.mainError}
        </Alert>
      </Snackbar>
    </div>
  )
}
