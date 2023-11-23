import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

const RecipeList = ({ selectedIngredients, selectedCategories }) => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const loader = useRef(null);
  const navigate = useNavigate();

  const fetchRecipes = (ingredients, categories, page) => {
    const ingredientsQuery = ingredients.length > 0 ? `ingredients=${ingredients.join(',')}` : '';
    const categoriesQuery = categories.length > 0 ? `categories=${categories.join(',')}` : '';
    const queryParams = [ingredientsQuery, categoriesQuery].filter(q => q).join('&');
  
    return fetch(`${process.env.REACT_APP_API_BASE_URL}/recipes?${queryParams}&page=${page}`)
      .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch'));
  };
  

  useEffect(() => {
    setRecipes([]);
    setCurrentPage(1);
  }, [selectedIngredients, selectedCategories]);

  useEffect(() => {
    fetchRecipes(selectedIngredients, selectedCategories, currentPage)
    .then(newRecipes => setRecipes(prevRecipes => [...prevRecipes, ...newRecipes]))
      .catch(error => console.error('Error fetching recipes:', error));
  }, [currentPage]);

  const onSelectRecipe = (recipe) => {
    navigate(`/recipe/${recipe.id}`);
  };

  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setCurrentPage((prev) => prev + 1);
    }
  };



  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "200px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, []);

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <List style={{ width: '100%', maxWidth: 900, backgroundColor: 'white' }}>
        {recipes.map(recipe => (
          <ListItem 
            button 
            key={recipe.id} 
            onClick={() => onSelectRecipe(recipe)} 
            style={{ margin: '10px 0', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
          >
            <ListItemAvatar>
              <Avatar 
                alt={`Image of ${recipe.title}`} 
                src={recipe.image} 
                variant="round"
                style={{ marginRight: '10px', width: '56px', height: '56px' }}
                imgProps={{ loading: "lazy" }}  
              />
            </ListItemAvatar>
            <ListItemText 
              primary={<>{recipe.title} <Rating value={parseFloat(recipe.ratings)} precision={0.01} readOnly size="small" /> </>}
              secondary={
                <>
                  <Typography component="span">
                    Category: {recipe.category} | Author: {recipe.author}
                  </Typography>
                  
                </>
              }
            />
          </ListItem>
        ))}
        <div ref={loader} />
      </List>
    </Box>
  );
};

export default RecipeList;
