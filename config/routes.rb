Rails.application.routes.draw do
  devise_for :users
  root to: "car_categories#index"

  get "up" => "rails/health#show", as: :rails_health_check

  resources :car_categories, only: %i[index show]
  post 'car_categories/update_dates', to: 'car_categories#update_dates'

  resources :rentals do
    resources :rental_events, only: %i[new create update]
  end
end
