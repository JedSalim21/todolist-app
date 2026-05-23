import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

function ToDoItem(props) {
  function handleCheck() {
    props.onChecked(props.id, props.done);
  }

  return (
    <li>
      <div className="todo-left">
        <span className="check-btn" onClick={handleCheck}>
          {props.done ?
            <CheckBoxIcon />
          : <CheckBoxOutlineBlankIcon />}
        </span>

        <p className={props.done ? "completed" : ""}>{props.text}</p>
      </div>
      <div className="todo-actions">
        <button
          className="edit-btn"
          onClick={() => {
            props.onEdit(props.note || props);
          }}
        >
          <ModeEditOutlinedIcon />
        </button>

        <span
          className="delete-btn"
          onClick={() => {
            props.onDelete(props.id);
          }}
        >
          <DeleteIcon />
        </span>
      </div>
    </li>
  );
}

export default ToDoItem;
