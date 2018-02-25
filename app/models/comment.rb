class Comment < ApplicationRecord
  belongs_to :article
  validates_presence_of :email, :user, :content
end
