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
    @articles = Article.all
  end

  def portfolio_index
    @portfolios = Portfolio.all
  end

  def configuration
    @configuration = Basic.first if Basic.exists?
    @configuration.user = User.first
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

    private

    def comment_params
      params.require(:comment).permit(:email, :pseudo, :content)
    end
end
