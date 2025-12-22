import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import AppContent from "./AppBoard";
import Test from "./Test";
import store from "./reduxStore";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/app" element={<AppContent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
