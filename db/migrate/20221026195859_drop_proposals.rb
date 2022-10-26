class DropProposals < ActiveRecord::Migration[6.1]
  def change
    drop_table :proposals
  end
end
