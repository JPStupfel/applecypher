class Post < ApplicationRecord
    has_one_attached :image
    # belongs_to :place
    has_many :pictures, :as => :imagable


    def url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end
end