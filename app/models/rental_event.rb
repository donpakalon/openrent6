class RentalEvent < ApplicationRecord
  belongs_to :rental
  has_many_attached :photos
end
