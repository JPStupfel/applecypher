require 'uri'
require 'net/http'


class ProposalsController < ApplicationController

    before_action :require_login

    
    def index
        proposals = Proposal.all
        render json: proposals, status: 200
    end

    def getAddress
       location = getCoords(params['loc'])
       render json: location, status: 200
    end

    def create
        
        proposal = Proposal.create(
            title: params['title'],
            description: params['description'],
            lat: params['lat'],
            lng: params['lng'],
            client_id: params['client_id'],
            victor_id: nil
        )
        
        post = proposal.posts.create params['post']

        render json: proposal, status: 200
        
    end

    private
    
    def require_login
        if !session[:user_id] 
            render json: {error: 'log in first'}
        end
    end

    def getCoords address
        
        uri = URI("https://maps.googleapis.com/maps/api/geocode/json?address='#{address}'&key=#{ENV['API_KEY']}")
        res = Net::HTTP.get_response(uri)
        return JSON(res.body)['results'][0]['geometry']['location']
    end

end
