module ApplicationHelper

  def title
    base_title = Basic.first.base_title if Basic.exists?

    base_title = 'SoloMess' if base_title.nil?

    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end
end
