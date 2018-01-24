class CreatePortfolios < ActiveRecord::Migration[5.1]
  def change
    create_table :portfolios do |t|
      t.string :title
      t.string :tags
      t.string :slug
      t.string :thumbnail
      t.string :website
      t.datetime :creation_time
      t.boolean :public
      t.text :content
      t.json :illustrations

      t.timestamps
    end
  end
end
