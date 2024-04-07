import { Route, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import Home from "../components/pages/home";
import Quiz from "../components/pages/quiz";
import Login from "../components/pages/login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);
