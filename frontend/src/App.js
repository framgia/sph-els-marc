import DashboardPage from "./dashboard/DashboardPage";
import HttpCodePage from "./http-code/HttpCodePage";
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  /** TODO: To be removed later once the needed pages are implemented. */
  function Child() {
    let { id } = useParams();
    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
  }

  function ChildTwo() {
    let { id, word_id } = useParams();
    return (
      <div>
        <h3>ID: {id}</h3>
        <h3>Word ID: {word_id}</h3>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/profile/:id" element={<Child />} />)
      <Route path="/category/:id" element={<Child />} />
      <Route path="/category/:id/word/:word_id" element={<ChildTwo />} />
      <Route path="*" element={<HttpCodePage />} />
    </Routes>
  );
}

export default App;
