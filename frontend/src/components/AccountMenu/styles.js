import { theme } from "../../themes/Default";

import { deepPurple } from "@mui/material/colors";

export const styles = {
  userName: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
};
