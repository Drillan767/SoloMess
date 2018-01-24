class CreateArticles < ActiveRecord::Migration[5.1]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :image
      t.string :tags
      t.string :slug
      t.boolean :public
      t.text :content

      t.timestamps
    end
  end
end
