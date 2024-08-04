export const selectStyle = {
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

export const disabledStyle = {
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
