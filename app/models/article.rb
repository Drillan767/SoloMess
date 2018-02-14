class Article < ApplicationRecord
  attr_accessor :alert, :notice, :user
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :image, ArticleUploader

  validates_presence_of :title, :content, :image, :tags
end
