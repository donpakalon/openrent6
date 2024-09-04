class Car < ApplicationRecord
  belongs_to :car_category
  has_many :rentals
  has_many :daily_rates, through: :car_category
end
