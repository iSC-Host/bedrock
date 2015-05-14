/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


;(function($) {
    'use strict';

    var $html = $('html');

    // Defined in global.js
    if (!isFirefox()) {
        $('#fx10-download').show();
    }

    $('#fx10-download .download-link').on('click', function(e) {
        var newTab = (this.target === '_blank' || e.metaKey || e.ctrlKey);
        var href = this.href;
        var callback = function() {
            window.location = href;
        };
        if (newTab) {
            window.dataLayer.push({
                event: 'firefox-downloads', 
                interaction: 'download click', 
                downloadVersion: window.site.platform
            });
        } else {
            e.preventDefault();
            window.dataLayer.push({
                event: 'firefox-downloads', 
                interaction: 'download click', 
                downloadVersion: window.site.platform, 
                eventCallback: callback
            });
        }
    });

    // Initialize the video
    // Defined in /js/base/firefox-anniversary-video.js
    Mozilla.FirefoxAnniversaryVideo.init({
        'deferEmbed': false,
        'onPlay': function() {
            Mozilla.FirefoxAnniversaryVideo.playEmbed();
            Mozilla.FirefoxAnniversaryVideo.setFooterButton('share');
            window.dataLayer.push({
                event: 'video-interaction',
                interaction: 'click to play',
                videoTitle: '10th Anniversary'
            });
        },
        'onComplete': function() {
            Mozilla.FirefoxAnniversaryVideo.setOverlayButtons('replay');
            Mozilla.FirefoxAnniversaryVideo.hideEmbed();
            window.dataLayer.push({
                event: 'video-interaction',
                interaction: 'Finish',
                videoTitle: '10th Anniversary'
            });
        }
    });

    // Autoplay if URL includes the proper hash and client is not a known mobile OS
    if (window.location.href.indexOf('#play') > -1 && !$html.hasClass('android') && !$html.hasClass('ios') && !$html.hasClass('fxos')) {
        Mozilla.FirefoxAnniversaryVideo.playEmbed();
        window.dataLayer.push({
            event: 'video-interaction',
            interaction: 'autoplay',
            videoTitle: '10th Anniversary'
        });
    }

})(window.jQuery);
