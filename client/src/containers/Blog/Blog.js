import React, { Component } from 'react';
import './Blog.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';



class Blog extends Component {
    constructor(props) {
      super(props)

      this.state = {
        isOpen: false
      }
      
      this.toggle = this.toggle.bind(this);
  }
    

   

    toggle() {
      this.setState({
        showIndex: false,
          showBullets: true,
          infinite: true,
          showThumbnails: true,
          showFullscreenButton: true,
          showGalleryFullscreenButton: true,
          showPlayButton: true,
          showGalleryPlayButton: true,
          showNav: true,
          isRTL: false,
          slideDuration: 450,
          slideInterval: 2000,
          slideOnThumbnailOver: false,
          thumbnailPosition: 'bottom',
          showVideo: {},
        isOpen: !this.state.isOpen
      });
    }

      render() {
        return (

          <div className="app">
          <Navbar color="light" light expand="md" className="navBar">
      <NavbarBrand href="/">San Francisco Blumen</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        
        <Nav className="ml-auto" navbar>
          
          <NavItem>
            <span><NavbarBrand href="/gallery">Gallery</NavbarBrand></span>
          </NavItem>
          <NavItem>
          <span><NavbarBrand href="/blog">Blog</NavbarBrand></span>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Account
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                User Sign In
              </DropdownItem>
              <DropdownItem>
                Admin Sign In
              </DropdownItem>
              {/* <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem> */}
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>

    HELLO WORLD!

    </div>

        );
    }
}


export default Blog;