class PlacesController < ApplicationController

    before_action :require_login

    def index
        if params[:limit] || params[:offset] || params[:search] 
            places = Place.limit(params[:limit]).offset(params[:offset]).where("title ILIKE ?","%"+params[:search]+"%")
        
    else 
        places = Place.all
    end
        render json: places, status: 200

    end
 
    def getAddress
       location = getCoords(params['loc'])
       render json: location, status: 200
    end

    def create
        place = Place.create( title: params['title'], description: params['description'], lat: params['lat'], lng: params['lng'], client_id: params['client_id'])
        if place.valid?
            render json: place, status: 200  
        else
            render json: {error: place.errors.full_message}, status: 422
        end
    end

    def show
        place = Place.find_by id: params['id']
        if place
            render json: place, status: 200
        else
            render json: {error: 'Place Not Found'}, status: 422
        end
    end

    def destroy
        place = Place.find_by id: params['id']
        if place
            place.destroy
            render json: {}, status: 204
        else
            render json: {error: 'place not found'}, status: 422
        end
    end

    def update
        place = Place.find_by id: params['id']
        if place            
             place.update placeParams
            render json: place, status: 202
        else
            render json: {error: 'Place Not Found'}, status: 422
        end
    end

    private
    
    def require_login
        if !session[:user_id] 
            render json: {error: 'log in first'}
        end
    end
    # return coordincates from address
    def getCoords address
        uri = URI("https://maps.googleapis.com/maps/api/geocode/json?address='#{address}'&key=#{ENV['GOOGLE_GEOCODING_API_KEY']}")
        res = Net::HTTP.get_response(uri)
        return JSON(res.body)['results'][0]['geometry']['location']
    end

    def placeParams
        params.permit(:title, :description, :client_id, :lat, :lng)
    end


end
