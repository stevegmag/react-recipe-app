import React from 'react';

import { Link } from "react-router-dom";

const Recipes = props => (
  <div className="container">
    <div className="row">
    { props.recipes.map((recipe) => {
      return (
        <div key={recipe.recipe_id} className="col-md-4" style={{ marginBottom:"2rem" }}>
          <div className="recipes__box">
            <img 
              className="recipe__box-img" 
              src={recipe.image_url} 
              alt={recipe.title}/>
              <div className="recipe__text">
                <h5 className="recipes__title">
                {recipe.recipe_id}: 
                  { recipe.title.length < 20 ? `${recipe.title}` : `${recipe.title.substring(0, 25)}...` }
                </h5>
                <p className="recipes__subtitle">Publisher: <span>
                  { recipe.publisher }
                </span></p>
                <p className="recipes__rank">Rank: <span>
                  { Math.floor(recipe.social_rank) }
                </span></p>
              </div>
                <Link 
                  to={{ 
                    pathname: `/recipe/${recipe.recipe_id}`,
                    state: {recipe: recipe.recipe_id}
                    // state: { recipe: recipe.title }
                  }} 
                  >
                   <button className="recipe_buttons">View Recipe</button>  
                  </Link>
                  
                  <Link 
                  to={{ 
                    //pathname: `/recipe/${recipe.recipe_id}`,
                    pathname: `${recipe.source_url}`,
                    state: {recipe: recipe.recipe_id}
                  }} 
                  target="_blank"
                  >
                   <button className="recipe_buttons">Recipe Source</button>  
                  </Link>
          </div>
        </div>
      );
    })}
    </div>
  </div>
);

export default Recipes;