import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

function Todo() {
  const getLocalStore = () => {
    const Lists = localStorage.getItem("lists");
    return JSON.parse(Lists);
  };

  const [inputName, setName] = useState("");
  const [items, setItems] = useState(getLocalStore([]));
  const [editBtn, setEditBtn] = useState(true);
  const [editId, setEditId] = useState(null);

  const addItems = () => {
    if (!inputName) return;
    const newItmEdit = { id: new Date().getTime().toString(), name: inputName };

    if (inputName && !editBtn) {
      let newList = items.map((val) => {
        if (val.id === editId) {
          return { id: editId, name: newItmEdit.name };
        } else {
          return val;
        }
      });
      setItems(newList);
      setEditId(null);
    } else {
      setItems([...items, newItmEdit]);
    }
    setEditBtn(true);
    setName("");
  };

  const deleteItemAll = () => {
    setItems([]);
    setEditBtn(true);
  };

  const deleteItem = (index) => {
    let updateItems = items.filter((val) => val.id !== index);
    setEditBtn(true);
    setItems(updateItems);
  };

  const handleEdit = (elem, id) => {
    setName(elem);
    setEditBtn(false);
    setEditId(id);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <Box className="w-full min-h-[100vh] bg-slate-900 flex items-center justify-center">
        <div className="min-w-[calc(10rem_+_60vw)] min-h-[80vh] p-10 bg-gradient-to-r from-sky-500 to-indigo-500">
          <div className="rounded-lg w-full min-h-[80vh] bg-[#232a46] text-white pb-14">
            <Typography
              variant="h3"
              className="underline font-bold capitalize text-center pt-10"
            >
              grocery shopping
            </Typography>

            {items.map((elem, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center font-bold items-center gap-3 mt-10"
                >
                  <div className="w-[70%] px-2 py-2  bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md">
                    {elem.name}
                  </div>
                  <RiDeleteBin6Line
                    className="text-3xl"
                    onClick={() => deleteItem(elem.id)}
                  />
                  <FaRegEdit
                    className="text-3xl"
                    onClick={() => handleEdit(elem.name, elem.id)}
                  />
                </div>
              );
            })}

            <Box className="flex justify-center font-bold mt-16">
              <TextField
                variant="outlined"
                placeholder="Add something to your list"
                value={inputName}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                sx={{
                  border: "2px solid #8b5cf6",
                  borderRight: "none",
                  borderRadius: "5px 0 0 5px",
                  padding: "0px 20px",
                  "& .MuiOutlinedInput-root": {
                    "& input": {
                      color: "#ffffff",
                    },
                    "& fieldset": {
                      border: "none", // Removes the default outline
                      color: "white",
                    },
                    "&:hover fieldset": {
                      border: "none", // Custom border color on hover
                    },
                    "&.Mui-focused fieldset": {
                      border: "none", // Custom border color when focused
                    },
                  },
                }}
              />
              {editBtn ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to left ,#d946ef ,#8b5cf6)",
                    borderRadius: "0 5px 5px 0",
                  }}
                  onClick={addItems}
                >
                  Add
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    backgroundImage:
                      "linear-gradient(to left ,#d946ef ,#8b5cf6)",
                    borderRadius: "0 5px 5px 0",
                  }}
                  onClick={addItems}
                >
                  <FaRegEdit className="text-3xl" />
                </Button>
              )}
            </Box>
            <div className="text-center mt-10">
              <Button
                variant="contained"
                sx={{
                  color: "black",
                  fontWeight: "bold",
                  bgcolor: "white",
                }}
                onClick={deleteItemAll}
              >
                Delete List
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}

export default Todo;
