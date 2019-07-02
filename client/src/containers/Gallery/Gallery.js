import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";
import './Gallery.css';
import ImageUploader from 'react-images-upload';
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
      isOpen: false,
      pictures: []
    }
    
    this.toggle = this.toggle.bind(this);
    this.onDrop = this.onDrop.bind(this);
}

onSubmit = (e) => {
  e.preventDefault()
  let pictures = this.state.pictures;
  console.log("Submit was clicked");
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



onDrop(picture) {
  this.setState({
      pictures: this.state.pictures.concat(picture),
  });
}
 



      render() {

        const images = [
          {
            original: this.pictures,
            thumbnail: this.pictures,
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

        <form className="imgUploader">

        <ImageUploader className="fileUploader"
                withPreview={true}
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                fileSizeError="File size too large"
                fileTypeError="this file Type is not supported"
            />
             <button id="submitButton">Submit</button>
        </form>

          <div className="imgGallery">

              <ImageGallery items={images} onSubmit={this.onSubmit} />
            
              
            </div>

            </div>
            
        );
    }
}


export default Gallery;