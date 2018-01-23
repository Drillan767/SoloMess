class CreateBasics < ActiveRecord::Migration[5.1]
  def change
    create_table :basics do |t|
      t.string :base_title
      t.string :facebook
      t.string :twitter
      t.string :github
      t.string :linkedin
      t.string :viadeo
      t.boolean :resume

      t.timestamps
    end
  end
end
