class LogoUploader < CarrierWave::Uploader::Base

  storage :file

  def store_dir
    'uploads/logo'
  end

  def extension_whitelist
    %w[jpg jpeg png]
  end

end
