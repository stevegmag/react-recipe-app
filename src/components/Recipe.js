import React from 'react';

import { Link } from "react-router-dom";

const API_KEY = "4b7320a0a92975c037489cf5dd0cf1ce";

class Recipe extends React.Component {
  state = {
    activeRecipe: [],
    error: []
  }
  componentDidMount = async () => {
    console.log('prop recipe:: ' + this.props.location.state.recipe);
    const recipeID = this.props.location.state.recipe;
    const req = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/get?key=${API_KEY}&rId=${recipeID}`);
    
    
    const res = await req.json();
    console.log('res:: ' + res);
    if(res.error) {
      this.setState({ error:  res.error});
    }
    this.setState({ activeRecipe: res.recipe });
    console.log('state.ActiveRecipe:: ' + this.state.activeRecipe);
  }
  render() {
    if(this.state.error) {
      return (
        <div className="container">
          <span className="error">We're Sorry, but an error has occured:<br/> { this.state.error }</span>
        </div>
      )
    } //if
    else {
      const recipe = this.state.activeRecipe;
      console.log('ind len:: ' + recipe);
      return (
        <div className="container">
          <div className="col-md-8 recipes__box">
            { recipe.length !== 0 &&
              <div className="active-recipe-detail">
                <h1 className="active-recipe__title">{ recipe.title }</h1>
                <img className="active-recipe-detail__img" src={recipe.image_url} alt={recipe.title}/>
                
                <h4 className="active-recipe__publisher">
                  Publisher: <span>{ recipe.publisher }</span>
                </h4>
                <p className="active-recipe__website">Website: 
                  <span><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span>
                </p>
                <button className="active-recipe__button">
                  <Link to="/">Go Home</Link>
                </button>
              </div>
            }
          </div>
          <div className="col-md-4 recipes__box">
            { recipe.ingredients.length > 0 &&
              <ul className="active-recipe__ingredients-list">
                { recipe.ingredients.map((ingredient) => {
                  return (
                    <li key={ ingredient.name } className="active-recipe__ingredient">
                      { ingredient.name }
                    </li>
                  );
                })}
              </ul>
            }
            <p>Recipe and photo copyright: 
              <span><a href={recipe.publisher_url}>{recipe.publisher_url}</a></span>
            </p>
          </div>
        </div>
      );
    } //else
  }
};

export default Recipe;