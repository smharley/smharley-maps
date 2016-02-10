class PlaceSerializer < ActiveModel::Serializer
  attributes :name, :description, :lat, :lng
end
