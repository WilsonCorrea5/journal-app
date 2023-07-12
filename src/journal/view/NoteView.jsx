import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { ImagesGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import {
  setActiveNote,
  startDeleteNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal";

export const NoteView = () => {
  const {
    active: note,
    savingMessage,
    isSaving,
  } = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const { title, body, date, formState, onInputChange } = useForm(note);
  //
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);
  //
  const fileInputRef = useRef();
  //
  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);
  //
  useEffect(() => {
    if (savingMessage.length > 0) {
      Swal.fire("NOTE UPDATED", savingMessage, "success");
    }
  }, [savingMessage]);
  //
  const handleSaveNote = () => {
    dispatch(startSaveNote());
  };
  //
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    console.log("subiendo");
    dispatch(startUploadingFiles(target.files));
  };
  //
  const handleDelete = () => {
    dispatch(startDeleteNote());
  };
  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          onClick={handleSaveNote}
          color="primary"
          sx={{ padding: 2 }}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Add a title here ..."
          label="Title Entry"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What's going on..."
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>
      <Grid container justifyContent="end">
        <Button onClick={handleDelete} sx={{ mt: 2 }} color="error">
          <DeleteOutline />
          Delete Note
        </Button>
      </Grid>
      <ImagesGallery images={note.imageURL} />
    </Grid>
  );
};
