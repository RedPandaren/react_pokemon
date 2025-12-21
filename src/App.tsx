import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContent from "./AppBoard";
import Test from "./Test";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/app" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
