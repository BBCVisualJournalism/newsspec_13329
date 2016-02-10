define(['lib/news_special/bootstrap', 'scrollHandler'], function (news, scrollHandler) {
    var $shareTools = news.$('.footer_share_link');
    var $onwardJourneyLink = news.$('.footer_onwardjourney_link');

    var init = function () {
        scrollHandler.init();
        setShareToolsIstatsLogging();
        setOnwardJourneyIstatsLogging();
    };

    var setShareToolsIstatsLogging = function () {
        $shareTools.on('click', function () {
            var $this = news.$(this);
            news.istats.log('sharetools-clicked', 'newsspec-interaction');

            if ($this.hasClass('footer_share_link-email')) {
                news.istats.log('sharetools-clicked-email', 'newsspec-interaction');
            } else if ($this.hasClass('footer_share_link-facebook')) {
                news.istats.log('sharetools-clicked-facebook', 'newsspec-interaction');
            } else if ($this.hasClass('footer_share_link-twitter')) {
                news.istats.log('sharetools-clicked-twitter', 'newsspec-interaction');
            } else if ($this.hasClass('footer_share_link-linkedin')) {
                news.istats.log('sharetools-clicked-linkedin', 'newsspec-interaction');
            }
        });
    };

    var setOnwardJourneyIstatsLogging = function () {
        $onwardJourneyLink.on('click', function () {
            news.istats.log('onward-journey-link-clicked', 'newsspec-interaction');
        });
    };

    var IstatsLogger = {
        init: init
    };

    return IstatsLogger;
});
