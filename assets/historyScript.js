var index = parseInt(localStorage.getItem('index'));

$(function () {
  for (i = 0; i < index; i++) {
    var historyItem =
      '<li class="list-group-item d-flex justify-content-between align-items-center">' +
      localStorage.getItem(i) +
      '</li>';
    $('#history-list').append(historyItem);
  }
});
