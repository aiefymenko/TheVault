// show and hide password
$(document).ready(function() {

  // show and hide password on accounts page
  $('.eye-open').on('click', function() {
    const index = $(this).index('.eye-open');
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

});
