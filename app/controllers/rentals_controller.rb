class RentalsController < ApplicationController
  def index
    ## get the rentals of the curent user
    @rentals = current_user.rentals
  end

  def show
    @rental = Rental.find(params[:id])
  end
  
  def create
    
  end
end
