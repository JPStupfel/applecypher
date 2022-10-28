class PictureSerializer < ActiveModel::Serializer
  attributes :id,:imagable_type, :url
end
