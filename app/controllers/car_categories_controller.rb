class CarCategoriesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]
  def index
    # @car_categories = CarCategory.all
    # @car_categories = CarCategory.where(name: params[:query]) if params[:query].present?
    # @overlapping_rentals = Rental.where("starts_at <= ? AND ends_at >= ?", params[:end_date], params[:start_date])
    # @overlapping_cars = @overlapping_rentals.map(&:car).uniq
    # @available_cars = Car.all - @overlapping_cars
    # @available_categories = @available_cars.map(&:car_category).uniq
    if params[:start_date].present? && params[:end_date].present?
      starts_at = params[:start_date]
      ends_at = params[:end_date]

      @available_categories = CarCategory.joins(cars: :rentals)
                                   .where.not(rentals: { starts_at: starts_at..ends_at })
                                   .where.not(rentals: { ends_at: starts_at..ends_at })
                                   .distinct
    else
      @available_categories = CarCategory.all
    end
  end

  def show
    @car_category = CarCategory.find(params[:id])
  end
end
