import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
return (
<ProSidebar>
  <Menu iconShape="square">
    <MenuItem>Dashboard</MenuItem>
    <SubMenu title="Components">
      <MenuItem>Component 1</MenuItem>
      <MenuItem>Component 2</MenuItem>
    </SubMenu>
    <MenuItem>
    Create New List
    <Link to="/createlist"/>
    </MenuItem>
  </Menu>
</ProSidebar>
)
}
export default Sidebar;