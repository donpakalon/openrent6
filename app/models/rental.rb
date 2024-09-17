class Rental < ApplicationRecord
  belongs_to :user
  belongs_to :car
  belongs_to :car_category
  has_many :rental_events
end
