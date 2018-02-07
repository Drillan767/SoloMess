class Basic < ApplicationRecord
  has_many :social_networks
  accepts_nested_attributes_for :social_networks, reject_if: :all_blank, allow_destroy: true
  mount_uploader :logo, LogoUploader
  attr_accessor :logged_in, :active
end