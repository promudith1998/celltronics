import React from 'react';

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: number;
  showCount?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviews,
  size = 13,
  showCount = true
}) => {
  const rounded = Math.round(rating);

  return (
    <div className="pcard-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            viewBox="0 0 24 24"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              fill: star <= rounded ? 'var(--orange)' : 'var(--gray-200)',
              transition: 'fill 0.15s ease'
            }}
          >
            <path d="M12 2l3 6.6 7 .9-5.2 4.9 1.4 7-6.2-3.5-6.2 3.5 1.4-7L2 9.5l7-.9z" />
          </svg>
        ))}
      </div>
      {showCount && (
        <span style={{ fontSize: `${size - 1}px`, fontWeight: 600, color: 'var(--navy)' }}>
          {rating.toFixed(1)}
          {reviews !== undefined && (
            <span style={{ color: 'var(--gray-400)', fontWeight: 400 }}> ({reviews})</span>
          )}
        </span>
      )}
    </div>
  );
};
