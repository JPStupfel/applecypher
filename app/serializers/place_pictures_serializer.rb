class PlacePicturesSerializer < ActiveModel::Serializer

  attributes :id, :title, :description, :client_id, :lat, :lng
  has_many :pictures 

end
