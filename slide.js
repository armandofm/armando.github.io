var makePortfolio = function(el, options) {
	var $slideshows = document.querySelectorAll(el), $slideshow = {}, Slideshow = {
		init : function(el, options) {
			this.counter = 0;
			this.el = el;
			this.$items = el.querySelectorAll('figure');
			this.numItems = this.$items.length;
			options = options || {};
			options.auto = options.auto || false;

			this.opts = {
				auto : (typeof options.auto === "undefined") ? false
						: options.auto,
				speed : (typeof options.auto.speed === "undefined") ? 1500
						: options.auto.speed,
				pauseOnHover : (typeof options.auto.pauseOnHover === "undefined") ? false
						: options.auto.pauseOnHover,
				fullScreen : (typeof options.fullScreen === "undefined") ? false
						: options.fullScreen,
				swipe : (typeof options.swipe === "undefined") ? false
						: options.swipe
			};

			this.$items[0].classList.add('portfolio-show');

			this.injectControls(el);
			this.addEventListeners(el);
			if (this.opts.auto) {
				this
						.autoCycle(this.el, this.opts.speed,
								this.opts.pauseOnHover);
			}
			if (this.opts.fullScreen) {
				this.addFullScreen(this.el);
			}
			if (this.opts.swipe) {
				this.addSwipe(this.el);
			}
		},
		showCurrent : function(i) {
			if (i > 0) {
				this.counter = (this.counter + 1 === this.numItems) ? 0
						: this.counter + 1;
			} else {
				this.counter = (this.counter - 1 < 0) ? this.numItems - 1
						: this.counter - 1;
			}

			[].forEach.call(this.$items, function(el) {
				el.classList.remove('portfolio-show');
			});

			this.$items[this.counter].classList.add('portfolio-show');
		},
		injectControls : function(el) {

			var spanAnterior = document.createElement("span"), spanProximo = document
					.createElement("span"), docFrag = document
					.createDocumentFragment();

			spanAnterior.classList.add('portfolio-prev');
			spanProximo.classList.add('portfolio-next');

			spanAnterior.innerHTML = '&laquo;';
			spanProximo.innerHTML = '&raquo;';

			docFrag.appendChild(spanAnterior);
			docFrag.appendChild(spanProximo);
			el.appendChild(docFrag);
		},
		addEventListeners : function(el) {
			var that = this;
			el.querySelector('.portfolio-next').addEventListener('click',
					function() {
						that.showCurrent(1);
					}, false);

			el.querySelector('.portfolio-prev').addEventListener('click',
					function() {
						that.showCurrent(-1);
					}, false);

			el.onkeydown = function(e) {
				e = e || window.event;
				if (e.keyCode === 37) {
					that.showCurrent(-1);
				} else if (e.keyCode === 39) {
					that.showCurrent(1);
				}
			};
		},
		autoCycle : function(el, speed, pauseOnHover) {
			var that = this, interval = window.setInterval(function() {
				that.showCurrent(1); // increment & show
			}, speed);

			if (pauseOnHover) {
				el.addEventListener('mouseover', function() {
					interval = clearInterval(interval);
				}, false);
				el.addEventListener('mouseout', function() {
					interval = window.setInterval(function() {
						that.showCurrent(1);
					}, speed);
				}, false);
			}

		},
	};

	[].forEach.call($slideshows, function(el) {
		$slideshow = Object.create(Slideshow);
		$slideshow.init(el, options);
	});
};
var opts = {
	auto : {
		speed : 3000,
		pauseOnHover : false
	},
	fullScreen : true,
	swipe : true
};
makePortfolio('.portfolio', opts);