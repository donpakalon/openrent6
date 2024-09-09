class CreateRentalEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :rental_events do |t|
      t.references :rental, null: false, foreign_key: true
      t.string :event_type
      t.string :status
      t.text :data

      t.timestamps
    end
  end
end
