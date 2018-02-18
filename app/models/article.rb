class Article < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  mount_uploader :image, ArticleUploader
  validates_presence_of :title, :content, :tags
  validates_uniqueness_of :slug

  def should_generate_new_friendly_id?
    title_changed?
  end
end
