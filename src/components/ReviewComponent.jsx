import React, { useState, useEffect } from "react";
import axios from "axios";
import { Star } from "lucide-react"; // ✅ fix

const ReviewComponent = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:1709/api/reviews/product/${productId}`);
        setReviews(res.data.reviews);
        setAvgRating(res.data.averageRating);
      } catch (err) {
        console.error("❌ Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <div className="mt-10 bg-white p-6 rounded shadow space-y-4">
      <h3 className="text-xl font-semibold text-pink-500">Customer Reviews</h3>

      {avgRating !== null && (
        <div className="flex items-center gap-2 text-yellow-500">
          <Star className="w-5 h-5 fill-yellow-500" />
          <span className="text-lg font-medium">{avgRating} / 5</span>
          <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
        </div>
      )}

      {reviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews yet. Be the first to review this product!</p>
      ) : (
        <ul className="space-y-4">
          {reviews.slice(0, 5).map((review) => (
            <li key={review._id} className="border rounded p-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">
                  {review.customer?.first_name} {review.customer?.last_name}
                </span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
              <p className="mt-1 text-xs text-gray-400">{new Date(review.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewComponent;
