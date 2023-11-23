Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  get '/health_check', to: 'health_check#index'

  resources :recipes, only: [:index, :show]

  get 'top_categories', to: 'recipes#top_categories'
end
