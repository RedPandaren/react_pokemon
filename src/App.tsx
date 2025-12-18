import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContent from "./AppBoard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/root" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
