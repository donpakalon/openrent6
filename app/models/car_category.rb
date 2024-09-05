class CarCategory < ApplicationRecord
  has_many :cars
  has_many :rentals
  has_many :daily_rates

  def calculate_price(starts_at = nil, ends_at = nil)
    latest_price_per_day = self.daily_rates.order(created_at: :desc).first&.price_per_day
    latest_price_per_day ||= 50
    return latest_price_per_day if starts_at.nil? || ends_at.nil?

    starts_at = DateTime.parse(starts_at) unless starts_at.is_a?(DateTime)
    ends_at = DateTime.parse(ends_at) unless ends_at.is_a?(DateTime)
    rental_days = (ends_at - starts_at).to_f.ceil
    rental_days * latest_price_per_day
  end
end
