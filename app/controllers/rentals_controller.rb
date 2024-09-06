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
      redirect_to rental_path(@rental), notice: 'Rental was successfully created.'
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

  def edit
    @rental = Rental.find(params[:id])
  end

  def update
    @rental = Rental.find(params[:id])
    if @rental.update(rental_params)
      new_price = @rental.car_category.calculate_price(@rental.starts_at, @rental.ends_at)
      @rental.update(price: new_price)
      redirect_to @rental, notice: 'Rental was successfully updated.'
    else
      render :edit
    end
  end

  private

  def rental_params
    params.require(:rental).permit(:starts_at, :ends_at)
  end
end
