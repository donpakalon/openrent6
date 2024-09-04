class AddCarCategoryToRentals < ActiveRecord::Migration[7.1]
  def change
    add_reference :rentals, :car_category, null: false, foreign_key: true
  end
end
