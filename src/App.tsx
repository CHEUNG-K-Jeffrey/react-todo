import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import TodoContainer from "./components/TodoContainer";
const { VITE_TABLE_NAME } = import.meta.env;
library.add(fas, far, fab);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<TodoContainer tableName={VITE_TABLE_NAME} />}
        />
        <Route
          path="/new"
          element={
            <>
              <h1>New Todo List</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
