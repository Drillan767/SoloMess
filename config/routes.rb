Rails.application.routes.draw do

  root 'home#index'

  get '/articles' => 'home#articles_index', as: :home_article_index
  get '/article/:id' => 'home#article_show', as: :home_article_show

  get '/portfolio' => 'home#portfolio_index', as: :home_portfolio_index
  get '/project/:id' => 'home#portfolio_show', as: :home_portfolio_show

  get '/contact' => 'home#contact', as: :new_contact
  post '/contact' => 'home#create', as: :contacts

  get '/settings' => 'home#configuration', as: :configuration

  get '/about' => 'home#about', as: :about

  devise_for :users, only: %w['sessions#new session#destroy']

  as :user do
    get 'login' => 'devise/sessions#new', as: :login
    get 'logout' => 'devise/sessions#destroy', as: :logout
  end

  get '/admin' => 'home#admin', as: :admin

  authenticate :user do
    scope '/admin' do
      resource :basics
      resources :portfolios, except: %w[show new edit]
      get '/project/:id' => 'portfolios#show'
      get '/project/new' => 'portfolios#new'
      get '/project/:id/edit' => 'portfolios#edit'
      resources :articles
      devise_for :users, except: %w['sessions#new session#destroy']
      # resource :user, only: %w[show edit update]
    end
  end
end
