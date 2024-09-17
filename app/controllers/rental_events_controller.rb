class RentalEventsController < ApplicationController
  def create
    @rental = Rental.find(params[:rental_id])

    # Ensure the event_type is either "check_in" or "check_out"
    event_type = params[:event_type]

    if event_type.in?(["check_in", "check_out"])
      # Find or initialize the rental event of the given event type
      @rental_event = @rental.rental_events.find_or_initialize_by(event_type: event_type)

      # Update or set other attributes as necessary
      @rental_event.status = "pending"
      new_data = params[:data].present? ? JSON.parse(params[:data]) : {}
      existing_data = @rental_event.data.present? ? JSON.parse(@rental_event.data) : {}
      @rental_event.data = existing_data.merge(new_data).to_json

      # Save the rental event
      if @rental_event.save
        flash[:notice] = "#{event_type.humanize} event saved successfully."
        redirect_to @rental
      else
        flash[:alert] = "Error saving #{event_type.humanize} event."
        render :new
      end
    else
      flash[:alert] = "Invalid event type."
      redirect_to @rental
    end
  end

  def update
  end

  private

  def rental_event_params
    params.require(:rental_event).permit(:event_type)
  end
end
