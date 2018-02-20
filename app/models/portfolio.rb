class Portfolio < ApplicationRecord

  extend FriendlyId

  friendly_id :title, use: :slugged
  mount_uploader :thumbnail, ThumbnailUploader
  # mount_uploaders :illustrations, IlllustrationsUploader
end