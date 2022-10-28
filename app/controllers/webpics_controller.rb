class WebpicsController < ApplicationController
    before_action :set_webpic, only: [:show, :update, :destroy]

  # GET /webpics
  def index
    webpics = Webpic.all

    render json: webpics, status: 200
  end

  # GET /webpics/1
  def show
    render json: @webpic
  end

  # WEBPIC /webpics
  def create
    # attach webpic to last Place because is called when place is created
    webpic = Webpic.create(webpic_params)
    picture = Place.last.pictures.create :imagable => webpic
      if picture.valid?
        render json: picture, status: :created, location: picture
      else
        render json: picture.errors, status: :unprocessable_entity
      end
  end

  # PATCH/PUT /webpics/1
  def update
    if @webpic.update(webpic_params)
      render json: @webpic
    else
      render json: @webpic.errors, status: :unprocessable_entity
    end
  end

  # DELETE /webpics/1
  def destroy
    @webpic.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_webpic
      @webpic = Webpic.find(params[:id])
    end
    # Only allow a list of trusted parameters through.
    def webpic_params
      params.permit(:url)
    end

end
