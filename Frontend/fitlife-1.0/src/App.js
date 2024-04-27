import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "./Views/HomeView";
import Community from "./Views/Community";
import "antd/dist/reset.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
