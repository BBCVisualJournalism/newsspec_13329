define(['lib/news_special/bootstrap'], function (news) {
    var sectionElements = {
        'intro': { element: news.$('.app-popularity-chart'), reached: false },
        'europe': { element: news.$('#section_quote-europe'), reached: false },
        'asia': { element: news.$('#section_quote-asia'), reached: false },
        'middle-east': { element: news.$('#section_quote-middleeast'), reached: false },
        'south-america': { element: news.$('#section_quote-southamerica'), reached: false },
        'africa': { element: news.$('#section_quote-africa'), reached: false },
        'north-america': { element: news.$('#section_quote-northamerica'), reached: false }
    };

    var init = function () {
        news.$(window).on('scroll', handleScroll.bind(this));
    };

    var handleScroll = function () {
        for (var key in sectionElements) {
            if (isElementInViewport(sectionElements[key].element)) {
                if (!sectionElements[key].reached) {
                    news.istats.log('section-' + key + '-reached', 'newsspec-interaction');
                    sectionElements[key].reached = true;
                }
            }
        }
    };

    var isElementInViewport = function ($element) {
        var $window = news.$(window);

        var elemTop = $element.offset().top;
        var elemBottom = elemTop + $element.height();

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    };

    var ScrollHandler = {
        init: init,
        isElementInViewport: isElementInViewport
    };

    return ScrollHandler;
});
