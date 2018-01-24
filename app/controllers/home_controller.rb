class HomeController < ApplicationController
  before_action :set_basis, except: :admin
  before_action :authenticate_user!, only: :admin

  def index
    @title = 'Home'
  end

  def admin
    @title = 'Administration'
    render layout: 'admin'
  end

  def articles_index
    @title = 'All articles'
    @articles = Articles.all
  end

  def article_show
    @article = Article.friendly.find(params[:id])
    @title = @article.title.to_s
  end

  def portfolio_index
    @title = 'All the projects'
    @portfolios = Portfolio.all
  end

  def portfolio_show

  end

  def contact
    @title = 'Contact'
  end

  def about
    @title = 'About me'
  end

  private

  def set_basis
    @basis = Basic.first if Basic.exists?
  end
end
