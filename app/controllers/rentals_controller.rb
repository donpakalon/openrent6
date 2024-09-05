class RentalsController < ApplicationController
  def create
    @user = current_user
    car_category_id = session[:car_category_id]
    starts_at = session[:start_at]
    ends_at = session[:end_at]
    car_category = CarCategory.find(car_category_id)

    @car = car_category.cars.first

    @rental = Rental.new(
      starts_at: starts_at,
      ends_at: ends_at,
      price: car_category.calculate_price(starts_at, ends_at)
    )
    @rental.user = @user
    @rental.car_category = car_category
    @rental.car = @car

    if @rental.save
      redirect_to car_categories_path, notice: 'Rental was successfully created.'
    else
      render :new, alert: 'There was an error creating the rental.'
    end
  end
  
  def index
    ## get the rentals of the curent user
    @rentals = current_user.rentals
  end

  def show
    @rental = Rental.find(params[:id])
  end
end
