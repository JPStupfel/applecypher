class Client < ApplicationRecord
    has_many :places
    has_secure_password

    validates :username, presence: true
    validates :username, uniqueness: true
end
