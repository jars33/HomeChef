import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetail from './RecipeDetail';
import IngredientFilter from './IngredientFilter';
import RecipeList from './RecipeList';

const RecipeHomePage = ({ }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSubmit = (ingredients, categories) => {
        setSelectedIngredients(ingredients);
        setSelectedCategories(categories); 
    };

    return (
        <div>
            <IngredientFilter onSubmit={handleSubmit} />
            <Routes>
                <Route path="/" element={<RecipeList selectedIngredients={selectedIngredients} selectedCategories={selectedCategories} />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </div>
    );
};

export default RecipeHomePage;
