class ArticleUploader < CarrierWave::Uploader::Base
  storage :file

  def store_dir
    "uploads/articles/#{model.id}"
  end

  def extension_whitelist
    %w[jpg jpeg png]
  end
end
