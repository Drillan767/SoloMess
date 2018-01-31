class CreateBasics < ActiveRecord::Migration[5.1]
  def change
    create_table :basics do |t|
      t.string :base_title
      t.boolean :resume
      t.string :logo

      # Image inside the text on landing
      t.string :landing_image
      # Text on landing
      t.string :landing_text
      # Image BEHIND all that
      t.string :landing_background
      # Image behind the main content
      t.string :landing_body

      t.string :landing_articles
      t.string :landing_portfolio
      t.string :landing_contact

      t.timestamps
    end
  end
end