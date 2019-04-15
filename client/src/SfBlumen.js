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

onSubmit = (e) => {
    e.preventDefault()
    var data = {
      // value: e.target.value
        genus: document.orchidAdd.genus.value,
        species: document.orchidAdd.species.value,
        cultivar: document.orchidAdd.cultivar.value,
        notes: document.orchidAdd.notes.value,
    }

  // console.log(data)
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


      let genus = document.orchidAdd.genus.value
      let cultivar = document.orchidAdd.cultivar.value
      let species = document.orchidAdd.species.value
      let notes = document.orchidAdd.notes.value

  console.log(genus, cultivar, species, notes);

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

    const data = [{
      pictures: this.state.pictures,
      genus: this.state.genus.value,
      species: this.state.species,
      cultivar: this.state.cultivar,
      notes: this.state.notes
    }]
    console.log(data);

    const columns = [{
      Header: 'Image',
      accessor: 'img',
      filterable: false,
      sortable: false
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
<div className="addOrchid">
    <form className="orchidAdditon" name="orchidAdd" method="POST" onSubmit={this.onSubmit}>

      {/* <input type="text" name="orchid" placeholder="Add a new Orchid"></input> */}
      <label>Genus:
      <input type="text"  name="genus" value= {this.state.genus} onChange={this.onChange}  placeholder="what's the Genus" required="true"></input>
      </label>
      <label>Species:
      <input type="text" name="species" value= {this.state.species} onChange={this.onChange} placeholder="which Species" required="true"></input>  
      </label>
      <label>Cultivar:
      <input type="text" name="cultivar" value= {this.state.cultivar} onChange={this.onChange} placeholder="what's the Cultivar" required="true"></input>
      </label>
      <label>Notes:
      <input type="text" name="notes" value= {this.state.notes} onChange={this.onChange} placeholder="Insert your Notes" required="true"></input>
      </label>
      
      <button>Submit</button>

    </form>

    <ImageUploader 
                name="img"
                value={this.state.pictures}
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
    </div>


    
    {/* <form>
    <input type="text" id="myInput" placeholder="Search for names.."></input>
    </form> */}
 
        <div className="orchidTable">

        <ReactTable 
                    
                    data={this.state.orchids}
                    columns={columns}
                    defaultPageSize = {10}
                    // pageSizeOptions = {[]}
                  >
                  </ReactTable>
      </div> 

      <footer>San Francisco Blumen</footer>
      </div>
    );
  }
}


export default SfBlumen;
