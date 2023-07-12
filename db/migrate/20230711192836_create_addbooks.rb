class CreateAddbooks < ActiveRecord::Migration[7.0]
  def change
    create_table :addbooks do |t|
      t.string :name
      t.integer :age
      t.string :mob
      t.string :gender
      t.string :address

      t.timestamps
    end
  end
end
