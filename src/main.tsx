import ReactDOM from "react-dom/client";
import Routing from "./Routing.tsx";
import { BrowserRouter } from "react-router-dom";

import "./main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);
