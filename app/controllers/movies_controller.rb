class MoviesController < ApplicationController

  respond_to :json

  def index
    @movies = Movie.where(params.permit(:id, :title, :youtube_id))

    if @movies
      render status: :ok, json: @movies.as_json
    else
      render status: :not_found, json: {
        error: "Movies not found"
      }
    end
  end

  def create
    @movie = Movie.new(movie_params)

    if @movie.save
      render status: :created, json: @movie.as_json
    else
      render status: :unprocessable_entity, json: @movie.errors.as_json
    end
  end

  def show
    @movie = Movie.where(youtube_id: params[:id]).first || Movie.where(id: params[:id]).first

    if @movie
      render status: :ok, json: @movie.as_json
    else
      render status: :not_found, json: {
        error: "Movie #{params[:id]} not found"
      }
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :youtube_id, :poster_url, :released, :rated, :running_time, :description)
  end

end
