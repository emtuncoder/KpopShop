import React, { useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const AddReviewForm = ({ productId }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in to leave a review.");
            return;
        }

        if (!rating || !comment.trim()) {
            alert("⭐ Rating and comment are required.");
            return;
        }

        try {
            setSubmitting(true);
            await axios.post("http://localhost:1709/api/reviews/", {
                customer: user.id || user._id,
                product: productId,
                rating,
                comment,
            });
            alert("✅ Review submitted!");
            setComment("");
            setRating(5);
        } catch (err) {
            console.error("❌ Failed to submit review", err);
            alert(err.response?.data?.error || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 bg-white p-6 rounded shadow">
            <h4 className="text-lg font-semibold text-pink-500">Leave a Review</h4>

            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                    <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="focus:outline-none"
                    >
                        <Star
                            className={`w-5 h-5 ${num <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                        />
                    </button>
                ))}
                <span className="text-sm text-gray-600 ml-2">{rating} star{rating > 1 && "s"}</span>
            </div>

            <textarea
                className={`w-full border rounded p-2 text-sm focus:outline-pink-500 ${!comment.trim() && submitting ? "border-red-500" : "border-gray-300"
                    }`}
                rows={3}
                placeholder="Write your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
            />

            <button
                type="submit"
                disabled={submitting}
                className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
                {submitting ? "Submitting..." : "Submit Review"}
            </button>
        </form>
    );
};

export default AddReviewForm;
