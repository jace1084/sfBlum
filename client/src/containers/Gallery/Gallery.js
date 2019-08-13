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
// import axios, {post} from "axios"





class Gallery extends Component {
    constructor(props) {
      super(props)

      this.state = {
      isOpen: false,
      images: [],
      files: ""
    }
    
    this.toggle = this.toggle.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
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

onChange(e) {
  this.setState({[e.target.name]: e.target.value}); 
  let files = e.target.files;
  console.log("file", files)
  let reader = new FileReader();
  reader.readAsDataURL(files[0]);

  reader.onload=(e)=>{
    console.log("Img Data", e.target.result)
    
    // const url = "/gallery/images"
    // const formData = {file: e.target.result} 
    
  }
  // console.log("Image uploaded", files); 
  // console.log("Image uploaded", e.target.value)
}

onSubmit = (e) => {
  e.preventDefault()
  var data = {
      images: this.state.images
  }
  console.log("Submit was clicked", data);
fetch("/gallery/images", {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(data)
}).then(function(response) {
  if (response.status >= 400) {
    throw new Error("Bad response from server");
  }
  return response.json();
}).then(function(data) {
  console.log(data);    

}).catch(function(err) {
  console.log(err)
});
}



onDrop(picture) {
  let url = "/gallery/images"
  fetch(url, {
      method: 'GET'
  }).then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  }).then(images => {
  this.setState({
      images: this.state.images.concat(picture)
  });
  console.log("Got here",images)
  }).catch(err => {
  console.log('caught it!',err);
  })
}


// componentDidMount() {
//   let url = "/gallery/images"
//   fetch(url, {
//       method: 'GET'
//   }).then(function(response) {
//       if (response.status >= 400) {
//           throw new Error("Bad response from server");
//       }
//       return response.json();
//   }).then(images => {
//       this.setState({images:this.state.images});
//       console.log(images)
//   }).catch(err => {
//   console.log('caught it!',err);
//   })
// }


 



      render() {
        const pics = this.state.images;
        const pictures = [{
          orginal: this.state.images
        }]

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

        <div className="addImg">
           <form className="imgAdditon" name="imgAdd" type = "file" method="POST" onSubmit={this.onSubmit}>

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
        </div>

        <div className = "imgGallery">
         <img src={pics}></img>
        

        {/* <ImageGallery items={pics}  /> */}

        </div>

        <form className="imgUploader">

       
            
        </form>

            </div>
            
        );
    }
}


export default Gallery;