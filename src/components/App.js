import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

import "./App.css"
import Recipe from './Recipe';

const App = () => {
    const APP_ID = '7d1dd1d7';
    const APP_KEY = '8be606efdfe1340ab157ba0f84788b6a';

 
   const [recipes, setRecipes] = useState([]);
   const [search,setSearch] = useState("");
   const [query, setQuery] = useState('chicken')


    useEffect(()=>{
        getRecipes(); //runs our async fetch only once per render unless changed by query
    }, [query]); //run it again when aour query changes

    const getRecipes = async () => {
            const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
            const data =  await response.json();
            setRecipes(data.hits);
            console.log(data.hits);
    }

    const updateSearch = e =>{
        setSearch(e.target.value);
        console.log(search);
    }

    const getSearch = e => {
        e.preventDefault(); //prevent page from refreshing
        setQuery(search);
        setSearch('')
    }

    return(
        <div className="container">
        <div className="App" >
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type ="text" value={search} onChange={updateSearch}/>
                    <button  className="search-button" type="submit">
                        Search
                    </button>
            </form>
            {/* maps over recipes in our recipes state in the array*/}
            <div className="recipes">
            {recipes.map(recipe=>(
                <Recipe 
                key={recipe.recipe.label}
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
                />
            ))} 
            </div>
        </div>
        </div>
    )
}
export default App;