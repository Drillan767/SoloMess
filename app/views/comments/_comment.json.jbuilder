json.extract! comment, :id, :email, :pseudo, :content, :created_at, :updated_at
json.url comment_url(comment, format: :json)
