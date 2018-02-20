class PortfoliosController < ApplicationController
  before_action :set_portfolio, only: %i[show edit update destroy]
  before_action :authenticate_user!
  before_action :clean_notifications
  before_action :update_notifications, except: %w[create update destroy]
  layout 'admin'

  def index
    @portfolios = Portfolio.order('created_at DESC')
    @title = 'All projects'
  end

  def show
    @title = @portfolio.title.to_s
  end

  def new
    @portfolio = Portfolio.new
    @title = 'New project'
  end

  def edit
    @title = 'Edit ' + @portfolio.title.to_s
  end

  def create
    @portfolio = Portfolio.new(portfolio_params)
    if @portfolio.save
      Basic.update(1, notice: 'Eveything was good thank you so much omg')
      redirect_to @portfolio
    else
      Basic.update(1, alert: @portfolio.errors.full_messages)
    end

  ensure
    clean_tempfile
  end

  def update
    if @portfolio.update(portfolio_params)
      Basic.update(1, notice: 'Eveything was good thank you so much omg')
      redirect_to @portfolio
    else
      Basic.update(1, alert: @portfolio.errors.full_messages)
    end
  end

  def destroy
    @portfolio.destroy
    respond_to do |format|
      format.html { redirect_to portfolios_url, notice: 'Portfolio was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def ajax_delete
    Portfolio.find(params[:id]).destroy
    @portfolios = Portfolio.all
  end

  def multiple_actions

    params[:data].split(',').each do |id|
      case params[:actions]
      when 'publish'
        Portfolio.update(id, public: true)
      when 'unpublish'
        Portfolio.update(id, public: false)
      when 'delete'
        Portfolio.find(id).destroy
      else
        return 'error'
      end
    end

    @portfolios = Portfolio.all
  end

  private

  def set_portfolio
    @portfolio = Portfolio.friendly.find(params[:id])
  end

  def portfolio_params
    port_params = params.require(:portfolio).permit(:title, :creation_time,
                                      :public, :content, { illustrations: [] },
                                      :slug, :thumbnail, :website, :tags)
    port_params[:illustrations] = parse_image_data(port_params[:illustrations]) if port_params[:illustrations]
    port_params
  end

  def parse_image_data(base64)
    filename = "portfolio-file"
    base64.each do |b|
      in_content_type, format, encoding, string = b.split(/[:\/;,]/)[1..4]
      File.open(filename + '.' + format, 'wb') do |f|
        f.write(Base64.decode64(b))
      end
    end
  end

  def clean_notifications
    @settings = Basic.first
    if (@settings.alert || @settings.notice) && @settings.seen
      @settings.update(notice: '', alert: '', seen: false)
    end
  end

  def update_notifications
    Basic.update(1, seen: true) unless Basic.first.notice.blank? && Basic.first.alert.blank?
  end

  def clean_tempfile
    if @tempfile
      @tempfile.close
      @tempfile.unlink
    end
  end
end