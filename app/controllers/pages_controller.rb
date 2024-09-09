class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
  end

  def search_results
    @results = %w[hi test 123] # Example data, replace with your actual logic

    respond_to do |format|
      format.turbo_stream do
        render turbo_stream: turbo_stream.replace('results', partial: 'pages/results', locals: { results: @results })
      end
      format.html { head :not_acceptable } # This handles HTML requests with a 406
    end
  end
end
