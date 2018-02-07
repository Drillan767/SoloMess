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

  devise_for :users

  as :user do
    get 'login' => 'devise/sessions#new', as: :login
    get 'logout' => 'devise/sessions#destroy', as: :logout
  end

  get '/admin' => 'home#admin', as: :admin

  authenticate :user do
    scope '/admin' do
      resource :basics
      resources :portfolios
      resources :articles
    end
  end
end
