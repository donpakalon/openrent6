class RentalEventsController < ApplicationController
  def new
    @rental_event = RentalEvent.find_by(rental_id: params[:rental_id], event_type: params[:event_type])
    return @rental_event if @rental_event

    @rental_event = RentalEvent.create(
      rental_id: params[:rental_id],
      event_type: params[:event_type]
    )
  end

  def create
    @rental = Rental.find(params[:rental_id])

    # Ensure the event_type is either "check_in" or "check_out"

    event_type = params[:event_type]
    if event_type.in?(["check_in", "check_out"])
      # Find or initialize the rental event of the given event type
      @rental_event = @rental.rental_events.find_by(event_type:)

      # Update or set other attributes as necessary
      @rental_event.status = "pending"
      # new_data = params[:data].present? ? params[:data] : {}
      # existing_data = @rental_event.data ? JSON.parse(@rental_event.data) : {}
      # @rental_event.data = existing_data.merge(new_data).to_json

      @rental_event.photos.attach(
        io: params[:photo][:photo],
        filename: "check_in photo rental ##{@rental.id}.png",
        content_type: "image/png"
      )
      # Save the rental event
      if @rental_event.save!
        flash[:notice] = "#{event_type.humanize} event saved successfully."
        redirect_to new_rental_rental_event_path(event_type: "check_in", rental_id: @rental.id)
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
