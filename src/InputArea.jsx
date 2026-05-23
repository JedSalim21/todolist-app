import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(e) {
    setInputText(e.target.value);
  }

  return (
    <div className="form">
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Add a task..."
      />

      <button
        className="add-btn"
        onClick={() => {
          props.onAdd(inputText);
          setInputText("");
        }}
      >
        <AddIcon />
      </button>
    </div>
  );
}

export default InputArea;
