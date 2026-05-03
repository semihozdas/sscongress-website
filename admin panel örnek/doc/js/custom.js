var dzDoc  = function(){
	
	var screenWidth = $( window ).width();
	
	var handleSidebarCollapse = function(){
		if(jQuery('#sidebarCollapse').length > 0){
			$('#sidebarCollapse').on('click', function () {
				$('#nevbarleft').toggleClass('active');
				$('#content').toggleClass('active');
				$(this).toggleClass('active');
				
				$('#mobileCloseBtn').on('click', function () {
					$('#nevbarleft').removeClass('active');
				});
			});
		}		
	}
	
	var handleScrollTop = function (){
		
		var scrollTop = jQuery(".scroltop");
		/* page scroll top on click function */	
		scrollTop.on('click',function() {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 1000);
			return false;
		})

		jQuery(window).bind("scroll", function() {
			var scroll = jQuery(window).scrollTop();
			if (scroll > 900) {
				jQuery(".scroltop").fadeIn(1000);
			} else {
				jQuery(".scroltop").fadeOut(1000);
			}
		});
		/* page scroll top on click function end*/
	}
	/* Magnific Popup ============ */
	var MagnificPopup = function(){
		'use strict';	
		
		if(jQuery('.mfp-gallery').length > 0)
		{
			/* magnificPopup function */
			jQuery('.mfp-gallery').magnificPopup({
				delegate: '.mfp-link',
				type: 'image',
				tLoading: 'Loading image #%curr%...',
				mainClass: 'mfp-img-mobile',
				gallery: {
					enabled: true,
					navigateByImgClick: true,
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
					titleSrc: function(item) {
						return item.el.attr('title') + '<small></small>';
					}
				}
			});
			/* magnificPopup function end */
		}
		
		if(jQuery('.mfp-video').length > 0)
		{
			/* magnificPopup for Play video function */		
			jQuery('.mfp-video').magnificPopup({
				type: 'iframe',
				iframe: {
					markup: '<div class="mfp-iframe-scaler">'+
							 '<div class="mfp-close"></div>'+
							 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
							 '<div class="mfp-title">Some caption</div>'+
							 '</div>'
				},
				callbacks: {
					markupParse: function(template, values, item) {
						values.title = item.el.attr('title');
					}
				}
			});
			
		}

		if(jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').length > 0)
		{	
			/* magnificPopup for Play video function end */
			$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,

				fixedContentPos: true
			});
		
		}
		
	}
	
	var handleNavbarNav = function(){
		if(jQuery('.navbar-nav').length > 0){
			$(".navbar-nav a").on('click', function(event) {
				// Make sure this.hash has a value before overriding default behavior
				if (this.hash !== "") {
					// Prevent default anchor click behavior
					event.preventDefault();
					
					// Store hash
					var hash = this.hash;

					// Using jQuery's animate() method to add smooth page scroll
					// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
					$('html, body').animate({
						scrollTop: $(hash).offset().top
					});
					} // End if
			});
		}
	}
	
	var handleDZTree = function(){
		if(jQuery('#dz_tree').length > 0){
			$("#dz_tree").jstree({
				"core": {
					"themes": {
						"responsive": false
					}
				},
				"types": {
					"default": {
						"icon": "fa fa-folder"
					},
					"file": {
						"icon": "fa fa-file-text"
					}
				},
				"plugins": ["types"]
			});
		}
	}
	
	var handleDeznavScroll = function(){
		if(jQuery('.deznav-scroll').length > 0){
			const qs = new PerfectScrollbar('.deznav-scroll');
			qs.isRtl = false;
		}
	}
	var setCurrentYear = function(){
          const currentDate = new Date();
          let currentYear = currentDate.getFullYear();
         let elements = document.getElementsByClassName('current-year'); 

            for (const element of elements) {
            element.innerHTML = currentYear;
        }

	}

	
	function handleSupport(){	
		var dzscript = '<script id="DZScript" src="https://dzassets.s3.amazonaws.com/w3-global.js?btn_dir=right"></script>';
		jQuery('body').append(dzscript);
	}

	
	/* Function ============ */
	return {
		init:function(){
			handleSidebarCollapse();
			handleScrollTop();
			handleNavbarNav();
			handleDZTree();
			handleDeznavScroll();
			//handleSupport();
			MagnificPopup();
			setCurrentYear();
		},

		load:function(){
			
		},
		
		resize:function(){
			
		}
	}

}();

jQuery(document).ready(function() {
    'use strict';
	
	dzDoc .init();
	
});