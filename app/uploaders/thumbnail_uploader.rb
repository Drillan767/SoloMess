class ThumbnailUploader < CarrierWave::Uploader::Base

  storage :file

  def store_dir
    "uploads/portfolio/#{model.id}"
  end

  def extension_whitelist
    %w[jpg jpeg png]
  end
end
