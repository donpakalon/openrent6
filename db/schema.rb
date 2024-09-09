# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_09_09_092808) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "car_categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cars", force: :cascade do |t|
    t.bigint "car_category_id", null: false
    t.string "licence_plate"
    t.string "brand"
    t.string "model"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_category_id"], name: "index_cars_on_car_category_id"
  end

  create_table "daily_rates", force: :cascade do |t|
    t.bigint "car_category_id", null: false
    t.integer "price_per_day"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_category_id"], name: "index_daily_rates_on_car_category_id"
  end

  create_table "rental_events", force: :cascade do |t|
    t.bigint "rental_id", null: false
    t.string "event_type"
    t.string "status"
    t.text "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["rental_id"], name: "index_rental_events_on_rental_id"
  end

  create_table "rentals", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "car_id", null: false
    t.string "status"
    t.date "starts_at"
    t.date "ends_at"
    t.string "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "car_category_id", null: false
    t.index ["car_category_id"], name: "index_rentals_on_car_category_id"
    t.index ["car_id"], name: "index_rentals_on_car_id"
    t.index ["user_id"], name: "index_rentals_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "cars", "car_categories"
  add_foreign_key "daily_rates", "car_categories"
  add_foreign_key "rental_events", "rentals"
  add_foreign_key "rentals", "car_categories"
  add_foreign_key "rentals", "cars"
  add_foreign_key "rentals", "users"
end
