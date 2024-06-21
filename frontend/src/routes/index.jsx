import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout";
import Home from "../pages/Home";


export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
      </Route>
    </Routes>
  );
};