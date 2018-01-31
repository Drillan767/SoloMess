class ArticlesController < ApplicationController

  layout 'admin'
  before_action :authenticate_user!
  before_action :set_article, only: %i[show edit update destroy]

  def index
    @title = 'All articles'
    @articles = Article.all
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

    respond_to do |format|
      if @article.save
        format.html { redirect_to @article, notice: 'Article was successfully created.' }
        format.json { render :show, status: :created, location: @article }
      else
        format.html { render :new }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @article.update(article_params)
        format.html { redirect_to @article, notice: 'Article was successfully updated.' }
        format.json { render :show, status: :ok, location: @article }
      else
        format.html { render :edit }
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @article.destroy
    respond_to do |format|
      format.html { redirect_to articles_url, notice: 'Article was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def set_article
    @article = Article.friendly.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :image, :tags, :slug, :public, :content)
  end
end