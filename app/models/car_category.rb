class CarCategory < ApplicationRecord
  has_many :cars
  has_many :rentals
  has_many :daily_rates
end
