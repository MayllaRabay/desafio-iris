"use client";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { initialState } from "./form-state";
import styles from "./form.module.scss";

export default function Form() {
  const [state, setState] = useState(initialState);

  const handleChangeCountry = (e: any) => {
    setState({ ...state, currentCountry: e.target.value });
  };

  const handleChangeState = (e: any) => {
    setState({ ...state, currentState: e.target.value });
  };

  const handleChangeCity = (e: any) => {
    setState({ ...state, currentCity: e.target.value });
  };

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
        >
          <MenuItem value={"Brasil"}>Brasil</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        className={styles.fieldWrapper}
        data-style={
          (state.isStateLoading || !state.currentCountry) && "disabled"
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
                    : "Selecione um Estado"
          }
          value={state.currentState}
          onChange={handleChangeState}
          disabled={state.isStateLoading || !state.currentCountry}
        >
          <MenuItem value={"Bahia"}>Bahia</MenuItem>
          <MenuItem value={"São Paulo"}>São Paulo</MenuItem>
          <MenuItem value={"Rio de Janeiro"}>Rio de Janeiro</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        className={styles.fieldWrapper}
        data-style={(state.isCityLoading || !state.currentState) && "disabled"}
      >
        <label htmlFor="state-select">Cidade</label>
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
                    : "Selecione um Estado"
          }
          value={state.currentCity}
          onChange={handleChangeCity}
          disabled={state.isCityLoading || !state.currentState}
        >
          <MenuItem value={"Salvador"}>Salvador</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
