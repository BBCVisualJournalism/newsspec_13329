define([
    'lib/news_special/bootstrap',
    'lib/vendors/react/react-0.14.2.min',
    'components/compiled/video'
], function (news, React, Video) {
    $.emit('init_images');
    news.sendMessageToremoveLoadingImage();

    var //domain = 'http://local.bbc.co.uk:1031';
        //domain = 'http://wwwpreview.stage.newsonline.tc.nca.bbc.co.uk';
        domain = 'http://news.bbcimg.co.uk';

    var videos = [
        {selector: 'story-media-2-faux', videoId: 'p03hdp5k', background: true, autoplay: true},
        {selector: 'story-media-2', videoId: 'p03h7p1t'},
        {selector: 'story-media-3-faux', videoId: 'p03hdpwr', background: true, autoplay: true},
        {selector: 'story-media-3', videoId: 'p03hdclq'},
        {selector: 'story-media-5-faux', videoId: 'p03hdpct', background: true, autoplay: true},
        {selector: 'story-media-5', videoId: 'p03hdccz'},
        {selector: 'story-media-7-faux', videoId: 'p03hdpzw', background: true, autoplay: true},
        {selector: 'story-media-7', videoId: 'p03hdcdj'}
    ];

    var renderVideo = function (indexNumber) {
        setTimeout(function () {
            var item = videos[indexNumber];
            React.render(React.createElement(Video, item), document.getElementById(item['selector'] + '-container'));
        }, 850 * indexNumber);
    };

    for (var i = 0; i < videos.length; i++) {
        renderVideo(i);
    }
});
