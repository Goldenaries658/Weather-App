// Function to display weather info
function displayWeatherInfo(queryURL) {
  // Calling the Open Weather Map API for current info
  $.ajax({
    url: queryURL,
    method: 'GET',
    error: function (xhr, ajaxOptions, thrownError) {
      if (xhr.status == 400) {
        alert('400: Invalid Input.');
      } else if (xhr.status == 404) {
        alert('404: Not Found.');
      }
    },
  }).then(function (response) {
    // Saving to local storage and increasing index
    localStorage.setItem('lastSearch', queryURL);
    var alreadyInHistory = 0;
    for (i = 0; i < localStorage.length; i++) {
      var historyItem = localStorage.getItem(localStorage.key(i));
      if (queryURL == historyItem) {
        alreadyInHistory = 1;
      }
    }

    if (!alreadyInHistory) {
      var index = localStorage.getItem('index');
      localStorage.setItem(index, queryURL);
      localStorage.setItem('index', parseInt(index) + 1);
    }

    // Hiding the search box
    $('#search-form').hide();
    $('#show-search-button').show();

    // Setting all variables
    var name = response.name;
    var icon =
      'http://openweathermap.org/img/wn/' +
      response.weather[0].icon +
      '@2x.png';
    var temp = response.main.temp - 273.15;
    var humidity = response.main.humidity + '%';
    var windSpeed = response.wind.speed + ' m/s';

    // Setting Display values
    $('#city-name').text(name);
    $('#date').text(moment().format('MMMM Do YYYY, H:mm'));
    $('#weather-icon').attr('src', icon);
    $('#temp').text(temp.toFixed(2) + ' °C');
    $('#humidity').text('Humidity: ' + humidity);
    $('#wind-speed').text('Windspeed: ' + windSpeed);
    var uvQueryURL =
      'http://api.openweathermap.org/data/2.5/uvi?appid=23cadb273565bbb0f7aaa7a5b98a990a&lat=' +
      response.coord.lon +
      '&lon=' +
      response.coord.lat;

    $.ajax({
      url: uvQueryURL,
      method: 'GET',
    }).then(function (response) {
      var uvi = response.value
        $('#uv').text('UV Index: ' + uvi);
      
      if (uvi < 3) {
        $('#uv').css('color', 'green');
      } else if (uvi < 6) {
        $('#uv').css('color', 'yellow');
      } else if (uvi < 8) {
        $('#uv').css('color', 'orange');
      } else if (uvi < 11) {
        $('#uv').css('color', 'red');
      } else {
        $('#uv').css('color', 'violet');
      }
    });
  });
}

// Setting next 5 days forecast
function displayForecastInfo(fiveDayQueryURL) {
  $('#forecast-container').show();

  $.ajax({
    url: fiveDayQueryURL,
    method: 'GET',
  }).then(function (response) {
    // Looping through the forecast displays
    for (i = 0, a = 7; i < 5; i++, a += 8) {
      response.list[a];
      // Setting all variables
      var date = moment(response.list[a].dt_txt).format('MMMM Do YYYY');
      var icon =
        'http://openweathermap.org/img/wn/' +
        response.list[a].weather[0].icon +
        '@2x.png';
      var temp = response.list[a].main.temp - 273.15;
      var humidity = response.list[a].main.humidity + '%';
      var windSpeed = response.list[a].wind.speed + ' m/s';
      var uvQueryURL =
        'http://api.openweathermap.org/data/2.5/uvi/forecast?appid=23cadb273565bbb0f7aaa7a5b98a990a&lat=' +
        response.city.coord.lat +
        '&lon=' +
        response.city.coord.lon;

      // Setting Display values
      $('#forecast-date' + i).text(date);
      $('#forecast-weather-icon' + i).attr('src', icon);
      $('#forecast-temp' + i).text(temp.toFixed(2) + ' °C');
      $('#forecast-humidity' + i).text('Humidity: ' + humidity);
      $('#forecast-wind-speed' + i).text('Windspeed: ' + windSpeed);

      function uvIndex(i) {
        $.ajax({
          url: uvQueryURL,
          method: 'GET',
        }).then(function (response) {
          var uvi = response[i].value;
          var uvDisplay = '#forecast-uv' + i;
          $(uvDisplay).text('UV Index: ' + uvi);

          if (uvi < 3) {
            $(uvDisplay).css('color', 'green');
          } else if (uvi < 6) {
            $(uvDisplay).css('color', 'yellow');
          } else if (uvi < 8) {
            $(uvDisplay).css('color', 'orange');
          } else if (uvi < 11) {
            $(uvDisplay).css('color', 'red');
          } else {
            $(uvDisplay).css('color', 'violet');
          }
        });
      }
      uvIndex(i);
    }
  });
}

$(function () {
  // Setting an index for history entries.
  !localStorage.getItem('index') ? '' : localStorage.setItem('index', 0);

  $('#submit-button').on('click', function (event) {
    event.preventDefault();
    var city = $('#city-input').val();
    var queryURL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';
    var fiveDayQueryURL =
      'http://api.openweathermap.org/data/2.5/forecast?q=' +
      city +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';
    displayWeatherInfo(queryURL);
    displayForecastInfo(fiveDayQueryURL);
  });

  // Displaying search
  $('#show-search-button').on('click', function (e) {
    e.preventDefault();
    $('#search-form').show();
    $('#show-search-button').hide();
  });
  // Showing last search/history item on page load
  !localStorage.getItem('lastSearch')
    ? ''
    : displayWeatherInfo(localStorage.getItem('lastSearch'));
});
