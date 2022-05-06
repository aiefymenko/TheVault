$(document).ready(function() {


  $('li').on('click', function() {

    // checks for the tab icon clicked
    const visiableTab = $(this).attr('class');
    $('.which-tab').text(visiableTab)

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

     // to show all accounts
      if(visiableTab === 'All') {
        $('.cards').removeClass('hide');
      }
    })

    // show other accounts
    if(visiableTab === 'Other') {
      // Have to loop through again to get index all over again
      $('.cards').each(function() {
        const index = $(this).index('.cards');
        // checks if card is other then any tab on top
        if($('.cards').eq(index).attr('id') !== 'Social' && $('.cards').eq(index).attr('id') !== 'Shopping'&& $('.cards').eq(index).attr('id') !== 'Email' && $('.cards').eq(index).attr('id') !== 'Streaming' && $('.cards').eq(index).attr('id') !== 'Education') {
          $('.cards').eq(index).removeClass('hide');
        } else {
          $('.cards').eq(index).addClass('hide');
        }
      })
    }

  })

});
