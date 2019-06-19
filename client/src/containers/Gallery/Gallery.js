import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import './Gallery.css';
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
import ImageGallery from 'react-image-gallery';





class Gallery extends Component {
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
      // showFullscreenButton: true,
      // showGalleryFullscreenButton: true,
      // showPlayButton: true,
      // showGalleryPlayButton: true,
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

        const images = [
          {
            original: 'http://lorempixel.com/1000/600/nature/1/',
            thumbnail: 'http://lorempixel.com/250/150/nature/1/',
          },
          {
            original: 'http://lorempixel.com/1000/600/nature/2/',
            thumbnail: 'http://lorempixel.com/250/150/nature/2/'
          },
          {
            original: 'http://lorempixel.com/1000/600/nature/3/',
            thumbnail: 'http://lorempixel.com/250/150/nature/3/'
          }
        ]
        return (
          
            <div className="app">
              <Navbar color="light" light expand="md" className="navBar">
          <NavbarBrand href="/">San Francisco Blumen</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            
            <Nav className="ml-auto" navbar>
              
              <NavItem>
                <span><Link to="/gallery">Gallery</Link></span>
              </NavItem>
              <NavItem>
              <span><Link to="/blog">Blog</Link></span>
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

          <div className="imgGallery">

              <ImageGallery items={images} />
              
            </div>

            </div>
            
        );
    }
}


export default Gallery;