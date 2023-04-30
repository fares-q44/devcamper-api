const Review = require('../models/Review');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// @desc Get Reviews
// @route GET /api/v1/courses/bootcamps/:bootcampId/reviews || /api/v1/reviews/
// @access public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({
      bootcamp: req.params.bootcampId,
    });
    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
// @desc Get single review
// @route GET /api/v1/reviews/:id
// @access public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });
  if (!review) {
    next(
      new ErrorResponse(`Review not found with the id ${req.params.id}`, 404)
    );
  } else {
    res.status(200).json({
      success: true,
      data: review,
    });
  }
});

// @desc Create new Review
// @route POST /api/v1/bootcamps/:bootcampId/reviews
// @access Private
exports.createReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with the id ${req.params.bootcampId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);
  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc Update Review
// @route PUT /api/v1/reviews/:id
// @access Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErrorResponse(`Review not found with the id ${req.params.id}`, 404)
    );
  }
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `user with the id ${req.user.id} is not authorized to update a Review  ${review._id} `,
        401
      )
    );
  }
  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    data: review,
  });
});
// @desc Delete Review
// @route DELETE /api/v1/reviews/:id
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  if (!review) {
    return next(
      new ErrorResponse(`review not found with the id ${req.params.id}`, 404)
    );
  }
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `user with the id ${req.user.id} is not authorized to delete review  ${review._id} `,
        401
      )
    );
  }
  review = await Review.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    data: {},
  });
});
