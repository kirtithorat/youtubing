class CreateMovies < ActiveRecord::Migration
  def change
    create_table :movies do |t|
      t.string :title
      t.string :youtube_id
      t.string :poster_url
      t.string :released
      t.string :rated
      t.integer :running_time
      t.text :description

      t.timestamps
    end
  end
end
