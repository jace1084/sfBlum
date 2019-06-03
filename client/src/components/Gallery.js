import React, { Component } from './node_modules/react';
import { BrowserRouter as Switch, Route, Link, Redirect } from "./node_modules/react-router-dom";
import './sfBlumen.css';
import ReactTable from "./node_modules/react-table";
import ImageUploader from './node_modules/react-images-upload';
import "./node_modules/react-table/react-table.css"
import './node_modules/bootstrap/dist/css/bootstrap.css';
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
  DropdownItem } from './node_modules/reactstrap';

class Blog extends Component{
    constructor(props) {
        super(props)

        
}
render() {
    return (

        <div className="App">
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
</div>
    )
}
}