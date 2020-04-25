$(function () {
  $('#submit-button').on('click', function (event) {
    event.preventDefault();
    var city = $('#city-input').val();
    var queryURL =
      'http://api.openweathermap.org/data/2.5/weather?q=' +
      city +
      '&appid=23cadb273565bbb0f7aaa7a5b98a990a';

    $.ajax({
      url: queryURL,
      method: 'GET',
      error: function (xhr, ajaxOptions, thrownError) {
        if (xhr.status == 400){
            alert('400: Invalid Input.')
        } else if(xhr.status == 404) {
            alert('404: Not Found.')
        }
      },
    }).then(function (response) {
      console.log(response);
    });
  });
});
