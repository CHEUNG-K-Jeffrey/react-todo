import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import TodoContainer from "./components/TodoContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { VITE_TABLE_NAME } = import.meta.env;

library.add(fas, far, fab);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Home Page</h1>
              <p>
                <a href="/Default">Default list</a>
              </p>
            </>
          }
        />
        <Route
          path={`/${VITE_TABLE_NAME}`}
          element={
            <>
              <TodoContainer tableName={VITE_TABLE_NAME} />
              <ToastContainer
                stacked
                position="bottom-left"
                containerId="tasks"
              />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
