Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'addbooks/index'
      post 'addbooks/create'
      delete '/destroy/:id', to: 'addbooks#destroy'
    end
  end
  root 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
