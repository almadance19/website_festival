jQuery("ul li a").filter(function() {
    return this.href == location.href.replace(/#.*/, "")
}).closest("li").addClass("active");
jQuery('.toggle').click(function(e) {
    e.stopPropagation();
    jQuery('.header').toggleClass('toggle-open')
});
jQuery('body,html').click(function(e) {
    jQuery('.header').removeClass('toggle-open')
});
jQuery(function() {
    var children = jQuery('.header-menu li a').filter(function() {
        return jQuery(this).nextAll().length > 0
    })
    jQuery('<i class="bi bi-chevron-down toggle-link" aria-hidden="true"></i>').insertAfter(children)
    jQuery('.header-menu .toggle-link').click(function(e) {
        jQuery(this).next().toggleClass('active');
        return !1
    });
    jQuery('.header-menu .toggle-link').click(function(e) {
        jQuery(this).parent().toggleClass('active-menu');
        return !1
    })
})
jQuery('.service').slick({
    infinite: !0,
    arrows: !0,
    dots: !0,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 992,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
        }
    }, {
        breakpoint: 767,
        settings: {
            arrows: !1,
            dots: !0,
            slidesToShow: 1,
            slidesToScroll: 1
        }
    }]
});
