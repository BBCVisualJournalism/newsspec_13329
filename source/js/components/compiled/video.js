/** @jsx React.DOM */
define([
    'lib/news_special/bootstrap',
    'bump-3',
    'underscore',
    'lib/vendors/react/react-0.14.2.min'
], function (news, $, _, React, ReactDOM) {

    var video = React.createClass({displayName: "video",
        getInitialState: function () {
            var background = this.props.background ? 'background' : 'news';
            var autoplay = this.props.autoplay;

            var mp;
            var settings = {
                product: background,
                playlistObject: {
                    items: []
                },
                overrideHoldingImage: this.props.poster,
                responsive: true,
                muted: false
            };

            return {
                mp: mp,
                settings: settings
            };
        },

        headerScrolls: function () {
            var that = this;
            var controller = new ScrollMagic.Controller();
            var windowHeight = news.$(window).height();
            var section3Offset = news.$('#section-3').offset().top;

            // MOVE THIS TO HEADER COMPONENT
            var headerStop = new ScrollMagic.Scene({triggerElement: '#section-3', triggerHook: 'onEnter', duration: windowHeight})
                .addTo(controller)
                .on('enter', function (e) {
                    if (e.scrollDirection === 'REVERSE') that.state.mp.play();
                })
                .on('leave', function (e) {
                    if (e.scrollDirection === 'FORWARD') that.state.mp.stop();
                });
            // MOVE THIS TO HEADER COMPONENT
        },

        bottomScrolls: function() {
            var that = this;
            var controller = new ScrollMagic.Controller();
            var windowHeight = news.$(window).height();

            var bottomStop = new ScrollMagic.Scene({
                triggerElement: '#section-media-9-3-container',
                triggerHook: 'onEnter',
                duration: windowHeight * 2
            }).addTo(controller)
                .on('enter', function(e) {
                    that.state.mp.play();
                })
                .on('leave', function(e) {
                    that.state.mp.stop();
                });
        },

        componentDidMount: function() {
            var updatedSettings = _.extend(this.state.settings, {
                playlistObject: {
                    items: [{vpid: this.props.videoId}]
                }
            });
            var $mp = $('#' + this.props.selector).player(updatedSettings);

            // MOVE THIS TO HEADER COMPONENT?
            if (this.props.selector === 'header-video') {
                $('#header-video-wrapper').height(news.$(window).height());
                $('#header-video-container').height(news.$(window).height());
                this.headerScrolls();
            }

            if (this.props.selector === 'section-media-8') {
                var overlay = $('#section-media-8-placeholder').html();
                $('#section-media-8-placeholder').remove();
                $('#section-media-8-faux-container').append(overlay);
                $('#section-media-8-faux-container').on('click', this.playVideo.bind(this));
            }

            if (this.props.selector === 'section-media-9-3') {
                this.bottomScrolls();
            }

            this.setState({
                settings: updatedSettings,
                mp: $mp
            });
            $mp.load();
        },

        playVideo: function () {
            var that = this;
            var event = new Event('videoPlaying');
            window.dispatchEvent(event);
            $('#' + this.props.selector + '-container').find('.section-media-video-overlay').hide();
            $('#' + this.props.selector + '-faux-container').hide();
            $('#' + this.props.selector + '-container').addClass('show');
            setTimeout(function () {
                that.state.mp.play();
            }, 500);
            //news.istats.log('video-play', 'newsspec-interaction');
        },

        videoEnded: function () {
            $('#' + this.props.selector + '-container').find('.section-media-video-overlay').show();
            $('#' + this.props.selector + '-faux-container').show();
            $('#' + this.props.selector + '-container').removeClass('show');
            //news.istats.log('video-ended', 'newsspec-nonuser');
        },

        videoStop: function () {
            var that = this;
            this.videoEnded();
            setTimeout(function () {
                that.state.mp.play();
            }, 500);
        },

        render: function() {
            var aidi = this.props.selector;

            return (
                React.createElement("div", {className: "section-video-wrapper"}, 
                    React.createElement("div", {id: aidi, className: "section-video"})
                )
            );
        }
    });

    return video;
});
