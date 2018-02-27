class CreateBasics < ActiveRecord::Migration[5.1]
  def change
    create_table :basics do |t|
      t.string :base_title
      t.string :front_page
      t.string :theme_color
      t.string :titles_color
      t.string :logo
      t.string :notice
      t.string :alert
      t.boolean :seen

      # Image inside the text on landing
      t.string :landing_image
      # Text on landing
      t.string :landing_text
      t.string :landing_contact

    end
  end
end