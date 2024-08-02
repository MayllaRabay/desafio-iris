"use client"
import { CountryModel } from "@/app/domain/models"
import {
  makeRemoteGetCities,
  makeRemoteGetCountries
} from "@/app/main/usecases"
import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar
} from "@mui/material"
import { useEffect, useState } from "react"
import { initialState } from "./form-state"

export default function Form({
  getCountries = makeRemoteGetCountries(),
  getCities = makeRemoteGetCities()
}) {
  const [state, setState] = useState(initialState)
  const isStateDisabled =
    (state.currentCountry && state.statesList.length === 0) ||
    state.isStateLoading ||
    !state.currentCountry
  const isCityDisabled =
    (state.currentState && state.citiesList.length === 0) ||
    state.isCityLoading ||
    !state.currentState

  const selectStyle = {
    "&& label, && p": {
      color: "var(--color-gray-M)"
    },
    "&& fieldset": {
      boxShadow: 1,
      borderRadius: 2
    },
    "&& div": {
      color: "var(--color-theme)",
      fontWeight: "bold",
      letterSpacing: "0.5px"
    },
    "&:hover": {
      "&& label": {
        color: "var(--color-theme)"
      },
      "&& fieldset": {
        borderColor: "var(--color-theme)"
      },
      "&& svg": {
        fill: "var(--color-theme)"
      }
    }
  }

  const disabledStyle = {
    cursor: "not-allowed",
    "&& *": {
      cursor: "not-allowed"
    },
    "&& label, && p": {
      color: "var(--color-gray-L)"
    },
    "&& fieldset": {
      backgroundColor: "var(--color-gray-XL)",
      boxShadow: 1,
      borderRadius: 2
    },
    "&& input": {
      borderColor: "var(--color-gray-L)"
    }
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
    <Box
      display="flex"
      flexDirection="column"
      rowGap="0.875rem"
      width="100%"
      maxWidth="40rem"
    >
      <FormControl
        fullWidth
        size="small"
        sx={state.isCountryLoading ? disabledStyle : selectStyle}
      >
        <InputLabel id="country-select-label">País</InputLabel>
        <Select
          labelId="country-select-label"
          id="country-select"
          value={state.currentCountry}
          onChange={handleChangeCountry}
          disabled={state.isCountryLoading}
          label="País"
        >
          {state.countriesList?.map((country: string, index: number) => {
            return (
              <MenuItem key={index} value={country}>
                {country}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>
          {state.isCountryLoading
            ? "Carregando..."
            : state.currentCountry === ""
            ? "Selecione um País"
            : " "}
        </FormHelperText>
      </FormControl>

      <FormControl
        fullWidth
        size="small"
        sx={isStateDisabled ? disabledStyle : selectStyle}
      >
        <InputLabel id="state-select-label">Estado</InputLabel>
        <Select
          labelId="state-select-label"
          id="state-select"
          value={state.currentState}
          onChange={handleChangeState}
          disabled={isStateDisabled}
          label="Estado"
        >
          {state.statesList?.map((state: string, index: number) => {
            return (
              <MenuItem key={index} value={state}>
                {state}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>
          {state.isStateLoading
            ? "Carregando..."
            : !state.currentCountry
            ? "Selecione antes um País"
            : state.currentCountry && state.statesList.length === 0
            ? "Nenhum Estado disponível..."
            : state.currentState === ""
            ? "Selecione um Estado"
            : " "}
        </FormHelperText>
      </FormControl>

      <FormControl
        fullWidth
        size="small"
        sx={isCityDisabled ? disabledStyle : selectStyle}
      >
        <InputLabel id="city-select-label">Cidade</InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          value={state.currentCity}
          onChange={handleChangeCity}
          disabled={isCityDisabled}
          label="Cidade"
        >
          {state.citiesList?.map((city: string, index: number) => {
            return (
              <MenuItem key={index} value={city}>
                {city}
              </MenuItem>
            )
          })}
        </Select>
        <FormHelperText>
          {state.isCityLoading
            ? "Carregando..."
            : !state.currentState
            ? "Selecione antes um Estado"
            : state.currentState && state.citiesList.length === 0
            ? "Nenhuma Cidade disponível..."
            : state.currentCity === ""
            ? "Selecione uma Cidade"
            : " "}
        </FormHelperText>
      </FormControl>

      <Snackbar
        open={state.cityMessageSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => {
            setState((old) => ({ ...old, cityMessageSuccess: false }))
          }}
          sx={{
            backgroundColor: "var(--color-theme)",
            fontWeight: "bold"
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
        <Alert severity="error" variant="filled" sx={{ fontWeight: "bold" }}>
          {state.mainError}
        </Alert>
      </Snackbar>
    </Box>
  )
}
