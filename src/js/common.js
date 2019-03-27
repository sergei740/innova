'use strict';

import './../scss/common.scss';
import SVGInjector from 'svg-injector';
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';

var ProjFuncs = {
	heroSlider: function() {
		$('.slider').slick({
			// Options here
		});
	},
	init: function() {
		if ($('img.inject-me').length) {
			var mySVGsToInject = document.querySelectorAll('img.inject-me');
			SVGInjector(mySVGsToInject);
		}

		if ($('.slider').length) {
			this.heroSlider();
		}
	}
}

$(document).ready(function() {
	ProjFuncs.init();
});
