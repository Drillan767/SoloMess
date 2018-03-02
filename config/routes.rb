Rails.application.routes.draw do

  root 'home#index'
  get '/*id' => 'home#index', id: /(?!admin|settings|users|all|comment).*/

  # List:
  # - /articles
  # - /article/:id
  # - /portfolio
  # - /project/:id
  # - /contact
  # - /about
  # - some more links such as '/legal-stuff or something'

  # Whitelisted
  # - admin/*
  # - /settings.json
  # - /users/* [ users/sign_in, users/sign_out, users/sign_up]
  # - /all_articles.json | /all_projects.json

  get '/settings' => 'home#configuration', as: :configuration
  get '/admin' => 'home#admin', as: :admin
  get '/all_articles.json' => 'home#articles_index'
  get '/all_projects.json' => 'home#portfolio_index'
  post '/comment' => 'home#comment'

  devise_for :users, skip: [:password]

  scope '/admin' do

    authenticate :user do

      post '/articles/:id' => 'articles#update'
    end
    devise_for :users, skip: [:sessions]

    post '/articles/multiple/:actions' => 'articles#multiple_actions'

    get '*path' => 'home#admin'
  end
end


=begin
 resource :basics, path: :settings
      resources :portfolios, except: %w[show new edit index update]
      get '/portfolio' => 'portfolios#index'
      get '/project/:id' => 'portfolios#show', as: :portfolio_show
      get '/new/project' => 'portfolios#new'
      get '/project/:id/edit' => 'portfolios#edit'
      post '/project/:id' => 'portfolios#update'

      resources :articles, except: :update do
        resources :comments
      end


      post '/articles/multiple/:actions/:data' => 'articles#multiple_actions'
      post '/articles/:id/ajax_delete' => 'articles#ajax_delete'

      post '/portfolio/multiple/:actions/:data' => 'portfolios#multiple_actions'
      post '/portfolio/:id/ajax_delete' => 'portfolios#ajax_delete'
      post '/portfolio/encode_file' => 'portfolios#encode_file'
      

=end