Rails.application.routes.draw do
  
  resources :places
  resources :posts
  resources :proposals, only: [:index, :create, :show, :destroy, :update]
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
 #test

#  routes to return coordincates from address
  get "/address/:loc", to: 'places#getAddress'

# routes for client authentication
  post '/session', to: "sessions#create"
  patch '/session', to: "sessions#update"
  delete '/session', to: "sessions#destroy"
  get '/me', to: "sessions#index"
# routes for profesional authenication
  

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
