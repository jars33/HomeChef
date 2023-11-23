import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const RecipeDetail = ({ }) => {

    const { id } = useParams();
    const [recipe, setRecipeDetail] = useState({});

    const fetchRecipe = (id) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/recipes/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setRecipeDetail(data))
            .catch(error => console.error('Error fetching recipe:', error));
    };

    useEffect(() => {
        if (id) {
            fetchRecipe(id);
        }
    }, [id]);

    return (
        <Card style={{ maxWidth: 900, margin: '20px auto' }}>
            <CardMedia
                component="img"
                height="140"
                image={recipe.image}
                alt={recipe.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {recipe.category}<br />
                    Author: {recipe.author}<br />
                    Cook Time: {recipe.cook_time} minutes<br />
                    Prep Time: {recipe.prep_time} minutes<br />
                    Ratings: {recipe.ratings}/5<br />
                </Typography>
                <Typography variant="h6" style={{ marginTop: '10px' }}>
                    Ingredients
                </Typography>
                <List>
                    {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                        <ListItem key={index}>
                            {ingredient.name}
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )
};

export default RecipeDetail;
