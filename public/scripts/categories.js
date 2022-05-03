$(document).ready(function() {

  $('.tab-panel .tabs li').on('click', function() {

    // checks for the tab icon clicked
    const visiableTab = $(this).attr('class');

    //loops through all cards
    $('.cards').each(function() {
       // finds the index of each card
      const index = $(this).index('.cards');

      //finds the card from the index id
      if($('.cards').eq(index).attr('id') === visiableTab) {
        $('.cards').eq(index).removeClass('hide');
      } else {
        $('.cards').eq(index).addClass('hide');
      }
    })

    // this show which tab is active
    $('.tab-panel .tabs li.active').removeClass('active');
    $(this).addClass('active');

    // to show all accounts
    if(visiableTab === 'All') {
      $('.cards').removeClass('hide');
    }

  })

});
