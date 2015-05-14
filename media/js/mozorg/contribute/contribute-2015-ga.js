/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

$(function () {
    'use strict';

    // Track clicks in main navigation
    $('#contribute-nav-menu li a').attr('data-element-location', 'nav');

    if ($('body').prop('id') === 'landing') {
        // Track user scrolling through each section on the landing page
        $('#landing .section').waypoint(function(direction) {
            if (direction === 'down') {
                var sectionclass = $(this).prop('class');
                window.dataLayer.push({event: 'scroll-tracking', section: sectionclass});
            }
        }, { offset: '100%' });

        // Track CTA clicks on landing
        $('#landing .cta a').on('click', function(e) {
            var position = $(this).data('position');
            var label = $(this).data('label');
            var newTab = (this.target === '_blank' || e.metaKey || e.ctrlKey);
            var href = this.href;
            var callback = function() {
                window.location = href;
            };
            if (newTab) {
                window.dataLayer.push({
                    event: 'contribute-landing-interactions',
                    browserAction: position,
                    location: label
                });
            } else {
                e.preventDefault();
                window.dataLayer.push({
                    event: 'contribute-landing-interactions',
                    browserAction: position,
                    location: label,
                    eventCallback: callback
                });
            }
        });
    }

    // Track video plays
    $('a.video-play').on('click', function() {
        var linktype = $(this).data('linktype');
        window.dataLayer.push({
            event: 'contribute-landing-interactions',
            browserAction: 'Video Interactions',
            location: linktype
        });
    });

    // Track Mozillian story clicks on the landing page
    $('.landing-stories .person .url').on('click', function(e) {
        var person = $(this).parents('.person').find('.fn').text();
        var newTab = (this.target === '_blank' || e.metaKey || e.ctrlKey);
        var href = this.href;
        var callback = function() {
            window.location = href;
        };

        if (newTab) {
            window.dataLayer.push({
                event: 'contribute-landing-interactions',
                browserAction: 'How Mozillians Help Every Day',
                location: person
            });
        } else {
            e.preventDefault();
            window.dataLayer.push({
                event: 'contribute-landing-interactions',
                browserAction: 'How Mozillians Help Every Day',
                location: person,
                eventCallback: callback
            });
        }
    });

    // Track Mozillian story clicks on story pages
    $('.stories-other .person .url').on('click', function(e) {
        var person = $(this).parents('.person').find('.fn').text();
        var newTab = (this.target === '_blank' || e.metaKey || e.ctrlKey);
        var href = this.href;
        var callback = function() {
            window.location = href;
        };
        if (newTab) {
            window.dataLayer.push({
                event: 'mozillian-stories-interaction',
                browserAction: 'Meet a few more Mozillians',
                location: person
            });
        } else {
            e.preventDefault();
            window.dataLayer.push({
                event: 'mozillian-stories-interaction',
                browserAction: 'Meet a few more Mozillians',
                location: person,
                eventCallback: callback
            });
        }
    });

    // Track Twitter hashtag clicks on story pages
    $('.stories-other .section-tagline a').on('click', function(e) {
        var newTab = (this.target === '_blank' || e.metaKey || e.ctrlKey);
        var href = this.href;
        var callback = function() {
            window.location = href;
        };

        if (newTab) {
            window.dataLayer.push({
                event: 'mozillian-stories-interaction',
                browserAction: 'twitter search link',
                location: '#IAmAMozillian'
            });
        } else {
            e.preventDefault();
            window.dataLayer.push({
                event: 'mozillian-stories-interaction',
                browserAction: 'twitter search link',
                location: '#IAmAMozillian',
                eventCallback: callback
            });
        }
    });

    // Track Mozillian personal links
    $('.story-links a').on('click', function(e) {
        var person = $('.story-title .name').text();
        var link = $(this).prop('class');
        var href = this.href;
        var callback = function() {
            window.open(href);
        };

        e.preventDefault();
        window.dataLayer.push({
            event: 'mozillian-stories-interaction',
            browserAction: 'social button click',
            location: person + ' - ' + link,
            eventCallback: callback
        });
    });

    // Track other actions on landing page
    $('.landing-notready .other-actions a')
        .attr('data-element-location', 'not ready');

    // Track other actions on confirmation page
    $('#thankyou .other-actions a').on('click', function(e) {
        var label = $(this).data('label');
        var href = this.href;
        var callback = function() {
            window.open(href);
        };

        e.preventDefault();
        window.dataLayer.push({
            event: 'contribute-confirmation-interaction',
            location: 'Other Ways to Support Mozilla',
            browserAction: label,
            eventCallback: callback
        });
    });

    // Track Mozillians signup CTA on confirmation page
    $('.cta-mozillians a').on('click', function(e) {
        var newTab = (this.target === '_blank' || e.metaKey || e.ctrlKey);
        var href = this.href;
        var callback = function() {
            window.location = href;
        };

        if (newTab) {
            window.dataLayer.push({
                event: 'contribute-confirmation-interaction',
                location: 'Mozillians CTA click',
                browserAction: 'Yes, Create My Mozillians Account'
            });
        } else {
            e.preventDefault();
            window.dataLayer.push({
                event: 'contribute-confirmation-interaction',
                location: 'Mozillians CTA click',
                browserAction: 'Yes, Create My Mozillians Account',
                eventCallback: callback
            });
        }
    });

    // Track event links in the list
    $('.events-table .event-name a').attr('data-link-type', 'event');

    // Track event links in the footer
    $('.contrib-extra .event-link').attr('data-element-location', 'bottom');

    // Track 'all events' link in the footer
    $('.contrib-extra .events-all a').attr({'data-element-location': 'bottom','data-element-action': 'See All Events'});

    // Track external links in the footer
    $('.extra-links a').attr('data-element-location', 'bottom');

    // Track category clicks on the signup page
    $('.option input').on('change', function() {
        window.dataLayer.push({
            event: 'contribute-signup-interaction', 
            interaction: 'Category',
            contributeCategory: this.value
        });
    });

    // Track category area selections
    $('.area select').on('change', function() {
        window.dataLayer.push({
            event: 'contribute-signup-interaction', 
            interaction: 'Area',
            contributeArea: this.value
        });
    });

    // Track signup form submissions
    $('#inquiry-form').on('submit', function(e) {
        e.preventDefault();
        var form = $(this);
        var newsletterstate;

        if ($('#id_newsletter').is(':checked')) {
            newsletterstate = 'True';
        } else {
            newsletterstate = 'False';
        }

        form.off('submit');
        
        window.dataLayer.push({
            event: 'contribute-signup-submit',
            contributeNewsletter: newsletterstate,
            contributeArea: form.find('input[name="category"]').val(),
            contributeCategory: form.find('.area:visible select').val(),
            eventCallback: function() {
                form.submit();
            }
        });
    });

});
