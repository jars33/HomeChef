# 🧑‍🍳 HomeChef

https://homechef-client.fly.dev/

## 🌐 Overview

HomeChef is a simple, yet effective web application designed to help users discover recipes based on the ingredients they have at home. This prototype serves as a starting point for discussing current implementation details and potential improvements.

## 🤔 Problem Statement

It's dinner time, but what to cook? HomeChef tackles this common dilemma by enabling users to input the ingredients they have on hand and receive relevant recipe suggestions. This tool aims to simplify meal planning and reduce food waste.

## 🎯 Objectives

The primary objective is to provide a user-friendly application prototype that:

- Is simple and usable, focusing on the core functionality.
- Helps users find the most relevant recipes based on their available ingredients.
- Serves as a foundation for further development and feature enhancement.

## 💻 Technical Specifications

- **Database:** PostgreSQL, for storing and managing recipe data.
- **Backend:** Ruby on Rails, handling API requests and serving recipe data.
- **Frontend:** React, offering a straightforward and responsive user interface.
- **Hosting:** Dockerized application, deployed on fly.io for easy access and scalability.

## 👥 User Stories

1. **Find Recipes by Ingredients:**
   Users can enter a list of ingredients they have, and the application will display a list of recipes that can be prepared with these ingredients.

2. **View Recipe Details:**
   Users can select a recipe from the list to view detailed information, including ingredients, preparation steps, and cooking time.

3. **Explore Recipes:**
   Upon visiting the application, users are presented with a variety of recipes to browse, inspiring their meal choices by browsing categories they like to eat.

## 🧑‍💻 Codebase and Repository

The codebase is structured as follows:

- **Backend (`/homechef-api`):** Ruby on Rails application with RESTful API endpoints.
- **Frontend (`/homechef-client`):** React application with components for ingredient input, recipe listing, and recipe details.
- **Database:** PostgreSQL database.

The entire codebase is available in the current GitHub repository.

## 📊 Database Structure

The HomeChef app uses a PostgreSQL database with the following structure:

### Tables

1. **Ingredients**
   - `name`: String - The name of the ingredient.
   - `created_at`: DateTime - Timestamp for when the ingredient was created.
   - `updated_at`: DateTime - Timestamp for when the ingredient was last updated.

2. **Recipes**
   - `title`: String - The title of the recipe.
   - `cook_time`: Integer - The cooking time in minutes.
   - `prep_time`: Integer - The preparation time in minutes.
   - `ratings`: Float - The rating of the recipe.
   - `cuisine`: String - The type of cuisine of the recipe.
   - `category`: String - The category of the recipe.
   - `author`: String - The author of the recipe.
   - `image`: String - URL/path to the image of the recipe.
   - `created_at`: DateTime - Timestamp for when the recipe was created.
   - `updated_at`: DateTime - Timestamp for when the recipe was last updated.

3. **RecipeIngredients** (Join Table)
   - `recipe_id`: BigInt - Foreign key to the `recipes` table.
   - `ingredient_id`: BigInt - Foreign key to the `ingredients` table.
   - `created_at`: DateTime - Timestamp for when the recipe ingredient relation was created.
   - `updated_at`: DateTime - Timestamp for when the recipe ingredient relation was last updated.

### Relationships

- Each `Recipe` can have multiple `Ingredients` through the `RecipeIngredients` join table.
- Each `Ingredient` can be part of multiple `Recipes` through the `RecipeIngredients` join table.

### Schema Management

This schema is managed by Active Record's migrations in Ruby on Rails. It's recommended to use migrations for any modifications to the database and to regenerate the schema definition accordingly. The schema is defined in ActiveRecord version 7.1 and includes the necessary extensions for PostgreSQL (`plpgsql`).

## 🚀 Running the Application

