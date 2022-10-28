class Place < ApplicationRecord
    # has_many :posts, :dependent => :destroy
    has_many :pictures, :dependent => :destroy
    belongs_to :client

    validates :title, presence: true
    validates :description, presence: true

    def first_picture
        self.pictures.first.imagable.url
    end


    
end
