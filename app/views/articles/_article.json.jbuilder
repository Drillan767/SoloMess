json.extract! article, :id, :title, :image, :tags, :slug, :public, :content, :created_at, :updated_at
json.url article_url(article, format: :json)
