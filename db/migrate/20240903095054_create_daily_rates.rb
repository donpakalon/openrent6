class CreateDailyRates < ActiveRecord::Migration[7.1]
  def change
    create_table :daily_rates do |t|
      t.references :car_category, null: false, foreign_key: true
      t.integer :price_per_day

      t.timestamps
    end
  end
end
