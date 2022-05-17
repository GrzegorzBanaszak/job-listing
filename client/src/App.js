import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Layout from "./components/Layout";
import List from "./components/List";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_JOBS } from "./query/gqlQuery";
function App() {
  const { data, loading, refetch } = useQuery(QUERY_ALL_JOBS);

  console.log(data);
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
          <Route element={<Add />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
