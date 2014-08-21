class FavoritesController < ApplicationController

  respond_to :json

  def index
    @favorites = Favorite.where(params.permit(:movie_id, :user_id))

    if @favorites
      render status: :ok, json: @favorites.as_json
    else
      render status: :not_found, json: {
        error: "Favorites not found"
      }
    end
  end

  def create
    @favorite = Favorite.new(favorite_params)

    if @favorite.save
      render status: :created, json: @favorite.as_json
    else
      render status: :unprocessable_entity, json: @favorite.errors.as_json
    end
  end

  def show
    @favorite = Favorite.where(movie_id: params[:id]).first || Favorite.where(user_id: params[:id]).first

    if @favorite
      render status: :ok, json: @favorite.as_json
    else
      render status: :not_found, json: {
        error: "Favorite #{params[:id]} not found"
      }
    end
  end

  def destroy
    @favorite = Favorite.find_by(id: params[:id])

    if @favorite && @favorite.destroy
      render status: :ok, json: @favorite.as_json
    else
      render status: :not_found, json: {
        error: "Favorite #{params[:id]} not found"
      }
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:movie_id, :user_id)
  end

end
