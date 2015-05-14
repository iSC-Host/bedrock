/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function () {
    'use strict';

    var $largeTile;
    var $largeTileParent;
    var $smallTile;
    var $smallTileParent;
    var $faces;
    var $tweets;
    var $mainNav;
    var promoClass;

    // Set Up data-attr for consumption by GTM

    // promo tiles
    $largeTile = $('.promo-large-portrait > a.panel-link, .promo-large-landscape > a.panel-link');
    $largeTileParent = $largeTile.parent();
    promoClass = $largeTileParent.hasClass('promo-large-portrait') ? 'portrait' : 'landscape';
    $largeTile.attr({
        'data-promotion-id': $largeTileParent.prop('id'),
        'data-promotion-name': $largeTileParent.data('name'),
        'data-promotion-class': 'promo-large-' + promoClass,
        'data-promotion-type': 'tile'
    });

    $smallTile = $('.promo-small-landscape > a.panel-link');
    $smallTileParent = $smallTile.parent();
    $smallTile.attr({
        'data-promotion-id': $smallTileParent.prop('id'),
        'data-promotion-name': $smallTileParent.data('name'),
        'data-promotion-class': 'promo-small-landscape',
        'data-promotion-type': 'tile'
    });

    $faces = $('.promo-face > a');
    $faces.attr({
        'data-promotion-id': $faces.parent().prop('id'),
        'data-promotion-name': 'Mozillians',
        'data-promotion-class': 'promo-face',
        'data-promotion-type': 'tile'
    });

    $tweets = $('.twt-actions > a');
    $tweets.attr({
        'data-promotion-id': $tweets.parent().closest('li').prop('id'),
        'data-promotion-name': 'Mozilla Tweets ' + $tweets.attr('title'),
        'data-promotion-class': 'promo-small-landscape',
        'data-promotion-type': 'tile'
    });

    //generic links
    $mainNav = $('#nav-main-menu li a');
    $mainNav.attr({
        'data-element-location': 'nav click',
        'data-link-type': $mainNav.data('name')
    });

    $('#upcoming-events a').attr({
        'data-element-location': 'Upcoming Event Link Clicks',
        'data-link-type': 'href'
    });

    $('.contribute-btn').attr({
        'data-element-location': 'button-click',
        'data-link-type': 'Get Involved with Mozilla today'
    });
    
    $('#secondary-links a').attr({
        'data-element-location': 'Secondary Link Clicks',
        'data-link-type': 'href'
    });

    // track user scrolling through each section down the page
    $('.module').waypoint(function(direction) {
        if (direction === 'down') {
            var id = $(this).prop('id');
            window.dataLayer.push({event: 'scroll-tracking', section: id});
        }
    }, { offset: '100%' });

    // track download firefox promo clicks
    $('.promo-small-landscape.firefox-download a.download-link').on('click', function(e) {
        var $this = $(this);
        var $promo = $this.closest('.promo-small-landscape');
        var isAndroid = $promo.find('li.os_android:visible').length > 0;
        var type = isAndroid ? 'Firefox Android' : 'Firefox Desktop';
        var newTab = (this.target === '_blank' || e.metaKey || e.ctrlKey);
        var href = this.href;
        var callback = function() {
            window.location = href;
        };

        var tilePosition = $promo.prop('id');
        var tileSize = 'promo-small-landscape';

        if (newTab) {
            window.dataLayer.push({event: 'firefox-downloads', interaction: 'download click - top', downloadVersion: type, tilePosition: tilePosition, tileSize: tileSize});
        } else {
            e.preventDefault();
            window.dataLayer.push({event: 'firefox-downloads', interaction: 'download click - top', downloadVersion: type, tilePosition: tilePosition, tileSize: tileSize, eventCallback: callback});
        }
    });

    // track Firefox download section button clicks
    $('#firefox-download-section a.download-link').on('click', function(e) {
        var $this = $(this);
        var isAndroid = $this.parent().hasClass('os_android');
        var type = isAndroid ? 'Firefox Android' : 'Firefox Desktop';
        var newTab = (this.target === '_blank' || e.metaKey || e.ctrlKey);
        var href = this.href;
        var callback = function() {
            window.location = href;
        };

        if (newTab) {
            window.dataLayer.push({event: 'firefox-downloads', interaction: 'download click - primary', downloadVersion: type});
        } else {
            e.preventDefault();
            window.dataLayer.push({event: 'firefox-downloads', interaction: 'download click - primary', downloadVersion: type, eventCallback: callback});
        }
    });

});
