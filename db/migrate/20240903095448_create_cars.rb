class CreateCars < ActiveRecord::Migration[7.1]
  def change
    create_table :cars do |t|
      t.references :car_category, null: false, foreign_key: true
      t.string :licence_plate
      t.string :brand
      t.string :model

      t.timestamps
    end
  end
end
