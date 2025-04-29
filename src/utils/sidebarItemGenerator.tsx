import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";

export const siderBarItemGenerator = (items: TUserPath[], role) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.path,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => ({
          key: child.path || "",
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })), // Closing parenthesis added here
      });
    }
    return acc;
  }, []);

  return sidebarItems;
};
