import { BrowserRouter, Routes, Route } from "react-router-dom";
import Add from "./components/Add";
import Layout from "./components/Layout";
import List from "./components/List";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_JOBS } from "./query/gqlQuery";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const { data, loading, refetch } = useQuery(QUERY_ALL_JOBS);
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if (!loading && jobs.length === 0) {
      setJobs(data.getJobs);
    }
    if (!loading) {
      if (filter.length > 0) {
        filterJobs();
      } else {
        setJobs(data.getJobs);
      }
    }
  }, [loading, filter]);

  const applyFilter = (skillName) => {
    if (filter.some((skill) => skill === skillName)) {
      const removeFilter = filter.map((skill) => skill !== skillName);
      setFilter(removeFilter);
    } else {
      setFilter((prev) => [...prev, skillName]);
    }
  };

  const filterJobs = () => {
    let items = jobs;
    filter.forEach((item) => {
      const filtred = jobs.filter((job) =>
        job.skills.some((skill) => skill.name === item)
      );
      items = filtred;
    });
    setJobs(items);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              loading ? (
                <div>loading</div>
              ) : (
                <List data={jobs} applyFilter={applyFilter} />
              )
            }
          />
          <Route path="add" element={<Add refetch={refetch} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
