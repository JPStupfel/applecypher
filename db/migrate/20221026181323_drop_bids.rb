class DropBids < ActiveRecord::Migration[6.1]
  def change
    drop_table :bids
  end
end
