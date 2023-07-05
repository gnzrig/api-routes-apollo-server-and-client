import gql from "graphql-tag";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import Button from "@mui/material/Button";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize } from "@mui/base";
import { InputLabel } from "@mui/material";

const AllPosts = gql`
  query allPosts {
    allPosts {
      data {
        id
        title
        content
      }
      count
    }
  }
`;

const Index = () => {
  const [open, setOpen] = React.useState(false);
  const [todoId, setTodoId] = React.useState<number>(0);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [todoList, setTodoList] = React.useState<string[]>([]);
  const [updateTitle, setUpdateTitle] = React.useState("");
  const [updateContent, setUpdateContent] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleUpdateOpen = () => {
    setOpenUpdate(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
  };

  const addList = () => {
    handleClose();
    setTodoList([...todoList, title + "|" + content]);
  };

  const deleteItem = (index) => {
    const newArray = [...todoList];
    newArray.splice(index, 1);
    setTodoList(newArray);
  };

  const updateItemOpen = (index) => {
    setTodoId(index);
    const newArray = [...todoList];
    handleUpdateOpen();
    setUpdateTitle(newArray[index].split("|")[0]);
    setUpdateContent(newArray[index].split("|")[1]);
  };

  const updateItem = (index) => {
    const newArray = [...todoList];
    newArray.splice(index, 1, updateTitle + "|" + updateContent);
    setTodoList([...newArray]);
    handleUpdateClose();
  };

  const { data, loading } = useQuery(AllPosts);
  // console.log("first loading", loading);
  // console.log("first Data", data);

  return (
    <div>
      You're signed in as and you're goto <Link href="/about">static</Link>{" "}
      page.
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Add list
        </Button>
        <div style={{ display: "flex" }}>
          {todoList.map((list, index) => {
            return (
              <div
                style={{
                  border: "1px solid black",
                  width: "200px",
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px",
                }}
              >
                <div style={{ margin: "10px", width: "100%" }}>
                  <h2 style={{ textAlign: "center" }}>{index + 1}</h2>
                  Title
                  <p>{list.split("|")[0]}</p>
                  Content
                  <p>{list.split("|")[1]}</p>
                  <div style={{ width: "100%", textAlign: "center" }}>
                    <Button onClick={() => updateItemOpen(index)}>
                      Update
                    </Button>
                    <Button onClick={() => deleteItem(index)}>Delete</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">
            {"Add todo list here"}
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                height: "400px",
                width: "400px",
                justifyContent: "space-around",
              }}
            >
              <InputLabel htmlFor="outlined-basic">Enter title</InputLabel>
              <TextField
                name="title"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
              />
              <InputLabel htmlFor="text-area">
                Enter your content below
              </InputLabel>
              <TextareaAutosize
                id="text-area"
                name="content"
                minRows={8}
                placeholder="Content here"
                onChange={(e) => setContent(e.target.value)}
                style={{ fontSize: "20px" }}
              />
              <Button variant="contained" onClick={addList}>
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={openUpdate} onClose={handleUpdateClose}>
          <DialogTitle id="alert-dialog-title">
            {"Update todo here"}
          </DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                height: "400px",
                width: "400px",
                justifyContent: "space-around",
              }}
            >
              <InputLabel htmlFor="outlined-basic">Enter title</InputLabel>
              <TextField
                name="title"
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={updateTitle}
                onChange={(e) => setUpdateTitle(e.target.value)}
              />
              <InputLabel htmlFor="text-area">
                Enter your content below
              </InputLabel>
              <TextareaAutosize
                id="text-area"
                name="content"
                minRows={8}
                placeholder="Content here"
                value={updateContent}
                onChange={(e) => setUpdateContent(e.target.value)}
                style={{ fontSize: "20px" }}
              />
              <Button variant="contained" onClick={() => updateItem(todoId)}>
                Update
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
