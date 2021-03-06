/**
 * JQuery nok : minimal stackable notification plugin
 * 
 * @author effone <me@eff.one>
 * @copyright (c) 2018 effone
 * @license MIT <http://www.opensource.org/licenses/mit-license.php>
 * @version 1.0.1
 * @website https://eff.one
 * @since 2018-01-20
 * @update 2018-08-20
 */

(function ($) {
    $.nok = function (options) {
        var defaults = {
            message: '',    // The message to display
            type: 'info',   // Type of message : info / error / success
//          sticky: false,  // Stay or hide after sometimes, bool < DEPRECATED since 1.1.0, use stay: 0 to make a sticky
            stay: 4         // Seconds the message stays (since v.1.1.0 set this value to 0 to make sticky)
        };
        options = $.extend(defaults, options);
        // Backward compatibility
        if (options.sticky) {
            options.stay = 0;
        }
        var target = 'nok'; // Out of options as it is related to static id / class names in css file
        // Create message block only if there is message
        if ($.trim(options.message)) { // $.trim() for ie8 legacy support, can be used as options.message.trim()
            // Create container if not exists
            if ($("#" + target).length == 0) {
                $('body').append($('<div id="' + target + '"></div>'));
            }
            var msg = $('<div class="' + target + ' ' + target + '_' + options.type + '"><span>' + options.message + '</span></div>');
            $("#" + target).append($(msg));
            $(msg).animate({
                "right": "10px"
            }, "fast");
            if ($.isNumeric(options.stay) && options.stay > 0) {
                setInterval(function () {
                    wipe(msg);
                }, options.stay * 1000);
            }
        }
        $(document).on('click', '.' + target, function () {
            wipe(this);
        });

        function wipe(me) {
            $(me).animate({
                "right": "-300px"
            }, function () {
                $(me).slideUp('fast', function () { // Required for smooth transition of existing message blocks
                    $(me).remove();
                    if (!$.trim($('#' + target).html()).length) { // Remove container if no message block exists
                        $('#' + target).remove();
                    }
                });
            });
        }
    }
})(jQuery);