The application is deployed on fly.io and can be accessed [here](https://homechef-client.fly.dev/).

## 🏠 Running the Application Locally

The application is containerized for easy setup and deployment using Docker. Follow these steps to run HomeChef Recipe Finder locally:

1. **Clone the Repository:**
   Begin by cloning the GitHub repository to your local machine.
   ```
   git clone [repository URL]
   ```

2. **Navigate to the Project Directory:**
   Change to the project's root directory in your terminal.
   ```
   cd homechef
   ```

3. **Docker Setup:**
   Ensure you have Docker installed on your machine. If not, download and install Docker from [Docker's official website](https://www.docker.com/get-started).

4. **Build and Run the Application:**
   Use Docker Compose to build and run the application. This will set up both the frontend and backend
   ```
   docker-compose up --build
   ```
5. **Database Creation, Migration and Seeding (First-Time Setup):**
If it's your first time running the application, you'll need to create, migrate, and seed the database. Execute the following commands in a separate terminal:
- To create the database:
  ```
  docker-compose exec homechef-api bin/rails db:create
  ```
  - To migrate the database:
  ```
  docker-compose exec homechef-api bin/rails db:migrate
  ```
- To seed the database:
  ```
  docker-compose exec homechef-api bin/rails db:seed
  ```

6. **Accessing the Application:**
   Once the Docker containers are up and running, access the application by navigating to `http://localhost:3001` in your web browser.

7. **Shutting Down:**
   To stop and remove the containers when you are done, use:
   ```
   docker-compose down
   ```

## 🌟 Future Enhancements

- **Ingredient Autocomplete:** Implement an autocomplete feature for the ingredient input field.
- **Searching Algorithm:** Improve the search algorithm to get more accurate results. As an example, a person who enters 'meat' in the ingredients filter, should not get a result with a 'meatless' ingredient.
- **User Accounts:** Allow users to create accounts, save favorite recipes, provide recipe ratings, and add recipes of their own.
- **User Profiles:** Allow users to search and see profiles of other users, along with their saved and created recipes.
- **Comment recipes:** Develop a comment section on each recipe, so users can share tips and tricks on the recipe.
- **Database Schema:** Add Categories table, Units table, and move quantities to RecipeIngredients instead of Ingredients. As such, Ingredients table would only have the various distinct ingredients possible.
- **Technical improvements:** As the code becomes more complex, improve the overall architecture. For example, add tests on both sides, add a controller layer on the client, add a service layer on the API.
- **Data Cleaning:** Clean the data and populate the cuisine column.
- **Advanced Filtering:** Add options to filter recipes by cuisine, dietary restrictions, and total time of cooking.
- **Sorting:** Allow sorting by rating, total time of cooking, alphabetically, or by the recommended order.
- **Improve UI:** Make UI more user-friendly and not so bland.

  
## 🤖 AI Enhancements
Integrating a Large Language Model (LLM) like GPT into HomeChef can open up a range of innovative possibilities that could significantly enhance user experience
- **Enhance Recipe Suggestions and Customization:** Leverage RAG to generate recipes that are not only unique but also grounded in culinary knowledge and user preferences. Use knowledge graphs to provide context-sensitive recipe suggestions, considering factors like seasonality, dietary restrictions, and user ratings.

- **Natural Language Processing for User Queries:** Implement advanced natural language processing capabilities to better understand and respond to user queries. Enable users to ask complex questions about recipes, ingredients, or cooking techniques and receive detailed, context-aware responses.

- **Dynamic User Interaction:** Develop a more interactive and engaging user interface, where users can have a conversational experience with the application, receiving tailored advice and suggestions. Use the LLMs for chatbot features, offering real-time cooking guidance and support.

- **Personalized Content Creation:** Generate personalized content such as cooking tips, blog posts, or newsletters based on user preferences and interactions. Utilize user data to create highly targeted and relevant content, enhancing user engagement.

- **Community Interaction and Engagement:** Facilitate a richer community platform where users can share their own recipes and cooking experiences. Use LLMs to analyze and suggest improvements to user-submitted recipes, fostering a collaborative and educational environment.

- **Educational and Interactive Features:** Implement educational modules that use GenAI to teach cooking techniques, recipe development, and nutritional information. Create interactive challenges or quizzes to make learning about cooking and nutrition more engaging.
