const { Feedback } = require('../models');

const feedbackData = [
    {
        review_text: 'They always helped me when I was stuck',
        instructor_id: 2,
        bootcamp_id: 2,
        user_id: 1,
        rating: 8
    },
    {
        review_text: 'Great bootcamp! Really learned a lot!',
        instructor_id: null,
        bootcamp_id: 1,
        user_id: 2,
        rating: 10
    },
    {
        review_text: 'Gave great advice for job searching',
        instructor_id: 4,
        bootcamp_id: null,
        user_id: 5,
        rating: 8
    },
    {
        review_text: 'Really fast pace, but fun course material.',
        instructor_id: null,
        bootcamp_id: 3,
        user_id: 3,
        rating: 6
    },
    {
        review_text: 'Very knowledgeable but never let me into the Zoom classes',
        instructor_id: 5,
        bootcamp_id: null,
        user_id: 4,
        rating: 7
    }
];

const seedFeedback = () => Feedback.bulkCreate(feedbackData);

module.exports = seedFeedback;