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

  // go back previous page
  $("#back-btn").on('click', () => {
    console.log('clicked')
    window.history.back();
  });

  // this to to toggle edit page from input to a select
  $('.category').on('click', function() {
    $('.category').addClass('hide');
    $('.select').removeClass('hide');
  })
});


// class category
// class select
