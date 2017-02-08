const $cats = $('.cat');
const $buttons = $('button');

function hideAllCats() {
  for (let i = 0; i < $cats.length; i++) {
    $($cats[i]).hide();
  }
}

function bindButtonToCat(idNumber) {
  $('#button' + idNumber).click(function () {
    hideAllCats();
    $('#cat' + idNumber).show();
  });
}

function bindCounterToCat(idNumber) {
  const cat = '#cat' + idNumber;
  $(cat).click(function () {
    let count = $(cat + ' > .counter').text();
    count = parseInt(count) + 1;
    $(cat + ' > .counter').text(count);
  });
}

for (let i = 1; i <= $buttons.length; i++) {
  bindButtonToCat(i);
}

for (let i = 1; i <= $cats.length; i++) {
  bindCounterToCat(i);
}

hideAllCats();
$('#cat1').show();
