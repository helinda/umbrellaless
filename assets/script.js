var currentLocation = {};
var temperature = 0;
var feelslike = "";
var condition = "";
var foreCastIcon = "";

$(document).ready(function(){

	//alert(script2.currentLocation);


	function calculateMoodColor(temp) {
		var coldest = $.Color('rgba(178,208,255,1)');
		var warmest = $.Color('rgba(248,216,165,1)'); 
		if (temp < 30) {
			return coldest;
		}
		else if (temp > 90) {
			return warmest;
		} else if ((temp <= 30) && (temp >= 50)) {
			var tempShade = ((temp - 40)/50);
			var between = $.Color([141, 186, 255]).transition(warmest, tempShade);
			return between;	
		} else {
			var tempShade = ((temp - 20)/50);
			var between = $.Color([141, 186, 255]).transition(warmest, tempShade);
			return between;	
		}
	}

	$(window).load(function () {
	
		var parsedtemp = parseFloat(feelslike);
		var moodColor = calculateMoodColor(parsedtemp);
		//alert(feelslike);	
		$('#tophalf-container').delay(1200).animate({backgroundColor: moodColor}, 2000);
		$('#weather-content').delay(1200).fadeIn(1000);
		$('#logo-container').delay(300).fadeIn(1000);
		$('#slogan').delay(600).fadeIn(1000);
		$('#weather-container').delay(900).fadeIn(1000);
		$('#beginbutton').delay(1900).fadeIn(1000);
	});


	//alert("meow");

	function closeMainView() {
		$('#slogan').fadeOut(500);
		$('#bottomhalf-container').fadeOut(500);
		$('#logo-img').delay(400).animate({'max-height': '40px'}, 500);
		$('#logo-container').delay(400).animate({width: '290px'}, 500);
		$('#weather-container').fadeOut(500);
		$('#tophalf-container').delay(800).animate({height: '80px'},500);
		$('#tophalf').delay(800).animate({'padding-top': '24px'},500);
	}
	
	function openMainView() {
		$('#slogan').delay(1200).fadeIn(500);
		$('#bottomhalf-container').delay(800).fadeIn(500);
		$('#logo-img').delay(800).animate({'max-height': '60px'}, 500);
		$('#logo-container').delay(800).animate({width: '430px'}, 500);
		$('#weather-container').delay(1200).fadeIn(500);
		$('#tophalf-container').delay(400).animate({height: '450px'},500);
		$('#tophalf').delay(400).animate({'padding-top': '100px'},500);
	
	}

	function closeSearchResults() {
		$('#search-container').delay(200).fadeOut(400);
		$('#search-header').delay(200).fadeOut(400);
		$('#search-results').delay(200).fadeOut(400);
		$('#backbutton').delay(200).fadeOut(400);
		$('#morebutton').delay(200).fadeOut(400);


	}

	function generateNumber(length) {
		console.log(Math.floor(Math.random()*length));
		return (Math.floor(Math.random()*length));
	}

	function generateArray(length) {
		var num = new Array();
		num[0] = generateNumber(length);
		var i = 0;
		while (i<3) {
			var random = generateNumber(length);
			if ($.inArray(random, num) < 0) {
				num[i] = random;
				i += 1;
			}
		}
		return num;
	}

	function changeSearchResult(array, category) {
		$('#search-result1').text(category[array[0]]).delay(300).fadeIn(300);
		$('#search-result2').text(category[array[1]]).delay(600).fadeIn(300);
		$('#search-result3').text(category[array[2]]).delay(900).fadeIn(300);
	}

	function fadeOutSearchResults() {
		$('#search-result3').fadeOut(300);
		$('#search-result2').fadeOut(300);
		$('#search-result1').fadeOut(300);

	}

	function moreSearchResults() {
			$.getJSON("activities.json", function (data) {
			var numArray;
			if (condition == "Rain") {
				numArray = generateArray(data.category.rain.length);
				changeSearchResult(numArray, data.category.rain);
			} else if (temperature <= 30) {
				numArray = generateArray(data.category.thirtyless.length);
				changeSearchResult(numArray, data.category.thirtyless);
			} else if ((temperature > 30) && (temperature <= 60)) {
				numArray = generateArray(data.category.thirtytosixty.length);
				changeSearchResult(numArray, data.category.thirtytosixty);
			} else if ((temperature > 60) && (temperature <= 80)) {
				numArray = generateArray(data.category.sixtytoeighty.length);
				changeSearchResult(numArray, data.category.sixtytoeighty);
			} else {
				numArray = generateArray(data.category.eightyplus.length);
				changeSearchResult(numArray, data.category.eightyplus);
			}
		});	
	}


	function openSearchResults() {
		$('#search-container').delay(600).fadeIn(400);
		$('#search-header').delay(1300).fadeIn(400);
		$('#search-results').delay(1600).fadeIn(400);
		$('#backbutton').delay(2000).fadeIn(400);
		$('#morebutton').delay(2000).fadeIn(400);
		/*$.getJSON("activities.json", function (data) {
			var numArray;
			if (condition == "Rain") {
				numArray = generateArray(data.category.rain.length);
				changeSearchResult(numArray, data.category.rain);
			} else if (temperature <= 30) {
				numArray = generateArray(data.category.thirtyless.length);
				changeSearchResult(numArray, data.category.thirtyless);
			} else if ((temperature > 30) && (temperature <= 60)) {
				numArray = generateArray(data.category.thirtytosixty.length);
				changeSearchResult(numArray, data.category.thirtytosixty);
			} else if ((temperature > 60) && (temperature <= 80)) {
				numArray = generateArray(data.category.sixtytoeighty.length);
				changeSearchResult(numArray, data.category.sixtytoeighty);
			} else {
				numArray = generateArray(data.category.eightyplus.length);
				changeSearchResult(numArray, data.category.eightyplus);
			}
		});	*/
		window.setTimeout(moreSearchResults, 2000);
		//moreSearchResults();
	}


	$('#beginbutton').click(function() {
		closeMainView();
		openSearchResults();
	});

	$('#backbutton').click(function() {
		fadeOutSearchResults();
		closeSearchResults();
		openMainView();
	});

	$('#morebutton').click(function() {
		fadeOutSearchResults();
		window.setTimeout(moreSearchResults, 600);	
	});



	/** Extracts the location of the client.  Use wunderground API to get
	relevant information from the IP address. */
	function currentLocExtr(callback) {
		var locSourceFile = "http://api.wunderground.com/api/ff664deb7ce042a6/geolookup/q/autoip.json";
		return $.ajax({
	  		url : locSourceFile,
	  		dataType : "jsonp"
		}).done(function(d) {
			callback(d.location.city, d.location.state);
			currentCondition(currentLocation.city, currentLocation.state, record);
			foreCast(currentLocation.city, currentLocation.state, forecasticon);
			$("#location").text(currentLocation.city + ", " + currentLocation.state);
			//$('#weather-img').html("<img src='http://icons-ak.wxug.com/i/c/k/"+foreCastIcon+".gif '/>");
		});
	}

	function nameCityState(city, state) {
		currentLocation.city = city;
		currentLocation.state = state;
	}
	currentLocExtr(nameCityState);

	//delay(400).alert(foreCastIcon);

});

	
function currentCondition(city, state, callback) {
		if (/\s/.test(city)) {
			city = city.replace(" ", "_");
		}
		var condFile = "http://api.wunderground.com/api/ff664deb7ce042a6/conditions/q/" + state + "/" + city + ".json";
		return $.ajax({
	  		url : condFile,
	  		dataType : "jsonp"
		}).done(function(data) {
			var t = data.current_observation.temp_f;
			var feels = data.current_observation.feelslike_f;
			var cond = data.current_observation.weather;
			callback(t, feels, cond);
			$('#weather-temp').html("currently feels like <div id='emboldened'>"+feelslike+" <sup>o</sup> F</div>");
			$('#emboldened').css('font-size', '25px').css('letter-spacing', '-1.25px');
			//alert(feelslike);
	
			//$("#feelgoodz").text("Temperature: " + temperature + "Feels Like: " + feelslike + "Condition: " + condition);
		});
	}

function record(t, feels, cond) {
	temperature = t;
	feelslike = feels;
	condition = cond;
}

function foreCast(city, state, callback) {
	if (/\s/.test(city)) {
		city = city.replace(" ", "_");
	}
	var foreFile = "http://api.wunderground.com/api/ff664deb7ce042a6/forecast/q/" + state + "/" + city +".json";
	return $.ajax({
		url : foreFile,
		dataType : "jsonp"
	}).done(function(data) {
		var forecast = data.forecast.txt_forecast.forecastday[0].icon;
		//alert(forecast);
		callback(forecast);
		$('#weather-img').html("<img id = 'weather-icon-img' src='http://icons-ak.wxug.com/i/c/k/"+foreCastIcon+".gif '/>");	

	//$('#logo-img').delay(400).animate({'max-height': '40px'}, 500);

		//alert(foreCastIcon);
		//$("#weather-img").html("meow!");

		
	});
}


function forecasticon(f) {
	foreCastIcon = f;
}



