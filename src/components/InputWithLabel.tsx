import { useEffect, useRef } from "react";
import style from "./InputWithLabel.module.css";
import { InputWithLabelProps } from "../types";

/* eslint-disable react/prop-types */
const InputWithLabel = (props: InputWithLabelProps) => {
  const { children, handleTitleChange, todoTitle } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  });
  return (
    <>
      <label className={style.label} htmlFor="todoTitle">
        {children}
      </label>
      <input
        className={style.input}
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
