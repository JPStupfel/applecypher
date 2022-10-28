class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  def index
    posts = Post.all

    render json: posts, status: 200
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    
    # attach post to last Place because is called when place is created
    @post = Post.create(post_params)
    @picture = Place.last.pictures.create :imagable => @post

      if @picture.valid
        render json: @picture, status: :created, location: @picture
      else
        render json: @picture.errors, status: :unprocessable_entity
      end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :image)
    end

end
