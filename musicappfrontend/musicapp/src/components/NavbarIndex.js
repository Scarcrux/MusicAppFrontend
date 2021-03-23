import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions.js';

const attributes = {
  background: "black",
  zIndex: "5",
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  height: "80px"
}

const NavbarIndex = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  }

  console.log(userInfo);

  return (
    <div>
      <Navbar style={attributes} className="navbar top navbar-expand-md navbar-light bg-faded">
        <NavbarBrand href="/" style={{color: "#e67e22", fontSize: "35px", marginBottom: "10px"}}>Tangerine</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/lists" style={{color: "#F08080"}}>PlayList</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/events" style={{color: "#F08080"}}>Event</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/explore" style={{color: "#F08080"}}>Explore</NavLink>
            </NavItem>
            <NavItem>
              {userInfo ? <NavLink tag={Link} to="/profile" style={{color: "#F08080"}}>Profile</NavLink> : null}
            </NavItem>
          </Nav>
          <Nav>
            <NavItem>
              {userInfo ? <NavLink tag={Link} to="/" onClick={(e)=>{handleLogout(e)}} style={{color: "#F08080"}}>Logout</NavLink> : <NavLink tag={Link} to="/signin" style={{color: "#F08080"}}>Sign In</NavLink>}
            </NavItem>
          </Nav>
          <NavbarText style={{color: "#F08080"}}>
            {userInfo ? (userInfo.username) : ("Guest")}
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarIndex
