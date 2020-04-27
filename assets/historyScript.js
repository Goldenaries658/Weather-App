var index = parseInt(localStorage.getItem('index'));

$(function () {
  for (i = 0; i < index; i++) {
    var historyItem =
      `<a href=\"#\" class=\"history-item list-group-item list-group-item-action\">${localStorage.getItem(i)}<i class=\"far fa-trash-alt\"></i></a>`;
    $('#history-list').append(historyItem);
  }

  $('.history-item').on('click', function () {
    var selection = $(this).text();
    var queryURL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      selection +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';
    var forecastQueryURL =
      'http://api.openweathermap.org/data/2.5/forecast?q=' +
      selection +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';

    localStorage.setItem('lastSearch', queryURL);
    localStorage.setItem('lastForecast', queryURL);
    location.href = 'index.html';
  });
});
