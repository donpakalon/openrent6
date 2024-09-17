Rails.application.routes.draw do
  devise_for :users
  root to: "car_categories#index"

  get "up" => "rails/health#show", as: :rails_health_check

  resources :car_categories, only: %i[index show]
  resources :rentals do
    resources :rental_events, only: %i[create update]
  end
  resources :photos, only: %i[index show new create]
end
