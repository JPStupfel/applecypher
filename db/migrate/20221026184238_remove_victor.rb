class RemoveVictor < ActiveRecord::Migration[6.1]
  def change
    remove_column :proposals, :victor_id
  end
end
