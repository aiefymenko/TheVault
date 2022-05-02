// show and hide password

$('.eye-open').on('click', function() {
  const index = $(this).index('.eye-open');
  console.log('index:', index)
  $('.eye-open').eq(index).addClass('hide');
  $('.eye-closed').eq(index).removeClass('hide');
  $('.hidden-pw').eq(index).addClass('hide');
  $('.visiable-pw').eq(index).removeClass('hide');
})

$('.eye-closed').on('click', function() {
  const index = $(this).index('.eye-closed');
  $('.eye-closed').eq(index).addClass('hide');
  $('.eye-open').eq(index).removeClass('hide');
  $('.visiable-pw').eq(index).addClass('hide');
  $('.hidden-pw').eq(index).removeClass('hide');
})
