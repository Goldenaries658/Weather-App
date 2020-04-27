var index = parseInt(localStorage.getItem('index'));

$(function () {
  // Filling out history on page load
  for (i = 0; i < index; i++) {
    var historyItem =
      '<a href="#" class="history-item list-group-item list-group-item-action">' +
      localStorage.getItem(i) +
      '<i class="far fa-trash-alt" value=' +
      i +
      '></i></a>';
    $('#history-list').append(historyItem);
  }

  // Loading history items on click
  $('.history-item').on('click', function () {
    var selection = $(this).text();
    var queryURL =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      selection +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';
    var forecastQueryURL =
      'https://api.openweathermap.org/data/2.5/forecast?q=' +
      selection +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';

    localStorage.setItem('lastSearch', queryURL);
    localStorage.setItem('lastForecast', queryURL);
    location.href = 'index.html';
  });

  // Deleting history items
  $('i').on('click', function (e) {
    e.stopPropagation();

    // Removing row from table
    var row = $(this).parent();
    row.hide(500);

    // Getting value attr to locate item in history
    var historyKey = parseInt($(this).attr('value'));

    // Using a for loop to shift rest of history up a number
    for (i = historyKey, a = historyKey + 1; a < index; i++, a++) {
      localStorage.setItem(i, localStorage.getItem(a));
    }

    // Removing the now repeated bottom entry
    localStorage.removeItem(index - 1);

    // reduce index by 1
    index--;
    localStorage.setItem('index', index);
  });
});
