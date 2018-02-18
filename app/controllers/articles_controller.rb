class ArticlesController < ApplicationController
  layout 'admin'
  before_action :authenticate_user!
  before_action :set_article, only: %i[show edit update destroy]
  before_action :clean_notifications
  before_action :update_notifications, except: %w[create update destroy]

  def index
    @title = 'All articles'
    @articles = Article.order('created_at DESC')
  end

  def show
    @title = @article.title.to_s
  end

  def new
    @title = 'New article'
    @article = Article.new
  end

  def edit
    @title = 'Edit ' + @article.title.to_s
  end

  def create
    @article = Article.new(article_params)

    if params[:publish]
      @article.public = true
    elsif params[:save]
      @article.public = false
    end

    if @article.save(article_params)
      Basic.update(1, notice: 'Eveything was good thank you so much omg')
      redirect_to @article
    else
      Basic.update(1, alert: @article.errors.full_messages)
    end
  end

  def update
    # abort article_params.inspect
    if @article.update(article_params)
      Basic.update(1, notice: 'Eveything was good thank you so much omg')
      redirect_to articles_path
    else
      abort @article.errors.inspect
      Basic.update(1, alert: @article.errors.full_messages)
    end
  end

  def destroy
    @article.destroy
    Basic.update(1, notice: 'Article was successfully deleted')
  end

  def ajax_delete
    Article.find(params[:id]).destroy
    @articles = Article.all
  end

  def multiple_actions

    params[:data].split(',').each do |id|
      case params[:actions]
      when 'publish'
        Article.update(id, public: true)
      when 'unpublish'
        Article.update(id, public: false)
      when 'delete'
        Article.find(id).destroy
      else
        return 'error'
      end
    end

    @articles = Article.all
  end

  private

  def set_article
    @article = Article.friendly.find(params[:id])
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

  def article_params
    params.require(:article).permit(:title, :image, :tags, :slug, :public, :content)
  end
end