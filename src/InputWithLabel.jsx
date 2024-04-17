import { useEffect, useRef } from "react";

/* eslint-disable react/prop-types */
const InputWithLabel = (props) => {
  const { children, handleTitleChange, todoTitle } = props;
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor="todoTitle">{children}</label>
      <input
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
