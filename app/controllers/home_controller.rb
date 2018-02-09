class HomeController < ApplicationController
  before_action :authenticate_user!, only: :admin

  def index
    @title = 'Home'
  end

  def admin
    @title = 'Dashboard'
    render layout: 'admin'
  end

  def articles_index
    @title = 'All articles'
    @articles = Article.all
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
    @portfolio = Portfolio.friendly.find(params[:id])
    @title = @portfolio.title.to_s
  end

  def about
    @title = 'About me'
  end

  def configuration
    @configuration = Basic.first if Basic.exists?
    @configuration.user = User.first if User.exists?
    @configuration.logged_in = true if current_user
  end

  def contact
    @contact = Contact.new
    @contact.notice = true if cookies['valid']
    @contact.alert = cookies['alert'] if cookies['alert']
    @title = 'Contact'
  end

  def create
    @contact = Contact.new params[:contact]
    if @contact.valid?
      # ContactMailer.contact_form(@contact).deliver
      cookies['valid'] = { value: true, expires: 3.seconds.from_now }
    else
      cookies['alert'] = { value: @contact.errors.full_messages, expires: 3.seconds.from_now }
    end
    redirect_to @contact
  end
end
