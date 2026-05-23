import React, { useState, useEffect } from "react";
import InputArea from "./InputArea";
import ToDoItem from "./ToDoItem";
import Header from "./Header";
import { supabase } from "./supabase/client";
import SecurityUpdateGoodOutlinedIcon from "@mui/icons-material/SecurityUpdateGoodOutlined";

function App() {
  const [items, setItems] = useState([]);
  const [editingText, setEditingText] = useState(null);
  const [editText, setEditText] = useState("");

  async function addItem(inputText) {
    const { data, error } = await supabase.from("items").insert([
      {
        text: inputText,
        done: false,
      },
    ]);

    if (error) {
      console.log(error);
    } else {
      fetchItems();
    }
  }

  async function fetchItems() {
    const { data, error } = await supabase.from("items").select("*");

    if (error) {
      console.log(error);
    } else {
      setItems(data);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function handleEdit(item) {
    setEditingText(item.id);
    setEditText(item.text);
  }

  async function deleteItem(id) {
    const { error } = await supabase.from("items").delete().eq("id", id);

    if (!error) {
      fetchItems();
    } else {
      console.log(error);
    }
  }

  async function toggleDone(id, currentDone) {
    const newValue = !currentDone;

    const { error } = await supabase
      .from("items")
      .update({ done: newValue })
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, done: !item.done } : item,
        ),
      );
    }
  }

  async function handleUpdate(id) {
    const { data, error } = await supabase
      .from("items")
      .update({
        text: editText,
      })
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      setEditingText(null);
      fetchItems();
    }
  }

  return (
    <div className="container">
      <div className="heading">
        <Header />
      </div>

      <InputArea onAdd={addItem} />

      <ul>
        {items.map((item) => {
          if (editingText === item.id) {
            return (
              <div key={item.id} className="note edit-box">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <button onClick={() => handleUpdate(item.id)}>
                  <SecurityUpdateGoodOutlinedIcon />
                </button>
              </div>
            );
          }

          return (
            <ToDoItem
              key={item.id}
              id={item.id}
              text={item.text}
              done={item.done}
              onDelete={deleteItem}
              onChecked={toggleDone}
              onEdit={handleEdit}
              note={item}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
