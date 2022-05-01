// show and hide password

$('.eye-open').on('click', () => {
  $('.eye-open').addClass('hide');
  $('.eye-closed').removeClass('hide');
  $('.hidden-pw').addClass('hide');
  $('.visiable-pw').removeClass('hide');
});

$('.eye-closed').on('click', () => {
  $('.eye-closed').addClass('hide');
  $('.eye-open').removeClass('hide');
  $('.visiable-pw').addClass('hide');
  $('.hidden-pw').removeClass('hide');
});

// hide generate Password buttons

$('#generate-new').on('click', () => {
  alert('click')
  $('#generate-new').addClass('hide');
})
