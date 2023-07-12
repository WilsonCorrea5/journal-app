import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({
  id,
  title = "",
  body = "",
  date,
  imageURL = [],
}) => {
  const dispatch = useDispatch();

  //TO DO -> transform the next code in a custom hook
  const newTitle = useMemo(() => {
    return title.length > 12 ? title.substring(0, 12) + "..." : title;
  }, [title]);
  const newBody = useMemo(() => {
    return body.length > 34 ? body.substring(0, 34) + "..." : body;
  }, [body]);
  //--------------------------------------------
  const handleClickedNote = () => {
    dispatch(setActiveNote({ id, title, body, date, imageURL }));
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClickedNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item>
            <ListItemText primary={newTitle} />
          </Grid>
          <Grid item>
            <ListItemText secondary={newBody} />
          </Grid>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
