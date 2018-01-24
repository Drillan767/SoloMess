class Contact

  include ActiveModel::Validations
  include ActiveModel::Conversion
  include ActiveModel::Naming

  attr_accessor :nom, :objet, :email, :message

  validates :nom, :objet, :email, :message, presence: true
  validates_format_of :email, with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i, on: :create


  def persisted?
    false
  end

  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end
end