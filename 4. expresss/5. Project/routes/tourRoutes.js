const express = require('express');
const { getAllTours, createTour, getOneTour, patchTour, deleteTour, aliasTopTours, tourStats } = require('../controllers/toursController');
const router = express.Router();

// Param Middleware
// router.param("id", (req, res, next, val) => {
//     console.log("Tour id is:", val);
//     next();
// })

// router.param("id", checkId)



router
    .route("/")
    .get(getAllTours)
    .post(createTour)

router
    .route("/top-5-cheap")
    .get(aliasTopTours, getAllTours);


router
    .route("/tour-stats")
    .get(tourStats)
router
    .route("/:id")
    .get(getOneTour)
    .patch(patchTour)
    .delete(deleteTour)


module.exports = router;