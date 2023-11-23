class RecipesController < ApplicationController
    # GET /recipes?ingredients[]=...&categories[]=...
  def index

    per_page = 15

    query = Recipe.all
    if params[:ingredients].present? || params[:categories].present?
      if params[:ingredients].present?
        ingredient_phrases = params[:ingredients].split(',')
        ingredient_conditions = ingredient_phrases.map { |phrase| 
          "ingredients.name ILIKE ?"
        }
        query = query.joins(:ingredients)
                    .where(ingredient_conditions.join(' OR '), *ingredient_phrases.map { |phrase| "%#{phrase}%" })
      end

      if params[:categories].present?
        categories = params[:categories].split(',')
        category_conditions = categories.map { 
          "category ILIKE ?"
        }
        query = query.where(category_conditions.join(' OR '), *categories.map { |category| "%#{category}%" })
      end
    end
    
    @recipes = query.distinct.page(params[:page]).per(per_page)

    render json: @recipes
  end
  
    # GET /recipes/:id
    def show
      @recipe = Recipe.find(params[:id])
      render json: @recipe, include: :ingredients
    end

    # GET /top_categories?limit=...
    def top_categories
      # Fetch the 'limit' from query parameters or set a default value
      limit = params[:limit] || 10

      # Perform the query to get the top categories
      top_categories = Recipe
                        .select('category')
                        .where.not(category: nil)
                        .group(:category)
                        .order(Arel.sql('COUNT(*) DESC'))
                        .limit(limit)

      # Render the result as JSON
      render json: top_categories
    end
end
