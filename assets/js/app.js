
// any CSS you require will output into a single css file (app.css in this case)
require('../css/global.scss');
require('../css/dark-theme.scss');

require('webpack-jquery-ui');
require('bootstrap');
require('bootstrap4-toggle');
require('webpack-jquery-ui/css');
$(document).ready(function() {

  /*
   * ****************
   *   AUTOCOMPLETE
   * ****************
   */
  var autocompleteInput = $('.autocomplete');
  var url = autocompleteInput.data('url');
  autocompleteInput.autocomplete({
      source: url,
      select: function( event, ui ) {
        var url = ui.item['value'];
        window.location.href = url;
        return false;
      },
      focus: function(event, ui) {
        this.value = ui.item['label'];
        return false;
      }
  });


/*
 * ****************
 *   COPY BUTTON
 * ****************
 */
  $('.copy').click(function() {
    var text = $(this).parent().find('.js-verb').text();
    if (!navigator.clipboard) {
      $(this).parent().find('.js-verb').focus().select();
      try {
        var successful = document.execCommand('copy');
        if(successful) {
          displayMessage('Eilet eo bet ar verb displeget er golver!', 'ok');
        } else {
          displayMessage('Fazi en ur eilañ ar verb displeget er golver', 'error');
        }
      } catch (err) {
        displayMessage('Fazi en ur eilañ ar verb displeget er golver', 'error');
      }
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      displayMessage('Eilet eo bet ar verb displeget er golver!', 'ok');
    }, function(err) {
      displayMessage('Fazi en ur eilañ ar verb displeget er golver', 'error');
    });
  });

  $('.copy-tense').click(function() {
    var text = $(this).closest('.js-tense').find('.js-tense-content').text().trim();
    console.log("text to be copied: " + text);
    if (!navigator.clipboard) {
      $(this).closest('.js-tense').find('.js-tense-content').focus().select();
      try {
        var successful = document.execCommand('copy');
        if(successful) {
          displayMessage('Eilet eo bet ar verb displeget er golver!', 'ok');
        } else {
          displayMessage('Fazi en ur eilañ ar verb displeget er golver', 'error');
        }
      } catch (err) {
        displayMessage('Fazi en ur eilañ ar verb displeget er golver', 'error');
      }
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      displayMessage('Eilet eo bet ar verb displeget er golver!', 'ok');
    }, function(err) {
      displayMessage('Fazi en ur eilañ ar verb displeget er golver', 'error');
    });
  });

  /*
   * ***********
   *   MESSAGE
   * ***********
   */
  $('.message').click(function() {
    $(this).slideUp();
  });

  $('.missing_translation_notice').click(function() {
    $('.missing_translation_form').slideToggle();
  });

  $('.report-button').click(function() {
    $('.report_error').slideToggle();
  });

  /*
   * ************************
   *   CONTACT FORM SENDING
   * ************************
   */
  $('.js-contact-form').submit(function() {
    $.post(
        $(this).attr('action'),
        $(this).serialize(),
        function(data) {
          if (data.result == 'ok') {
            displayMessage('Kaset eo bet ar gemennadenn gant berzh!', 'ok');
            $('.js-contact-form input').val('');
            $('.missing_translation_form').slideUp();
          } else {
            displayMessage('Degouezhet ez eus bet ur fazi en ur gas ar gemennadenn, klaskit en-dro mar plij', 'error');
          }
        }
    );
    return false;
  });

  $('.js-view_more').click(function() {
    $('.js-translations').slideToggle();
  });

  /*
   * ***********************
   *   SWITCH TO DARK MODE
   * ***********************
   */
  $('.dark-mode-switch').on('change', function() {
    if(this.checked) {
      trans();
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      trans();
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });



  let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transition');
    }, 1000)
  }

  // makes sure the button is in the correct state when it's loaded
  if(localStorage.getItem('theme') === 'dark'){
    $('.dark-mode-switch').bootstrapToggle('on');
  }

});


function displayMessage(message, type) {
  var messageContainer = $('.message');
  if(messageContainer.hasClass('error')) {
      messageContainer.removeClass('error');
  }
  if(messageContainer.hasClass('ok')) {
      messageContainer.removeClass('ok');
  }
  messageContainer.addClass(type);
  messageContainer.text(message);
  messageContainer.slideDown();
  setTimeout(slideUpMessage, 2000);
}

function slideUpMessage()
{
  $('.message').slideUp();
}
