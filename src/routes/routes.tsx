import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import { routerGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/admin",
    element: <App />,
    children: routerGenerator(adminPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routerGenerator(studentPaths),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routerGenerator(facultyPaths),
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "registration",
    element: <Registration />,
  },
]);

export default router;
