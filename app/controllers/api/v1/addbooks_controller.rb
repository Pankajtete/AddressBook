class Api::V1::AddbooksController < ApplicationController
  def index
    addbook = Addbook.all
    render json: addbook
  end

  def create
    addbook = Addbook.create!(addbook_params)
    if addbook
      render json: addbook
    else
      render json: addbook.errors
    end
  end

  def destroy
    @addbook&.destroy
    render json: { message: 'Address deleted!' }
  end

  private

  def addbook_params
    params.permit(:name, :age, :mob, :gender, :address)
  end
end
