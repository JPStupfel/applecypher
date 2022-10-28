class PlacePicturesSerializer < ActiveModel::Serializer

  attributes :id, :title, :description, :client_id, :lat, :lng, :first_picture
  has_many :pictures 

end
