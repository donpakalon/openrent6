# db/seeds.rb

# Create Car Categories
RentalEvent.destroy_all
Rental.destroy_all
User.destroy_all
Car.destroy_all
DailyRate.destroy_all
CarCategory.destroy_all

car_categories = [
  { name: 'Micro-citadine', description: 'Gamme de citadines' },
  { name: 'Sportive', description: 'Véhicules de prestige' },
  { name: 'SUV familial', description: 'Le confort tout terrain' },
  { name: 'Cabriolet', description: 'Pour une sortie plein air' },
  { name: 'Electrique', description: 'Road-Trip Ecoresponsable' }
]

car_category_objects = car_categories.map { |category| CarCategory.create!(category) }

# Create Daily Rates
daily_rates = [
  { price_per_day: 29, car_category: car_category_objects[0] }, # Micro Citadine
  { price_per_day: 97, car_category: car_category_objects[1] }, # Sportive
  { price_per_day: 56, car_category: car_category_objects[2] }, # SUV
  { price_per_day: 77, car_category: car_category_objects[3] }, # Cabriolet
  { price_per_day: 44, car_category: car_category_objects[4] }  # Electrique
]

daily_rates.map { |rate| DailyRate.create!(rate) }

# Create Cars
cars = [
  { licence_plate: 'ABC123', brand: 'Fiat', model: '500', car_category: car_category_objects[0] },
  { licence_plate: 'XYZ789', brand: 'Fiat', model: '500', car_category: car_category_objects[0] },
  { licence_plate: 'LMN456', brand: 'Fiat', model: '500', car_category: car_category_objects[0] },
  { licence_plate: 'QRS234', brand: 'Fiat', model: '500', car_category: car_category_objects[0] },
  { licence_plate: 'UVW567', brand: 'Fiat', model: '500', car_category: car_category_objects[0] },
  { licence_plate: 'DEF890', brand: 'Fiat', model: '500', car_category: car_category_objects[0] },
  { licence_plate: 'GHI012', brand: 'Fiat', model: '500', car_category: car_category_objects[0] },
  { licence_plate: 'JKL345', brand: 'Porsche', model: '718 Boxter', car_category: car_category_objects[1] },
  { licence_plate: 'MNO678', brand: 'Porsche', model: '718 Boxter', car_category: car_category_objects[1] },
  { licence_plate: 'PQR901', brand: 'Porsche', model: '718 Boxter', car_category: car_category_objects[1] },
  { licence_plate: 'STU234', brand: 'Porsche', model: '718 Boxter', car_category: car_category_objects[1] },
  { licence_plate: 'VWX567', brand: 'BMW', model: 'X5', car_category: car_category_objects[2] },
  { licence_plate: 'YZA890', brand: 'Porsche', model: '718 Boxter', car_category: car_category_objects[1] },
  { licence_plate: 'BCD123', brand: 'BMW', model: 'X5', car_category: car_category_objects[2] },
  { licence_plate: 'EFG456', brand: 'Porsche', model: '718 Boxter', car_category: car_category_objects[1] },
  { licence_plate: 'HIJ789', brand: 'Fiat', model: '500', car_category: car_category_objects[0] },
  { licence_plate: 'KLM012', brand: 'BMW', model: 'X5', car_category: car_category_objects[2] },
  { licence_plate: 'NOP345', brand: 'BMW', model: 'Série 4 Cabriolet', car_category: car_category_objects[3] },
  { licence_plate: 'QRS678', brand: 'BMW', model: 'X5', car_category: car_category_objects[2] },
  { licence_plate: 'TUV901', brand: 'Citroen', model: 'E-C4', car_category: car_category_objects[4] }
]

car_objects = cars.map { |car| Car.create!(car) }

# Create Users
users = [
  { email: 'john.doe@example.com', password: '123456', confirmed_at: Time.now },
  { email: 'jane.doe@example.com', password: '123456', confirmed_at: Time.now },
  { email: 'alice.smith@example.com', password: '123456', confirmed_at: Time.now },
  { email: 'bob.jones@example.com', password: '123456', confirmed_at: Time.now },
  { email: 'charlie.brown@example.com', password: '123456', confirmed_at: Time.now }
]

user_objects = users.map { |user| User.create!(user) }

