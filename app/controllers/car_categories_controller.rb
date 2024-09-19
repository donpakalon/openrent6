class CarCategoriesController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[index show]

  def index
    @rental = Rental.new
    if params[:start_date].present? && params[:end_date].present?
      starts_at = params[:start_date]
      ends_at = params[:end_date]

      session[:start_at] = starts_at
      session[:end_at] = ends_at

      @available_categories = CarCategory.joins(cars: :rentals)
                                         .where.not(rentals: { starts_at: starts_at..ends_at })
                                         .where.not(rentals: { ends_at: starts_at..ends_at })
                                         .distinct
    elsif session[:start_at].present? && session[:end_at].present?
      starts_at = session[:start_at]
      ends_at = session[:end_at]

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
    session[:car_category_id] = @car_category.id
    session[:start_at] = params[:start_date] if params[:start_date].present?
    session[:end_at] = params[:end_date] if params[:end_date].present?
    @price = @car_category.calculate_price(session[:start_at], session[:end_at])
    respond_to do |format|
      format.html
      format.text { render partial: "car_categories/price", locals: { price: @price }, formats: [:html] }
    end
  end

  def update_dates
    session[:start_at] = params[:start_date]
    session[:end_at] = params[:end_date]
    render json: { message: 'Session updated successfully', start: session[:start_at], end: session[:end_at] }
  end

  # def price
  #   @car_category = CarCategory.find(params[:id])
  #   # @price = @car_category.calculate_price(params[:start_date], params[:end_date])
  #   session[:start_at] = params[:start_date]
  #   session[:end_at] = params[:end_date]
  #   redirect_to @car_category
  #   # Respond with the updated price within the turbo frame
  #   # respond_to do |format|
  #   #   format.turbo_stream
  #     # format.html { redirect_to @car_category } # Fallback in case Turbo is not used
  #   # end
  # end
end
