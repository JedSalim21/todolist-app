import React, { useState, useEffect } from "react";
import InputArea from "./InputArea";
import ToDoItem from "./ToDoItem";
import Header from "./Header";
import { supabase } from "./supabase/client";

function App() {
  const [items, setItems] = useState([]);

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

    //console.log("UPDATING TO:", newValue);

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

  return (
    <div className="container">
      <div className="heading">
        <Header />
      </div>

      <InputArea onAdd={addItem} />

      <ul>
        {items.map((item) => (
          <ToDoItem
            key={item.id}
            id={item.id}
            text={item.text}
            done={item.done}
            onDelete={deleteItem}
            onChecked={toggleDone}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
