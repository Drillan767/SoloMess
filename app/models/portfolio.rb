class Portfolio < ApplicationRecord

  extend FriendlyId

  friendly_id :title, use: :slugged
  mount_uploader :thumbnail, ThumbnailUploader

  def should_generate_new_friendly_id?
    title_changed?
  end
end