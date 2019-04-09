import React, { Component } from 'react';
import { BrowserRouter as Switch, Route, Link, Redirect } from "react-router-dom";
import './sfBlumen.css';

class SfBlumen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        genus: '',
        species: '',
        cultivar: '',
        notes: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    


onChange(e) {
    this.setState({[e.target.name]: e.target.value});  
}

  render() {
    return (

      <div className="App">
        <header><h3>San Francisco Blumen</h3>
       {/* <button onclick="sortTable()">Sort</button> */}
    </header>

    <form className="orchidAdditon" name="orchidAdd" method="POST" onSubmit={this.onSubmit}>

      {/* <input type="text" name="orchid" placeholder="Add a new Orchid"></input> */}
      <label>Genus:
      <input type="text"  name="genus" value= {this.state.genus} onChange={this.onChange}  placeholder="what's the Genus"></input>
      </label>
      <label>Species:
      <input type="text" name="species" value= {this.state.species} onChange={this.onChange} placeholder="which Species"></input>  
      </label>
      <label>Cultivar:
      <input type="text" name="cultivar" value= {this.state.cultivar} onChange={this.onChange} placeholder="what's the Cultivar"></input>
      </label>
      <label>Notes:
      <input type="text" name="notes" value= {this.state.notes} onChange={this.onChange} placeholder="Insert your Notes"></input>
      </label>
      
      <button>Submit</button>

    </form>
    
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>

        <footer>San Francisco Blumen</footer>
      </div>
      
  

    );
  }
}

export default SfBlumen;
