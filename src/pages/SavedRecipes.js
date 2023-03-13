import { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () =>{
    
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userId = useGetUserID();

    useEffect(()=>{
        
        
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/recipes/savedRecipes/' + userId);
                setSavedRecipes(response.data.savedRecipes);
                console.log("Saved recipes:");
               console.log(response.data);
            }
            catch(err) {
                console.error(err);
            }
        };

        fetchSavedRecipes();
    }, []);

    


    return (
        <div>
            <h1>Saved Recipes</h1>
            <ul>{savedRecipes.map((recipe) => {
                    return (<li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                            
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