# Create Rentals
rentals = [
  # No cars available on August 5th
  { user: user_objects[0], car: car_objects[0], car_category: car_objects[0].car_category, status: 'completed', starts_at: Date.new(2024, 8, 1), ends_at: Date.new(2024, 8, 5), price: '100' },
  { user: user_objects[2], car: car_objects[1], car_category: car_objects[1].car_category, status: 'completed', starts_at: Date.new(2024, 8, 1), ends_at: Date.new(2024, 8, 5), price: '300' },
  { user: user_objects[2], car: car_objects[2], car_category: car_objects[2].car_category, status: 'ongoing', starts_at: Date.new(2024, 8, 1), ends_at: Date.new(2024, 8, 5), price: '120' },
  { user: user_objects[3], car: car_objects[3], car_category: car_objects[3].car_category, status: 'completed', starts_at: Date.new(2024, 8, 1), ends_at: Date.new(2024, 8, 5), price: '500' },
  { user: user_objects[4], car: car_objects[4], car_category: car_objects[4].car_category, status: 'completed', starts_at: Date.new(2024, 8, 1), ends_at: Date.new(2024, 8, 5), price: '200' },

  # Only cars from one category available on August 6th
  { user: user_objects[0], car: car_objects[5], car_category: car_objects[5].car_category, status: 'completed', starts_at: Date.new(2024, 8, 6), ends_at: Date.new(2024, 8, 10), price: '400' },

  # Only cars from two categories available on August 11th
  { user: user_objects[1], car: car_objects[6], car_category: car_objects[6].car_category, status: 'completed', starts_at: Date.new(2024, 8, 11), ends_at: Date.new(2024, 8, 15), price: '350' },
  { user: user_objects[2], car: car_objects[7], car_category: car_objects[7].car_category, status: 'ongoing', starts_at: Date.new(2024, 8, 11), ends_at: Date.new(2024, 8, 15), price: '600' },

  # Only cars from three categories available on August 16th
  { user: user_objects[3], car: car_objects[8], car_category: car_objects[8].car_category, status: 'completed', starts_at: Date.new(2024, 8, 16), ends_at: Date.new(2024, 8, 20), price: '150' },
  { user: user_objects[2], car: car_objects[9], car_category: car_objects[9].car_category, status: 'completed', starts_at: Date.new(2024, 8, 16), ends_at: Date.new(2024, 8, 20), price: '500' },

  # Only cars from four categories available on August 21st
  { user: user_objects[0], car: car_objects[10], car_category: car_objects[10].car_category, status: 'completed', starts_at: Date.new(2024, 8, 21), ends_at: Date.new(2024, 8, 25), price: '320' },
  { user: user_objects[1], car: car_objects[11], car_category: car_objects[11].car_category, status: 'ongoing', starts_at: Date.new(2024, 8, 21), ends_at: Date.new(2024, 8, 25), price: '410' },
  { user: user_objects[2], car: car_objects[12], car_category: car_objects[12].car_category, status: 'completed', starts_at: Date.new(2024, 8, 21), ends_at: Date.new(2024, 8, 25), price: '580' },
  { user: user_objects[3], car: car_objects[13], car_category: car_objects[13].car_category, status: 'completed', starts_at: Date.new(2024, 8, 21), ends_at: Date.new(2024, 8, 25), price: '610' },

  # All categories available on August 26th
  { user: user_objects[4], car: car_objects[14], car_category: car_objects[14].car_category, status: 'completed', starts_at: Date.new(2024, 8, 26), ends_at: Date.new(2024, 8, 30), price: '420' },
  { user: user_objects[0], car: car_objects[15], car_category: car_objects[15].car_category, status: 'completed', starts_at: Date.new(2024, 8, 26), ends_at: Date.new(2024, 8, 30), price: '450' },
  { user: user_objects[1], car: car_objects[16], car_category: car_objects[16].car_category, status: 'completed', starts_at: Date.new(2024, 8, 26), ends_at: Date.new(2024, 8, 30), price: '550' },
  { user: user_objects[2], car: car_objects[17], car_category: car_objects[17].car_category, status: 'completed', starts_at: Date.new(2024, 8, 26), ends_at: Date.new(2024, 8, 30), price: '680' },
  { user: user_objects[3], car: car_objects[18], car_category: car_objects[18].car_category, status: 'completed', starts_at: Date.new(2024, 8, 26), ends_at: Date.new(2024, 8, 30), price: '720' },
  { user: user_objects[4], car: car_objects[19], car_category: car_objects[19].car_category, status: 'completed', starts_at: Date.new(2024, 8, 26), ends_at: Date.new(2024, 8, 30), price: '780' }
]

rental_object = rentals.map { |rental| Rental.create!(rental) }

# Create Rental Events
rental_events = [
  { event_type: 'check_in', status: 'pending', data: '"start_telematics": [
                                                      {
                                                          "telemetry.can.fuel.level": 60,
                                                          "telemetry.can.vehicle.mileage": 1398,
                                                          "id": 9281043,
                                                          "name": "PX743LB"
                                                      }]',
    rental: rental_object[0] },
  { event_type: 'check_out', status: 'completed', data: '"start_telematics": [
                                                      {
                                                          "telemetry.can.fuel.level": 54,
                                                          "telemetry.can.vehicle.mileage": 1398,
                                                          "id": 5777967,
                                                          "name": "GX098MV"
                                                      }],
                                                      "end_telematics": [
                                                      {
                                                          "telemetry.can.fuel.level": 55,
                                                          "telemetry.can.vehicle.mileage": 2300,
                                                          "id": 5777967,
                                                          "name": "GX098MV"
                                                      }
                                                      ]',
    rental: rental_object[1] },
  { event_type: 'check_out', status: 'cancelled', data: '"start_telematics": [
                                                      {
                                                          "telemetry.can.fuel.level": 80,
                                                          "telemetry.can.vehicle.mileage": 2500,
                                                          "id": 6215784,
                                                          "name": "RT904JW"
                                                      }],
                                                      "end_telematics": [
                                                      {
                                                          "telemetry.can.fuel.level": 80,
                                                          "telemetry.can.vehicle.mileage": 2500,
                                                          "id": 6215784,
                                                          "name": "RT904JW"
                                                      }
                                                      ]',
    rental: rental_object[2] }
]

rental_events.map { |event| RentalEvent.create!(event) }

puts "Seed data successfully loaded!"
