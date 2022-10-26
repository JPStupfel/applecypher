class Proposal < ApplicationRecord
    has_many :posts, :dependent => :destroy
    
    belongs_to :client

    validates :title, presence: true
    validates :description, presence: true

    
end
