var router = require('express')
	.Router();
var Promise = require('bluebird');
var models = require('../models')
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Place = models.Place;

router.get('/', function (req, res, next) {
	Promise.all([
    Hotel.findAll({
				include: [Place]
			}),
    Restaurant.findAll({
				include: [Place]
			}),
    Activity.findAll({
				include: [Place]
			})
  ])
		.spread(function (hotels, restaurants, activities) {
			res.render('index', {
				hotels: hotels,
				restaurants: restaurants,
				activities: activities
			});
		})
		.catch(next);
});

module.exports = router;
