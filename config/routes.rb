Rails.application.routes.draw do  
  resources :pictures
  resources :webpics
  resources :places
  resources :posts
#  routes to return coordincates from address
  get "/address/:loc", to: 'places#getAddress'
# routes for client authentication
  post '/session', to: "sessions#create"
  patch '/session', to: "sessions#update"
  delete '/session', to: "sessions#destroy"
  get '/me', to: "sessions#index"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
