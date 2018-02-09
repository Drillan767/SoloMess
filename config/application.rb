require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module SoloMess
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    config.to_prepare do
      Devise::SessionsController.layout 'admin'
      # Devise::RegistrationsController.layout (proc{ |controller| user_signed_in? ? "application" : "devise" })
      # Devise::ConfirmationsController.layout "devise"
      # Devise::UnlocksController.layout "devise"
      # Devise::PasswordsController.layout "devise"
    end
  end
end
