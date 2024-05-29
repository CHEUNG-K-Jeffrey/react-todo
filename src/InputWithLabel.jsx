import { useEffect, useRef } from "react";
import style from "./InputWithLabel.module.css";

/* eslint-disable react/prop-types */
const InputWithLabel = (props) => {
  const { children, handleTitleChange, todoTitle } = props;
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label className={style.Label} htmlFor="todoTitle">
        {children}
      </label>
      <input
        className={style.Input}
        ref={inputRef}
        onChange={handleTitleChange}
        name="title"
        id="todoTitle"
        type="text"
        value={todoTitle}
        required
      />
    </>
  );
};
export default InputWithLabel;
