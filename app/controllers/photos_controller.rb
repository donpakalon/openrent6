class PhotosController < ApplicationController

  def index
    @photos = Photo.all
  end
  
  def new
    @photo = Photo.new
  end

  def create
    @photo = Photo.new(photo_params)

    if params[:photo][:photo].present?
      uploaded_file = params[:photo][:photo]

      # Upload vers Cloudinary
      result = Cloudinary::Uploader.upload(uploaded_file)

      if result["secure_url"].present?
        # Sauvegarde l'URL dans l'objet photo
        @photo.url = result["secure_url"]

        if @photo.save
          render json: { message: "Photo uploaded and saved successfully", url: @photo.url }, status: :created
        else
          render json: { error: @photo.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Upload failed" }, status: :unprocessable_entity
      end
    else
      render json: { error: "No photo uploaded" }, status: :unprocessable_entity
    end
  end

  private

  def photo_params
    params.require(:photo).permit(:photo)
  end
end
