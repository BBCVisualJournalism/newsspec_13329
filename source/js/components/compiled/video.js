/** @jsx React.DOM */
define([
    'lib/news_special/bootstrap',
    'bump-3',
    'underscore',
    'lib/vendors/react/react-0.14.2.min'
], function (news, $, _, React, ReactDOM) {

    var video = React.createClass({displayName: "video",
        getInitialState: function () {
            var product = this.props.background ? 'background' : 'news';
            var autoplay = this.props.autoplay;

            var mp;
            var settings = {
                product: product,
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
                $mp.bind('ended playlistStopped', this.videoEnded.bind(this));
            }

            this.setState({
                settings: updatedSettings,
                mp: $mp
            });
            $mp.load();
        },

        playVideo: function () {
            var event = new Event('videoPlaying');
            window.dispatchEvent(event);
            $('#' + this.props.selector + '-container').find('.story-media-video-overlay').hide();
            $('#' + this.props.selector + '-faux-container').hide();
            $('#' + this.props.selector + '-container').removeClass('hidden');
            this.state.mp.play();

            var sectionNum = this.props.selector.substr(-1);
            var sectionRegion;
            switch (sectionNum) {
            case '2':
                sectionRegion = 'europe';
                break;
            case '3':
                sectionRegion = 'asia';
                break;
            case '5':
                sectionRegion = 'south-america';
                break;
            case '7':
                sectionRegion = 'north-america';
                break;
            }
            news.istats.log('video-played-' + sectionRegion, 'newsspec-interaction');
        },

        videoEnded: function () {
            $('#' + this.props.selector + '-container').find('.story-media-video-overlay').show();
            $('#' + this.props.selector + '-faux-container').show();
            $('#' + this.props.selector + '-container').addClass('hidden');
            news.istats.log('video-ended', 'newsspec-nonuser');
        },

        render: function() {
            var id = this.props.selector;

            return (
                React.createElement("div", {className: "section_videowrapper"}, 
                    React.createElement("div", {id: id, className: "section_video"})
                )
            );
        }
    });

    return video;
});
