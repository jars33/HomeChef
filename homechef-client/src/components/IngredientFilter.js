import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box'; // Import Box from MUI


const IngredientFilter = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setTopCategories] = useState([]);
  const navigate = useNavigate();
  const limit = 10;

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue, selectedCategories);
    navigate(`/`);
  };

  const handleCategoryChange = (event, newCategory) => {
    setSelectedCategories(newCategory);
  };

  const fetchTopCategories = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/top_categories?limit=${limit}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTopCategories(data))
      .catch(error => console.error('Error fetching top categories:', error));


  };

  useEffect(() => {
    fetchTopCategories();
  }, []);

  return (
    <Box style={{ maxWidth: 900, margin: '20px auto' }}> {/* Use Box to wrap both components */}
      <form onSubmit={handleSubmit}>
        <Autocomplete
          multiple
          freeSolo
          id="ingredient-filter"
          options={[]}
          value={inputValue}
          onChange={(event, newValue) => setInputValue(newValue)}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Filter Ingredients"
              placeholder="Type and press enter"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleSubmit}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </form>
      <Box style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
        <ToggleButtonGroup
          value={selectedCategories} // Set the value to the array of selected categories
          onChange={handleCategoryChange} // Update the change handler
          aria-label="text formatting"
        >
          {categories.map((category) => (
            <ToggleButton
              key={category.id || category.category}
              value={category.category}
              aria-label={category.category}
              style={{ margin: '5px', display: 'inline-block' }}
            >
              {category.category}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};

export default IngredientFilter;