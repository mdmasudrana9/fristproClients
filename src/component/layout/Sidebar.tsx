import { Layout, Menu } from "antd";
import { siderBarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";

import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;

const UserRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};
const Sidebar = () => {
  const user = useAppSelector(selectUser);

  const role = user!.role; // This should be dynamically set based on the logged-in user role
  let sidebarItems;
  switch (role) {
    case UserRole.ADMIN:
      sidebarItems = siderBarItemGenerator(adminPaths, UserRole.ADMIN);
      break;
    case UserRole.FACULTY:
      sidebarItems = siderBarItemGenerator(facultyPaths, UserRole.FACULTY);
      break;
    case UserRole.STUDENT:
      sidebarItems = siderBarItemGenerator(studentPaths, UserRole.STUDENT);
      break;
    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div>
        <h1
          style={{
            color: "white",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            height: "60px",
          }}
        >
          Logo
        </h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
