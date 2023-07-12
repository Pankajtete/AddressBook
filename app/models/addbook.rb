class Addbook < ApplicationRecord
    validates :name, presence: true
    validates :age, presence: true
    validates :mob, presence: true
    validates :gender, presence: true
    validates :address, presence: true

end
