class CreateWebpics < ActiveRecord::Migration[6.1]
  def change
    create_table :webpics do |t|
      t.string :url
      t.timestamps
    end
  end
end
