import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Layout from "./components/Layout";
import List from "./components/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<List />} />
          <Route element={<Add />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
