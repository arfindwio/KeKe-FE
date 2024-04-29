import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Error404 } from "../pages/errors/Error404";

export const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Error */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
