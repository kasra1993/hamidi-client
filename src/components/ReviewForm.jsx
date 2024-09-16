import React, { useState } from "react";
import { showToast } from "../redux/slices/toastSlice";
import { useDispatch } from "react-redux";

const ReviewForm = ({ onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleRatingHover = (value) => {
    setHoverRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment === "") {
      setError("Please provide both a rating and a comment.");
      return;
    }
    dispatch(
      showToast({
        message: "دیدگاه شما ثبت و پس از بررسی به دیدگاه ها اضافه خواهد شد.",
        type: "success",
      })
    );

    // Call a submit handler (e.g., from props)
    onSubmitReview({ rating, comment });

    // Reset form
    setRating(0);
    setComment("");
    setHoverRating(0);
    setError("");
  };

  return (
    <div className="w-full  mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border-slate-500 border ">
      <h2 className="text-2xl font-semibold text-gray-700">دیدگاه</h2>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex items-center my-4">
          <span className="text-lg text-gray-600 mr-4">امتیاز : </span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  (hoverRating || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => handleRatingHover(star)}
                onMouseLeave={() => handleRatingHover(0)}
                onClick={() => handleRatingClick(star)}
              >
                <path d="M12 .587l3.668 7.426L24 9.761l-6 5.84 1.42 8.399L12 19.512l-7.42 4.488L6 15.601 0 9.761l8.332-1.748L12 .587z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="my-4">
          <label className="block text-gray-700 text-lg font-semibold mb-2 text-right">
            : نظر شما
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="دیدگاه خود را به اشتراک بگزارید"
            className="w-full h-32 p-3 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 text-right"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 transition duration-200"
        >
          ثبت دیدگاه
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
