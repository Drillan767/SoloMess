module ApplicationHelper

  def title
    base_title = Basic.first.default_title if Basic.exists?

    base_title = 'RawrXD' if base_title.nil?

    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end
end
