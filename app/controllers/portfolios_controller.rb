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

    if params[:publish]
      @portfolio.public = true
    elsif params[:save]
      @portfolio.public = false
    end

    if @portfolio.save
      Basic.update(1, notice: 'Eveything was good thank you so much omg')
      redirect_to portfolio_show_path(@portfolio.slug)
    else
      Basic.update(1, alert: @portfolio.errors.full_messages)
    end
  end

  def update
    require 'fileutils'

    if params[:publish]
      @portfolio.public = true
    elsif params[:save]
      @portfolio.public = false
    end

    path = 'public' + @portfolio.illustrations.first

    if File.exist?(path)
      FileUtils.rm_rf(path)
      @portfolio.illustrations = []
    end

    if @portfolio.update(portfolio_params)
      Basic.update(1, notice: 'Eveything was good thank you so much omg')
      redirect_to portfolio_show_path(@portfolio.slug), notice: 'wp'
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

  def encode_file
    if File.exists?('public' + params[:url])
      encoded_string = Base64.encode64(File.open('public' + params[:url], 'r').read)
      render json: encoded_string
    end
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
    require 'fileutils'
    filename = 'portfolio-file-'
    path = 'public/uploads/portfolio/' + Time.now.strftime('%d%m%Y%H%M%S')

    FileUtils.mkdir_p(path) unless File.directory?(path)

    response = []

    base64.each_with_index do |b, i|
      _in_content_type, format, _encoding, _string = b.split(/[:\/;,]/)[1..4]

      File.open(path + '/' + filename + i.to_s + '.' + format, 'wb') do |f|
        f.write(Base64.decode64(b.partition('base64,').last))
      end

      response.push(path.sub('public', '') + '/' + filename + i.to_s + '.' + format)
    end

    response
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
end