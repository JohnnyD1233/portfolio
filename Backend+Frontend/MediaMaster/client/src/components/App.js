import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Main from "./main";
import AddItem from "./add"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add" element={<AddItem />} />
      </Routes>
    </Router>
  );
};

export default App;
