class Place < ApplicationRecord
    # has_many :posts, :dependent => :destroy
    has_many :pictures, :dependent => :destroy
    belongs_to :client

    validates :title, presence: true
    validates :description, presence: true

    def first_picture
       url = self.pictures ? self.pictures.first.imagable.url : 'https://i.seadn.io/gae/w4aZjvr6dpPfkSqSZjiYodI_zFawDfu4e3SnqK27_t9EPp7KXPcPhCSrhMjLprJxPP8CRopj_PIr0z-J5H5ImimJxidRmxkBppiU?auto=format&w=384'
       return url
    end


    
end
