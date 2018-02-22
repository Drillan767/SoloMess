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

  get '/admin' => 'home#admin', as: :admin

  devise_for :users, skip: [:password]

  scope '/admin' do
    authenticate :user do
      resource :basics
      resources :portfolios, except: %w[show new edit index]
      get '/portfolio' => 'portfolios#index'
      get '/project/:id' => 'portfolios#show', as: :portfolio_show
      get '/new/project' => 'portfolios#new'
      get '/project/:id/edit' => 'portfolios#edit'
      resources :articles, except: %i[new update]
      get '/new/article' => 'articles#new'
      post '/articles/:id' => 'articles#update'

      post '/articles/multiple/:actions/:data' => 'articles#multiple_actions'
      post '/articles/:id/ajax_delete' => 'articles#ajax_delete'

      post '/portfolio/multiple/:actions/:data' => 'portfolios#multiple_actions'
      post '/portfolio/:id/ajax_delete' => 'portfolios#ajax_delete'
    end

    devise_for :users, skip: [:sessions]
  end
end