class CreateSocialNetworks < ActiveRecord::Migration[5.1]
  def change
    create_table :social_networks do |t|
      t.string :name
      t.string :url
      t.integer :basic_id
      t.timestamps
    end
  end
end
