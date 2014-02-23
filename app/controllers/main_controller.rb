class MainController < ApplicationController

	def index
	end

	def play
		@num_players = params[:num_players].to_i
	end

end
