class CreatePictures < ActiveRecord::Migration[6.1]
  def change
    create_table :pictures do |t|
      t.integer :place_id
      t.references :imagable, polymorphic: true
      t.timestamps
    end
  end
end
