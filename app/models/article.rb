class Article < ApplicationRecord
  attr_accessor :alert, :notice, :user
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :image, ArticleUploader
end
