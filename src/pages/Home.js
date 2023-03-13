import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from 'react-cookie';

import axios from "axios";

export const Home = () =>{
    
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userId = useGetUserID();
    const [cookies, __] = useCookies(["access_token"]);


    useEffect(()=>{
        const fetchRecipe = async () => {
            try {
                const response = await axios.get('http://localhost:3001/recipes/');
                setRecipes(response.data);
               console.log(response.data);
            }
            catch(err) {
                console.error(err);
            }
        };
        
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/recipes/savedRecipes/ids/' + userId);
                setSavedRecipes(response.data.savedRecipes);
                console.log("Saved recipes:");
               console.log(response.data);
            }
            catch(err) {
                console.error(err);
            }
        };

        fetchRecipe();

        if(cookies.access_token) fetchSavedRecipes();
    }, []);

    async function saveRecipe(recipeId) {
        try {
            const response = await axios.put('http://localhost:3001/recipes/save', { recipeId, userId }, 
            {
                headers: {
                    authorization: cookies.access_token
                }
            }
            );
            setSavedRecipes(response.data.savedRecipes);
           console.log(response.data);
        }
        catch(err) {
            console.error(err);
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div>
            <h1>Recipes</h1>
            <ul>{recipes && recipes.map((recipe) => {
                    return (<li key={recipe._id}>
                        {isRecipeSaved(recipe._id) && <h1>Already saved</h1>}
                        <div>
                            <h2>{recipe.name}</h2>
                            <button onClick={() => saveRecipe(recipe._id)}
                             disabled={isRecipeSaved(recipe._id)}>
                               {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                             </button>
                        </div>
                        <div className="instructions">
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking time: {recipe.cookingTime} (minutes)</p>
                    </li>)
                })}
            </ul>    
        </div>
    );
};