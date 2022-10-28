class Webpic < ApplicationRecord
    has_many :pictures, :as => :imagable
end
