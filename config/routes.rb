Rails.application.routes.draw do
  devise_for :users
  root to: "car_categories#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/*

  resources :car_categories, only: %i[index show]
  resources :rentals

  # Defines the root path route ("/")
  # root "posts#index"
end
