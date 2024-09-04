class CreateRentals < ActiveRecord::Migration[7.1]
  def change
    create_table :rentals do |t|
      t.references :user, null: false, foreign_key: true
      t.references :car, null: false, foreign_key: true
      t.string :status
      t.date :starts_at
      t.date :ends_at
      t.string :price

      t.timestamps
    end
  end
end
