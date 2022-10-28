class Picture < ApplicationRecord
    belongs_to :imagable, :polymorphic => true

    def url
        self.imagable.url
    end
end
