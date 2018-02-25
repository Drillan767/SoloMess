class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :email
      t.string :pseudo
      t.text :content
      t.integer :article_id
      t.boolean :seen, default: false
      t.timestamps
    end
  end
end
