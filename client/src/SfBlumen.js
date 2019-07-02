import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import './sfBlumen.css';
import ReactTable from "react-table";
import "react-table/react-table.css"
import 'bootstrap/dist/css/bootstrap.css';
import Blog from "./containers/Blog/Blog"
import Gallery from "./containers/Gallery/Gallery"
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


class SfBlumen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        genus: '',
        species: '',
        cultivar: '',
        notes: '',
        orchids: [],
        pictures: [],
        isOpen: false
    }

    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
}

toggle() {
  this.setState({
    isOpen: !this.state.isOpen
  });
}
componentDidMount() {
  let self = this;
  let url = "/orchids"
  fetch(url, {
      method: 'GET'
  }).then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  }).then(orchids => {
      self.setState({orchids: orchids});
      console.log(orchids)
  }).catch(err => {
  console.log('caught it!',err);
  })
}

componentWillMount() {
  let self = this;
  let url = "/orchids"
  fetch(url, {
      method: 'GET'
  }).then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  }).then(pictures => {
      self.setState({pictures: pictures});
      console.log(pictures)
  }).catch(err => {
  console.log('caught it!',err);
  })
}

onSubmit = (e) => {
    e.preventDefault()
    var data = {
      // value: e.target.value
        genus: document.orchidAdd.genus.value,
        species: document.orchidAdd.species.value,
        cultivar: document.orchidAdd.cultivar.value,
        notes: document.orchidAdd.notes.value,
        // pictures: document.orchidAdd.pictures.value
    }

  console.log(data)
  fetch("/orchids", {
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


      // let genus = document.orchidAdd.genus.value
      // let cultivar = document.orchidAdd.cultivar.value
      // let species = document.orchidAdd.species.value
      // let notes = document.orchidAdd.notes.value
      // let pictures = document.orchidAdd.pictures.value

  // console.log(genus, cultivar, species, notes, pictures);

    }

    
    


onChange(e) {
    this.setState({[e.target.name]: e.target.value});  
}

  render() {

    // const data = [{
    //   genus: this.state.genus.value,
    //   species: this.state.species,
    //   cultivar: this.state.cultivar,
    //   notes: this.state.notes
    // }]
    // console.log(data);

    // const img =[{
    //   pictures: this.state.pictures.value
    // }]

    const columns = [
    //   {
    //   Header: 'Image',
    //   accessor: 'img',
    //   filterable: false,
    //   sortable: false,
    //   resizable: true
    // }
    {
      Header: 'Number (ID)',
      accessor: 'id',
      filterable: false
    },{
      Header: 'Genus',
      accessor: 'genus',
      filterable: true
    },{
      Header: 'Species',
      accessor: 'species',
      filterable: true
    },{
      Header: 'Cultivar',
      accessor: 'cultivar',
      filterable: true
  },{
      Header: 'Notes',
      accessor: 'notes',
      filterable: true
  }];
    return (
<Router>
      <Switch>
        <Route exact path ="/blog" component={Blog} />
        <Route exact path ="/gallery" component={Gallery} />

      <div className="App">
        
        {/* <header><h3>San Francisco Blumen</h3></header> */}
    <Navbar color="light" light expand="md" className="navBar">
          <NavbarBrand href="/">San Francisco Blumen</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            
            <Nav className="ml-auto" navbar>
              
              <NavItem>
                <span><NavbarBrand className="homeLinks" href="/gallery">Gallery</NavbarBrand></span>
              </NavItem>
              <NavItem>
              <span><NavbarBrand className="homeLinks" href="/blog">Blog</NavbarBrand></span>
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
        

<div className="addOrchid">
    <form className="orchidAdditon" name="orchidAdd" method="POST" onSubmit={this.onSubmit}>

      {/* <input type="text" name="orchid" placeholder="Add a new Orchid"></input> */}
      <label className="orchidInput-label">
      <input className="orchidInput" type="text"  name="genus" value= {this.state.genus} onChange={this.onChange}  placeholder="Genus" required={true}></input>
      </label>
      <label className="orchidInput-label">
      <input className="orchidInput" type="text" name="species" value= {this.state.species} onChange={this.onChange} placeholder="Species" required={true}></input>  
      </label>
      <label className="orchidInput-label">
      <input className="orchidInput" type="text" name="cultivar" value= {this.state.cultivar} onChange={this.onChange} placeholder="Cultivar" required={true}></input>
      </label>
      <label className="orchidInput-label">
      <input className="orchidInput" type="text" name="notes" value= {this.state.notes} onChange={this.onChange} placeholder="Notes" required={true}></input>
      </label>
      
      {/* <label>Upload Photo:
      <input type="file" name="uploadPhoto" onChange={this.onPhotoUploadHandler}
      />
      </label> */}
      
      <button id="submitButton">Submit</button>

    </form>

    </div>

    

        <ReactTable className="orchidTable"
                    data={this.state.orchids}
                    columns={columns}
                    defaultPageSize = {10}
                    // pageSizeOptions = {[]}
                  >
                  </ReactTable>

      <div className="blog">

      </div>

      {/* <footer>San Francisco Blumen</footer> */}
      </div>
      </Switch>
      </Router>
      
    );
  }
}


export default SfBlumen;
