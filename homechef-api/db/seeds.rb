# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


require 'json'

# Define a helper function to seed ingredients
def seed_ingredients(recipe, ingredient_names)
  ingredient_names.each do |ingredient_name|
    ingredient = Ingredient.find_or_create_by(name: ingredient_name)
    RecipeIngredient.create(recipe: recipe, ingredient: ingredient)
  end
end

# Load and parse JSON data
file_path = File.join(Rails.root, 'db', 'recipes-en.json') # Update with actual path
recipes_json = File.read(file_path)
recipes_data = JSON.parse(recipes_json)

# Iterate over the JSON data to create recipes and ingredients
recipes_data.each do |recipe_data|
  recipe = Recipe.create(
    title: recipe_data['title'],
    cook_time: recipe_data['cook_time'],
    prep_time: recipe_data['prep_time'],
    ratings: recipe_data['ratings'],
    cuisine: recipe_data['cuisine'],
    category: recipe_data['category'],
    author: recipe_data['author'],
    image: recipe_data['image']
  )

  # Seed ingredients for the recipe
  seed_ingredients(recipe, recipe_data['ingredients'])
end