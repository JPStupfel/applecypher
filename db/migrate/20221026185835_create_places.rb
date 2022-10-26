class CreatePlaces < ActiveRecord::Migration[6.1]
  def change
    create_table :places do |t|
      t.string :title
      t.string :description
      t.integer :client_id
      t.float :lat
      t.float :lng
      t.timestamps
    end
  end
end
