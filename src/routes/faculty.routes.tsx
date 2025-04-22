import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferCourse from "../pages/faculty/OfferCourse";

export const facultyPaths = [
  {
    name: "DashBoard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferCourse />,
  },
];
