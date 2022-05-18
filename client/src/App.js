import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Layout from "./components/Layout";
import List from "./components/List";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_JOBS } from "./query/gqlQuery";
function App() {
  const { data, loading } = useQuery(QUERY_ALL_JOBS);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              loading ? <div>loading</div> : <List data={data.getJobs} />
            }
          />
          <Route path="add" element={<Add />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
