class HomeController < ApplicationController
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
    @configuration.logged_in = true if current_user
  end

  def contact
    @contact = Contact.new
    @titre = 'Contact'
  end

  def create
    @contact = Contact.new params[:contact]
    if @contact.valid?
      ContactMailer.contact_form(@contact).deliver
      redirect_to contacts_path, notice: "Thank you! I'll reach you in a short while"
    else
      render :contact
    end
  end
end
