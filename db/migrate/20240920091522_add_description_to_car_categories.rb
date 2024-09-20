class AddDescriptionToCarCategories < ActiveRecord::Migration[7.1]
  def change
    add_column :car_categories, :description, :text
  end
end
