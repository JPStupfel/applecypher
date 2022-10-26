class Proposal < ApplicationRecord
    has_many :posts, :dependent => :destroy
    has_many :bids, :dependent => :destroy
    
    belongs_to :client

    validates :title, presence: true
    validates :description, presence: true

    
end
