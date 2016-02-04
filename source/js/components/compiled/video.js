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

        componentDidMount: function() {
            var updatedSettings = _.extend(this.state.settings, {
                playlistObject: {
                    items: [{vpid: this.props.videoId}]
                }
            });
            var $mp = $('#' + this.props.selector).player(updatedSettings);

            var regex = new RegExp('^story-media-[\\d]$');
            if (regex.test(this.props.selector)) {
                var overlay = news.$('#' + this.props.selector + '-placeholder').html();
                news.$('#' + this.props.selector + '-placeholder').remove();
                news.$('#' + this.props.selector + '-faux-container').append(overlay);
                news.$('#' + this.props.selector + '-faux-container').on('click', this.playVideo.bind(this));
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
            $('#' + this.props.selector + '-container').find('.story-media-video-overlay').hide();
            $('#' + this.props.selector + '-faux-container').hide();
            $('#' + this.props.selector + '-container').removeClass('hidden');
            setTimeout(function () {
                that.state.mp.play();
            }, 500);
            //news.istats.log('video-play', 'newsspec-interaction');
        },

        videoEnded: function () {
            $('#' + this.props.selector + '-container').find('.story-media-video-overlay').show();
            $('#' + this.props.selector + '-faux-container').show();
            $('#' + this.props.selector + '-container').addClass('hidden');
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
                React.createElement("div", {className: "section_videowrapper"}, 
                    React.createElement("div", {id: aidi, className: "section_video"})
                )
            );
        }
    });

    return video;
});
