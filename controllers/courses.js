const Course = require('../models/Course');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// @desc Get all courses
// @route GET /api/v1/courses/bootcamps/:bootcampId/courses || /api/v1/courses/
// @access public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({
      bootcamp: req.params.bootcampId,
    });
    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
// @desc Get single course
// @route GET /api/v1/courses/:id
// @access public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });
  if (!course) {
    next(
      new ErrorResponse(`Course not found with the id ${req.params.id}`, 404)
    );
  } else {
    res.status(200).json({
      success: true,
      data: course,
    });
  }
});
// @desc Create new Course
// @route POST /api/v1/bootcamps/:bootcampId/courses
// @access Private
exports.createCourse = asyncHandler(async (req, res, next) => {
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
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `user with the id ${req.user.id} is not authorized to create a course to bootcamp ${bootcamp._id} `,
        401
      )
    );
  }
  const course = await Course.create(req.body);
  res.status(201).json({
    success: true,
    data: course,
  });
});
// @desc Update Course
// @route PUT /api/v1/courses/:id
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`course not found with the id ${req.params.id}`, 404)
    );
  }
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `user with the id ${req.user.id} is not authorized to update a course  ${course._id} `,
        401
      )
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({
    success: true,
    data: course,
  });
});
// @desc Delete Course
// @route DELETE /api/v1/courses/:id
// @access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`course not found with the id ${req.params.id}`, 404)
    );
  }
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `user with the id ${req.user.id} is not authorized to delete course  ${course._id} `,
        401
      )
    );
  }
  course = await Course.findByIdAndDelete(req.params.id);
  res.status(201).json({
    success: true,
    data: {},
  });
});
