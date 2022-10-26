class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :client_id, :lat, :lng
  
  has_many :posts
end
