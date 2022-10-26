class Client < ApplicationRecord
    has_many :places
    has_secure_password
end
