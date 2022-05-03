$(document).ready(function() {

  $('.tab-panel .tabs li').on('click', function() {
    // checks for the tab icon clicked
    const visiableTab = $(this).attr('class');
    alert(visiableTab)

    //loops through all cards
    $('.cards').each(function() {
       // finds the index of each card
      const index = $(this).index('.cards');

      if (visiableTab === All) {
        $('.cards').eq(index).addClass('show');
      }

      //finds the card from the index id
      if($('.cards').eq(index).attr('id') === visiableTab) {
        $('.cards').eq(index).addClass('show');
      } else {
        $('.cards').eq(index).addClass('hide');
      }
    })

  })

});
