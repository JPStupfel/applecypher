class DropProfessionals < ActiveRecord::Migration[6.1]
  def change
    drop_table :professionals
  end
end
