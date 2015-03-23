
$(function() {
    // Setup the player to autoplay the next track
    var a = audiojs.createAll({ // audiojs.createAll is a function that creates audiojs instances for each <audio> tag in the dom. It takes two arguments; options, and elements. the latter is optional. The shit in the curly braces is the "options".
        trackEnded: function() {  //  This will be applied to every instance of audiojs on the page. On trackEnded, finds the next (ol li), wrapping if needed, and marks it as playing.
            var next = $('ol li.playing').next(); // Using ol li to identify the playlist elements. .playing to find the current one. Note that each <li> contains an <a data-source="foo"/>.
            if (!next.length) next = $('ol li').first(); // wrap  at end of playlist.
            next.addClass('playing').siblings().removeClass('playing'); // now we have 'next', update 'playing'.
            audio.load($('a', next).attr('data-src')); // load hella what? i get next.attr, but why $('a', next)?
            audio.play();
        }
    });

    // Load in the first track
    var audio = a[0]; // a selected all audiojs instances. in this case there's one, so audio is it.
    first = $('ol a').attr('data-src');
    $('ol li').first().addClass('playing'); //initialize the first wait WHAT?? yes first() gets the first 'ol li'.
    audio.load(first); // noidea.

    // Load in a track on click
    $('ol li').click(function(e) { // e is the event. we need it for below.
        e.preventDefault();  // don't execute the <a> link.
        $(this).addClass('playing').siblings().removeClass('playing'); // 'li' gets the class.
        audio.load($('a', this).attr('data-src'));
        audio.play();
    });
    // Keyboard shortcuts
    $(document).keydown(function(e) {
        var unicode = e.charCode ? e.charCode : e.keyCode;
        // right arrow
        if (unicode == 39) {
            var next = $('li.playing').next();
            if (!next.length) next = $('ol li').first();
            next.click();
            // back arrow
        } else if (unicode == 37) {
            var prev = $('li.playing').prev();
            if (!prev.length) prev = $('ol li').last();
            prev.click();
            // spacebar
        } else if (unicode == 32) {
            audio.playPause();
        }
    })
});
    