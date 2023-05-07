const express = require('express');
const { getAllTours, createTour, getOneTour, patchTour, deleteTour } = require('../controllers/toursController');
const router = express.Router();



router
    .route("/")
    .get(getAllTours)
    .post(createTour)

router
    .route("/:id")
    .get(getOneTour)
    .patch(patchTour)
    .delete(deleteTour)


module.exports = router;