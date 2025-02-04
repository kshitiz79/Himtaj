import React, { useState } from "react";
import CommentorIcon from "../../../assets/avatar.png";
import { formatDate } from "../../../utils/dataFormer";
import PostAReview from "./PostAReview";
import RatingStars from "../../../components/RatingStar";

const ReviewsCard = ({ productReviews }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenReviewModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseReviewModal = () => {
        setIsModalOpen(false);
    };

    const reviews = productReviews || [];

    return (
        <div className="bg-white p-8 rounded-lg my-6">
            {/* Header */}
            <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>

            {/* Reviews */}
            <div>
                {reviews.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 h-52">
                        {reviews.map((review, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-6 shadow-sm bg-primary-light-light relative"
                            >
                                {/* Reviewer Info */}
                                <div className="flex items-center mb-4">
                                    <img
                                        src={CommentorIcon}
                                        alt="Reviewer"
                                        className="h-12 w-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="text-lg font-medium text-gray-800">
                                            {review.userId.username}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatDate(review.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    <RatingStars rating={review.rating} />
                                </div>

                                {/* Comment */}
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {review.comment}
                                </p>

                                {/* Google Icon (if needed) */}
                               
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews yet.</p>
                )}
            </div>

            {/* Add Comment Button */}
            <div className="mt-8 flex justify-center">
                <button
                    onClick={handleOpenReviewModal}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 transition flex items-center"
                >
                    <i className="ri-pencil-line mr-2"></i> Write a Review
                </button>
            </div>

            {/* PostAReview Modal */}
            <PostAReview
                isModalOpen={isModalOpen}
                handleClose={handleCloseReviewModal}
            />
        </div>
    );
};

export default ReviewsCard;
