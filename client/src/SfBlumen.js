import React, { Component } from 'react';
import { BrowserRouter as Switch, Route, Link, Redirect } from "react-router-dom";
import './sfBlumen.css';
import ReactTable from "react-table";
import ImageUploader from 'react-images-upload';
import "react-table/react-table.css"


class SfBlumen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        genus: '',
        species: '',
        cultivar: '',
        notes: '',
        orchids: [],
        pictures: []
    }
    this.onDrop = this.onDrop.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
        pictures: document.orchidAdd.pictures.value
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

    onDrop(picture) {
      this.setState({
          pictures: this.state.pictures.concat(picture),
      });
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

    const columns = [{
      Header: 'Image',
      accessor: 'img',
      filterable: false,
      sortable: false,
      resizable: true
    },{
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

      <div className="App">
        <header><h3>San Francisco Blumen</h3>
       {/* <button onclick="sortTable()">Sort</button> */}
    </header>
    <nav className="navBar">

    </nav>
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

    

        <ReactTable className="orchidTable"
                    data={this.state.orchids}
                    columns={columns}
                    defaultPageSize = {10}
                    // pageSizeOptions = {[]}
                  >
                  </ReactTable>

      <div className="blog">

      </div>

      <footer>San Francisco Blumen</footer>
      </div>
    );
  }
}


export default SfBlumen;
