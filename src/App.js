import React, { Component } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = "4b7320a0a92975c037489cf5dd0cf1ce" //stevegmag: "Your-api-key";
const RETURN_COUNT = 15;

class App extends Component {
  state = {
    searchStr: [],
    recipes: [],
    count: ''
  }
  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    this.setState({
      searchStr: recipeName
    })
    e.preventDefault();

    console.log(recipeName);
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=${RETURN_COUNT}`);
    
    const data = await api_call.json();
    this.setState({
      recipes: data.recipes,
      count: data.count
     });
    console.log(this.state.recipes);
  }
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <h3>Recipes Found: {this.state.count}</h3>
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;