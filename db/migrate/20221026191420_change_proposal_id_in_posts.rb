class ChangeProposalIdInPosts < ActiveRecord::Migration[6.1]
  def change
    rename_column :posts, :proposal_id, :place_id
  end
end

