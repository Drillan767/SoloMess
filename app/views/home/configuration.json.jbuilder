json.extract! @configuration, :id, :base_title, :resume, :logo, :social_networks, :logged_in, :active
json.url configuration_path(@configuration, format: :json)