$(document)
	.ready(function () {
		var itinerary = {
			1: {
				status: true,
			},
		};
		var currentMap = initializeMap();

		function makeOptions(data, id) {
			data.forEach(function (item) {
				$(id)
					.append("<option>" + item.name + "</option>")
			})
		}
		makeOptions(hotels, "#hotel-choices");
		makeOptions(restaurants, "#restaurant-choices");
		makeOptions(activities, "#activity-choices");

		function findPlace(name, database) {
			var location;
			database.forEach(function (place) {
				if(place.name === name) {
					location = place.place.location;
				}
			})
			return location;
		}


		function findStatus() {
			var allDays = Object.keys(itinerary)
			var day;
			allDays.forEach(function (eachDay) {
				if(itinerary[eachDay].status === true) {
					day = eachDay;
				}
			})
			return day;
		}

		function addChoice(addButtonId, optionId, planId, iconCategory, database) {
			$(addButtonId)
				.on("click", function () {
					var item = $(optionId)
						.val();
					var finalChoice = "<span class='title'>" + item + "<button class='btn btn-xs btn-danger remove btn-circle'>x</button></span>"
					$(planId)
						.append(finalChoice);
					var coords = findPlace(item, database);
					drawMarker(iconCategory, coords, currentMap);
					var day = findStatus();
					itinerary[day][item] = coords;
				})
		}
		addChoice("#hotel-add", "#hotel-choices", "#my-hotel", "hotel", hotels);
		addChoice("#restaurant-add", "#restaurant-choices", "#my-restaurant", "restaurant", restaurants);
		addChoice("#activity-add", "#activity-choices", "#my-activity", "activity", activities);

		$("body")
			.on("click", ".remove", function () {
				var placeName = $(this)
					.closest(".title")
					.text()

				$(this)
					.closest(".title")
					.remove();

				var day = findStatus(); //returns a number with the day
				var coords = itinerary[day][placeName] //array of coords
				removeMarker(coords);
			})

		$('#day-add')
			.on('click', function () {
				var dayNumber = Object.keys(itinerary)
					.length + 1;
				itinerary[dayNumber] = {};
				var dayId = dayNumber.toString();
				$('<button class="btn btn-circle day-btn day" id=' + dayId + '>' + dayNumber + '</button>')
					.insertBefore('#day-add');
			})

		$(".day-buttons")
			.on("click", ".day", function () {
				var allDays = Object.keys(itinerary)
				allDays.forEach(function (day) {
					itinerary[day].status = false;
				})
				var id = $(this)
					.attr("id");
				$("#dayNum")
					.html("Day " + id)

				itinerary[+id].status = true;


			})

	})
