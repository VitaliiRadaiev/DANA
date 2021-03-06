class Utils {
	slideUp(target, duration = 500) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideDown(target, duration = 500) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideToggle(target, duration = 500) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return this.slideDown(target, duration);
			} else {
				return this.slideUp(target, duration);
			}
		}
	}

	Android() {
		return navigator.userAgent.match(/Android/i);
	}
	BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	isMobile() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
	}

	scrollTrigger(el, value, callback) {
		let triggerPoint = document.documentElement.clientHeight / 100 * (100 - value);
		const trigger = () => {
			if(el.getBoundingClientRect().top <= triggerPoint && !el.classList.contains('is-show')) {
				if(typeof callback === 'function') {
					callback();
					el.classList.add('is-show')
				}
			}
		}
	
		trigger();
	
		window.addEventListener('scroll', trigger);
	}

	numberCounterAnim() {
		let counterItems = document.querySelectorAll('[data-number-counter-anim]');
		if (counterItems) {
	
			counterItems.forEach(item => {
				let animation = anime({
					targets: item,
					textContent: [0, item.innerText],
					round: 1,
					easing: 'linear',
					autoplay: false,
					duration: 1000
				});
	
				window.addEventListener('load', () => {
					this.scrollTrigger(item, 15, () => {animation.play()})
				})
			})
		}
	}

	initTruncateString() {
		function truncateString(el, stringLength = 0) {
			let str = el.innerText;
			if (str.length <= stringLength) return;
			el.innerText = [...str].slice(0, stringLength).join('') + '...';
		}

		let truncateItems = document.querySelectorAll('[data-truncate-string]');
		if(truncateItems.length) {
			truncateItems.forEach(truncateItem => {
				truncateString(truncateItem, truncateItem.dataset.truncateString);
			})
		}
	}
}


;
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
	  this.type = type;
	}
  
	init() {
	  this.??bjects = [];
	  this.daClassname = '_dynamic_adapt_';
	  this.nodes = [...document.querySelectorAll('[data-da]')];
  
	  this.nodes.forEach((node) => {
		const data = node.dataset.da.trim();
		const dataArray = data.split(',');
		const ??bject = {};
		??bject.element = node;
		??bject.parent = node.parentNode;
		??bject.destination = document.querySelector(`${dataArray[0].trim()}`);
		??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
		??bject.place = dataArray[2] ? dataArray[2].trim() : 'last';
		??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		this.??bjects.push(??bject);
	  });
  
	  this.arraySort(this.??bjects);
  
	  this.mediaQueries = this.??bjects
		.map(({
		  breakpoint
		}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
		.filter((item, index, self) => self.indexOf(item) === index);
  
	  this.mediaQueries.forEach((media) => {
		const mediaSplit = media.split(',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
  
		const ??bjectsFilter = this.??bjects.filter(
		  ({
			breakpoint
		  }) => breakpoint === mediaBreakpoint
		);
		matchMedia.addEventListener('change', () => {
		  this.mediaHandler(matchMedia, ??bjectsFilter);
		});
		this.mediaHandler(matchMedia, ??bjectsFilter);
	  });
	}
  
	mediaHandler(matchMedia, ??bjects) {
	  if (matchMedia.matches) {
		??bjects.forEach((??bject) => {
		  ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		  this.moveTo(??bject.place, ??bject.element, ??bject.destination);
		});
	  } else {
		??bjects.forEach(
		  ({ parent, element, index }) => {
			if (element.classList.contains(this.daClassname)) {
			  this.moveBack(parent, element, index);
			}
		  }
		);
	  }
	}
  
	moveTo(place, element, destination) {
	  element.classList.add(this.daClassname);
	  if (place === 'last' || place >= destination.children.length) {
		destination.append(element);
		return;
	  }
	  if (place === 'first') {
		destination.prepend(element);
		return;
	  }
	  destination.children[place].before(element);
	}
  
	moveBack(parent, element, index) {
	  element.classList.remove(this.daClassname);
	  if (parent.children[index] !== undefined) {
		parent.children[index].before(element);
	  } else {
		parent.append(element);
	  }
	}
  
	indexInParent(parent, element) {
	  return [...parent.children].indexOf(element);
	}
  
	arraySort(arr) {
	  if (this.type === 'min') {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return -1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return 1;
			}
			return a.place - b.place;
		  }
		  return a.breakpoint - b.breakpoint;
		});
	  } else {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return 1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return -1;
			}
			return b.place - a.place;
		  }
		  return b.breakpoint - a.breakpoint;
		});
		return;
	  }
	}
}
;

class App {
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
	}

	init() {
		if (this.utils.isMobile()) {
			document.body.classList.add('mobile');
		}

		if (this.utils.iOS()) {
			document.body.classList.add('mobile-ios');
		}

		this.dynamicAdapt.init();
		this.headerHandler();
		this.popupHandler();
		this.initSmoothScroll();
		this.inputMaskInit();
		this.tabsInit();
		this.selectInit();
		this.spollerInit();
		this.setFontSize();
		this.initTooltip();
		this.filterInit();
		this.componentsScriptsBeforeLoad();

		window.addEventListener('load', () => {
			document.body.classList.add('page-is-load');

			this.setPaddingTopHeaderSize();
			this.slidersInit();
			this.componentsScripts();
			this.setPageMinHeight();
		});

	}

	headerHandler() {
		let header = document.querySelector('[data-header]');
let menu = document.querySelector('[data-menu]');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
    })

    if(menu) {
        let burger = document.querySelector('[data-action="open-menu"]');
        let closeBtns = document.querySelectorAll('[data-action="close-menu"]');
        let overlay = document.querySelector('.menu-overlay');

        burger.addEventListener('click', () => {
            menu.classList.add('menu--open');
            document.body.classList.add('overflow-hidden');
            overlay.classList.add('menu-is-open');
        })
        if(closeBtns.length) {
            closeBtns.forEach(closeBtn => {
                closeBtn.addEventListener('click', () => {
                    menu.classList.remove('menu--open');
                    document.body.classList.remove('overflow-hidden');
                    overlay.classList.remove('menu-is-open');
                })
            })
        }

        const setHeight = () => {
            if(document.documentElement.clientWidth < 992) {
                menu.style.height = document.documentElement.clientHeight + 'px';
            }
        }

        setHeight();

        window.addEventListener('resize', setHeight);
    }
}
;
	}

	setPageMinHeight() {
		let page = document.querySelector('._page');
		if (page) {
			let footer = document.querySelector('.footer');
			const setHeight = () => {
				if (footer) {
					page.style.minHeight = document.documentElement.clientHeight - footer.clientHeight + 'px';
				}
			}

			setHeight();

			let id = setInterval(setHeight, 10);
			setTimeout(() => {
				clearInterval(id);
			}, 200)

			window.addEventListener('resize', setHeight);
		}
	}

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 800;


if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];

		popupLink.addEventListener('click', function (e) {
			e.preventDefault();
			let popupName = '';

			if (popupLink.getAttribute('href')) {
				popupName = popupLink.getAttribute('href').replace('#', '');
			}
			if (popupLink.dataset.popupHref) {
				popupName = popupLink.dataset.popupHref.replace('#', '');
			}
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);

		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('popup--open');
		if (doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if (targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function () {
		if (targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node == node.parentElement;
			}
			return null;
		};
	}
})();

(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.mozMatchesSelector;
	}
})();
// === AND Polyfill ===

// ???????????????????? API ???????????? ?? ?????????????????? ??????????????????
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	},
	initItem(item) {
		if(!item) return;

		const popupLink = item;

		popupLink.addEventListener('click', function (e) {
			e.preventDefault();
			let popupName = '';

			if (popupLink.getAttribute('href')) {
				popupName = popupLink.getAttribute('href').replace('#', '');
			}
			if (popupLink.dataset.popupHref) {
				popupName = popupLink.dataset.popupHref.replace('#', '');
			}
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);

		});


	}
}


;
	}

	slidersInit() {
		{
    let carousels = document.querySelectorAll('[data-carousel]');
    if(carousels.length) {
        carousels.forEach(carousel => {
            let carouselSwiper = new Swiper(carousel.querySelector('.swiper'), {
                speed: 800,
                navigation: {
                    nextEl: carousel.querySelector('[data-action="btn-next"]'),
                    prevEl: carousel.querySelector('[data-action="btn-prev"]'),
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 15,
                        autoHeight: true,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 25,
                    },
                },
            });
        })
    }
};
		{
    let promoHeaderSlider = document.querySelector('[data-promo-header-slider]');
    if(promoHeaderSlider) {
        let sliderData = new Swiper(promoHeaderSlider, {
            effect: document.documentElement.clientWidth < 992 ? 'slide' : 'fade',
            slidesPerView: 1,
            spaceBetween: 20,
            autoHeight: true,
            speed: 600,
            loop: true,
            navigation: {
                nextEl: promoHeaderSlider.querySelector('.slider-button--next'),
                prevEl: promoHeaderSlider.querySelector('.slider-button--prev'),
            },
        });
    }
};
		{
    let teamCarousel = document.querySelector('[data-team-carousel-slider]');
    if(teamCarousel) {
        let sliderData = new Swiper(teamCarousel, {
            speed: 800,
            loop: true,
            navigation: {
                nextEl: teamCarousel.querySelector('.slider-button--next'),
                prevEl: teamCarousel.querySelector('.slider-button--prev'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                }
            },
        });
    }
};
		{
    let documentsSlider = document.querySelector('[data-documents-slider]');
    if(documentsSlider) {
        let sliderData = new Swiper(documentsSlider.querySelector('.swiper'), {
            speed: 800,
            navigation: {
                nextEl: documentsSlider.querySelector('.slider-button--next'),
                prevEl: documentsSlider.querySelector('.slider-button--prev'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    autoHeight: true,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            },
        });
    }
};
		{
    let infoCardsListAll = document.querySelectorAll('[data-slider="info-cards-list"]');
    if(infoCardsListAll.length) {
        infoCardsListAll.forEach(infoCardsList => {

            const slider = infoCardsList;
            if(slider) {
                let mySwiper;
        
                function mobileSlider() {
                    if(document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
                        mySwiper = new Swiper(slider, {
                            slidesPerView: 'auto',
                            speed: 600,
                            spaceBetween: 16,
                        });
        
                        slider.dataset.mobile = 'true';
        
                        //mySwiper.slideNext(0);
                    }
        
                    if(document.documentElement.clientWidth > 767) {
                        slider.dataset.mobile = 'false';
        
                        if(slider.classList.contains('swiper-initialized')) {
                            mySwiper.destroy();
                        }
                    }
                }
        
                mobileSlider();
        
                window.addEventListener('resize', () => {
                    mobileSlider();
                })
            }
        })
    }
};
		{
    let gallery = document.querySelector('[data-slider="gallery"]');
    if(gallery) {
        let sliderData = new Swiper(gallery.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 400,

            navigation: {
                nextEl: gallery.querySelector('.gallery__btn.next'),
                prevEl: gallery.querySelector('.gallery__btn.prev'),
            },
        });
    }
};
		{
    let certificates = document.querySelector('[data-slider="certificates"]');
    if(certificates) {
        let desk = certificates.querySelector('.certificates__slider-desk');
        let mob = certificates.querySelector('.certificates__slider-mob');

        if(desk && mob) {
            let mobSwiper = new Swiper(mob, {
                observer: true,
                observeParents: true,
                speed: 600,
                loopAdditionalSlides: 1,
                
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 16,
                        centeredSlides: false,
                        touchRatio: 1,
                        loop: false,
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 32,
                        centeredSlides: false,
                        touchRatio: 1,
                        loop: false,
                    },
                    992: {
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        centeredSlides: true,
                       // touchRatio: 0,
                        loop: true,
                    }
                },
            });

            let deskSwiper = new Swiper(desk, {
                effect: 'fade',
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 600,
                loop: true,
                loopAdditionalSlides: 3,
                pagination: {
                	el: desk.querySelector('.swiper-pagination'),
                    type: 'fraction',
                },
                navigation: {
                    nextEl: desk.querySelector('.certificates__slider-btn.next'),
                    prevEl: desk.querySelector('.certificates__slider-btn.prev'),
                },
                // on: {
                //     activeIndexChange: function (e) {
                //         console.log(e);
                //         //mobSwiper.slideTo(e.activeIndex);
                //     },
                // }
            });

            deskSwiper.controller.control = mobSwiper
            mobSwiper.controller.control = deskSwiper
        }
    }
};
		{
    let imagesCarouselAll = document.querySelectorAll('[data-slider="images-carousel"]');
    if(imagesCarouselAll.length) {
        imagesCarouselAll.forEach(imagesCarousel => {
            let sliderData = new Swiper(imagesCarousel, {
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
            
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 600,
                loop: true,
                navigation: {
                    nextEl: imagesCarousel.querySelector('.slider-button--next'),
                    prevEl: imagesCarousel.querySelector('.slider-button--prev'),
                },

            });
        })
    }
};
		{
    let gallerySecondAll = document.querySelectorAll('[data-slider="gallery-second"]');
    if(gallerySecondAll.length) {
        gallerySecondAll.forEach(gallerySecond => {
            let sliderData = new Swiper(gallerySecond.querySelector('.swiper'), {
                observer: true,
                observeParents: true,
                slidesPerView: 'auto',
                spaceBetween: 0,
                speed: 600,
                loop: true,
                navigation: {
                    nextEl: gallerySecond.querySelector('.slider-button--next'),
                    prevEl: gallerySecond.querySelector('.slider-button--prev'),
                },
            });
            
        })
    }
};
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = Array.from(tabsContainer.querySelectorAll('[data-tab-trigger]'));
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
				let select = tabsContainer.querySelector('[data-tab-select]');

				if (tabsContainer.dataset.tabs === 'sub') {
					triggerItems = triggerItems.filter(i => i.closest('[data-tabs="sub"]'))
					contentItems = contentItems.filter(i => i.closest('[data-tabs="sub"]'))
				} else {
					triggerItems = triggerItems.filter(i => !i.closest('[data-tabs="sub"]'))
					contentItems = contentItems.filter(i => !i.closest('[data-tabs="sub"]'))
				}


				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					// init
					let activeItem = tabsContainer.querySelector('.tab-active[data-tab-trigger]');
					if (activeItem) {
						activeItem.classList.add('tab-active');
						getContentItem(activeItem.dataset.tabTrigger).classList.add('tab-active');
					} else {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}

					triggerItems.forEach(item => {
						item.addEventListener('click', (e) => {
							e.preventDefault();
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})
						})
					})
				}

				if (select) {
					select.addEventListener('change', (e) => {
						getContentItem(e.target.value).classList.add('tab-active');

						contentItems.forEach(item => {
							if (getContentItem(e.target.value) === item) return;

							item.classList.remove('tab-active');
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');

				if(spoller.classList.contains('services-side-panel__list')) {
					triggers.forEach(trigger => {
						let span = document.createElement('span');
						span.className = 'chevron-down';
						trigger.append(span);
					})
				}

				let itemActive = spoller.querySelector('.item-active');
				if(itemActive) {
					if(itemActive.parentElement.classList.contains('services-side-panel__list')) {
						let trigger = itemActive.querySelector('[data-spoller-trigger]');
						
						trigger.classList.add('active');
						trigger.parentElement.classList.add('active');
						trigger.nextElementSibling.style.display = 'block';
					} else {
						let parentLi = itemActive.closest('li:not(.item-active)');
						let trigger = parentLi.querySelector('[data-spoller-trigger]');
						
						trigger.classList.add('active');
						trigger.parentElement.classList.add('active');
						trigger.nextElementSibling.style.display = 'block';
					}
				}

				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if (trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
							if(spoller.classList.contains('services-side-panel__list')) {
								if(e.target.closest('span.chevron-down')) {
									e.preventDefault();
									parent.classList.toggle('active');
									trigger.classList.toggle('active');
									content && this.utils.slideToggle(content);
		
									if (isOneActiveItem) {
										triggers.forEach(i => {
											if (i === trigger) return;
		
											let parent = i.parentElement;
											let content = i.nextElementSibling;
		
											parent.classList.remove('active');
											i.classList.remove('active');
											content && this.utils.slideUp(content);
										})
									}
								}
							} else {
								e.preventDefault();
								parent.classList.toggle('active');
								trigger.classList.toggle('active');
								content && this.utils.slideToggle(content);
	
								if (isOneActiveItem) {
									triggers.forEach(i => {
										if (i === trigger) return;
	
										let parent = i.parentElement;
										let content = i.nextElementSibling;
	
										parent.classList.remove('active');
										i.classList.remove('active');
										content && this.utils.slideUp(content);
									})
								}
							}
						})
					})
				}
			})
		}
	}

	filterInit() {
		let filters = document.querySelectorAll('[data-filter]');
		if (filters.length) {
			filters.forEach(filter => {
				let titles = filter.querySelectorAll('.team-list__title');
				let triggers = filter.querySelectorAll('[data-filter-trigger]');
				let filterItems = Array.from(filter.querySelectorAll('[data-filter-content]')).map(item => {
					return {
						el: item,
						multipleId: item.dataset.filterContent.split(',')
					}
				})

				triggers.forEach(trigger => {
					trigger.addEventListener('click', (e) => {
						e.preventDefault();

						trigger.classList.add('active');

						triggers.forEach(i => {
							if (i === trigger) return;

							i.classList.remove('active');
						})

						if (trigger.dataset.filterTrigger === '*') {
							filterItems.forEach(item => {
								item.el.classList.remove('d-none');
							})

							if (titles.length) {
								titles.forEach(title => {
									title.classList.remove('d-none');
								})
							}

						} else {
							filterItems.forEach(item => {
								if (item.multipleId.includes(trigger.dataset.filterTrigger)) {
									item.el.classList.remove('d-none');
								} else {
									item.el.classList.add('d-none');
								}
							})

							if (titles.length) {
								titles.forEach(title => {
									title.classList.add('d-none');
								})
							}
						}
					})
				})
			})
		}
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	setPaddingTopHeaderSize() {
		let wrapper = document.querySelector('[data-padding-top-header-size]');
		if (wrapper) {
			let header = document.querySelector('[data-header]');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 10);
				setTimeout(() => {
					clearInterval(id);
				}, 200)
				window.addEventListener('resize', setPedding);
			}

		}
	}


	initSmoothScroll() {
		let anchors = document.querySelectorAll('a[href^="#"]:not([data-popup="open-popup"])');
		if (anchors.length) {
			let header = document.querySelector('[data-header]');

			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

				anchor.addEventListener('click', (e) => {
					let el = document.querySelector(`#${id}`);

					if (el) {
						e.preventDefault();
						let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;

						if (header) {
							top = top - header.clientHeight;
						}

						window.scrollTo({
							top: top - 30,
							behavior: 'smooth',
						})
					} else {
						e.preventDefault();
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					}
				})

			})
		}

	}

	selectInit() {
		{
    function _slideUp(target, duration = 500) {
        target.style.transitionProperty = 'height, margin, padding';
        target.style.transitionDuration = duration + 'ms';
        target.style.height = target.offsetHeight + 'px';
        target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout(() => {
            target.style.display = 'none';
            target.style.removeProperty('height');
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideDown(target, duration = 500) {
        target.style.removeProperty('display');
        let display = window.getComputedStyle(target).display;
        if (display === 'none')
            display = 'block';
    
        target.style.display = display;
        let height = target.offsetHeight;
        target.style.overflow = 'hidden';
        target.style.height = 0;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + 'ms';
        target.style.height = height + 'px';
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        window.setTimeout(() => {
            target.style.removeProperty('height');
            target.style.removeProperty('overflow');
            target.style.removeProperty('transition-duration');
            target.style.removeProperty('transition-property');
            target.classList.remove('_slide');
        }, duration);
    }
    function _slideToggle(target, duration = 500) {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (window.getComputedStyle(target).display === 'none') {
                return _slideDown(target, duration);
            } else {
                return _slideUp(target, duration);
            }
        }
    }

    //Select
    let selects = document.getElementsByTagName('select');
    if (selects.length > 0) {
        selects_init();
    }
    function selects_init() {
        for (let index = 0; index < selects.length; index++) {
            const select = selects[index];
            select_init(select);
        }
        //select_callback();
        document.addEventListener('click', function (e) {
            selects_close(e);
        });
        document.addEventListener('keydown', function (e) {
            if (e.which == 27) {
                selects_close(e);
            }
        });
    }
    function selects_close(e) {
        const selects = document.querySelectorAll('.select');
        if (!e.target.closest('.select')) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                select.classList.remove('_active');
                _slideUp(select_body_options, 100);
            }
        }
    }
    function select_init(select) {
        const select_parent = select.parentElement;
        const select_modifikator = select.getAttribute('class');
        const select_selected_option = select.querySelector('option:checked');
        select.setAttribute('data-default', select_selected_option.value);
        select.style.display = 'none';

        select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');

        let new_select = select.parentElement.querySelector('.select');
        new_select.appendChild(select);
        select_item(select);
    }
    function select_item(select) {
        const select_parent = select.parentElement;
        const select_items = select_parent.querySelector('.select__item');
        const select_options = select.querySelectorAll('option');
        const select_selected_option = select.querySelector('option:checked');
        const select_selected_text = select_selected_option.innerHTML;
        const select_type = select.getAttribute('data-type');
        const label = '<span class="select__label">Price:</span>';

        if (select_items) {
            select_items.remove();
        }

        let select_type_content = '';
        if (select_type == 'input') {
            select_type_content = '<div class="select__value icon-select-arrow"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="????????????" data-value="' + select_selected_text + '" class="select__input"></div>';
        } else {
            select_type_content = '<div class="select__value icon-select-arrow"><span>' + select_selected_text + '</span></div>';
        }

   
        select_parent.insertAdjacentHTML('beforeend',
            '<div class="select__item">' +
            `<div class="select__title">${(select.dataset.select === 'price') ? label : ''}` + select_type_content + '</div>' +
            '<div class="select__options">' + select_get_options(select_options) + '</div>' +
            '</div></div>');

        select_actions(select, select_parent);
    }
    function select_actions(original, select) {
        const select_item = select.querySelector('.select__item');
        const select_body_options = select.querySelector('.select__options');
        const select_options = select.querySelectorAll('.select__option');
        const select_type = original.getAttribute('data-type');
        const select_input = select.querySelector('.select__input');

        select_item.addEventListener('click', function () {
            let selects = document.querySelectorAll('.select');
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_body_options = select.querySelector('.select__options');
                if (select != select_item.closest('.select')) {
                    select.classList.remove('_active');
                    _slideUp(select_body_options, 100);
                }
            }
            _slideToggle(select_body_options, 100);
            select.classList.toggle('_active');
        });

        for (let index = 0; index < select_options.length; index++) {
            const select_option = select_options[index];
            const select_option_value = select_option.getAttribute('data-value');
            const select_option_text = select_option.innerHTML;

            if (select_type == 'input') {
                select_input.addEventListener('keyup', select_search);
            } else {
                if (select_option.getAttribute('data-value') == original.value) {
                    select_option.style.display = 'none';
                }
            }
            select_option.addEventListener('click', function () {
                for (let index = 0; index < select_options.length; index++) {
                    const el = select_options[index];
                    el.style.display = 'block';
                }
                if (select_type == 'input') {
                    select_input.value = select_option_text;
                    original.value = select_option_value;
                } else {
                    select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
                    original.value = select_option_value;
                    select_option.style.display = 'none';

                    let event = new Event("change", { bubbles: true });
                    original.dispatchEvent(event);
                }
            });
        }
    }
    function select_get_options(select_options) {
        if (select_options) {
            let select_options_content = '';
            for (let index = 0; index < select_options.length; index++) {
                const select_option = select_options[index];
                const select_option_value = select_option.value;
                if (select_option_value != '') {
                    const select_option_text = select_option.text;
                    select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
                }
            }
            return select_options_content;
        }
    }
    function select_search(e) {
        let select_block = e.target.closest('.select ').querySelector('.select__options');
        let select_options = e.target.closest('.select ').querySelectorAll('.select__option');
        let select_search_text = e.target.value.toUpperCase();

        for (let i = 0; i < select_options.length; i++) {
            let select_option = select_options[i];
            let select_txt_value = select_option.textContent || select_option.innerText;
            if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
                select_option.style.display = "";
            } else {
                select_option.style.display = "none";
            }
        }
    }
    function selects_update_all() {
        let selects = document.querySelectorAll('select');
        if (selects) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                select_item(select);
            }
        }
    }

};
	}

	setFontSize() {
		let elements = document.querySelectorAll('[data-set-font-size]');
		if (elements.length) {
			elements.forEach(el => {
				const setFontSize = () => {
					if (document.documentElement.clientWidth > 992) {
						let value = 10 / 1903 * el.clientWidth;
						if (value > 10) value = 10;
						el.style.fontSize = value + 'px';
					}
				}

				setFontSize();

				window.addEventListener('resize', setFontSize);
			})
		}
	}

	initTooltip() {
		let elements = document.querySelectorAll('[data-tooltip]');
		if (elements.length) {
			elements.forEach(el => {
				tippy(el, {
					content: el.dataset.tooltip,
				});
			})
		}

		let imageTooltips = document.querySelectorAll('[data-tooltip-img]');
		if (imageTooltips.length) {
			imageTooltips.forEach(imageTooltip => {
				imageTooltip.addEventListener('click', (e) => {
					e.preventDefault();
				})
				let t = tippy(imageTooltip, {
					content: `<img class="tooltip-img" src="${imageTooltip.dataset.tooltipImg}" alt="">`,
					allowHTML: true,
					//maxWidth: 444,
					maxWidth: 'none',
					theme: 'tomato',
					arrow: false,
					inlinePositioning: true,
					offset: [0, 0],
				});
			})
		}
	}

	componentsScripts() {
		{
    let technologySection = document.querySelector('[data-technology]');
    if(technologySection) {
        let list = technologySection.querySelector('.technology__list');
        let listItems = technologySection.querySelectorAll('.technology__list li');
        let btn = technologySection.querySelector('.technology__bottom .btn');

        if(list && btn && listItems.length) {
            const setMaxHeight = () => {
                if(document.documentElement.clientWidth < 768) {
                    let height = listItems[0].clientHeight + 22;

                    if(listItems[1]) {
                        height += listItems[1].clientHeight + 22;
                    }
                    
                    list.style.maxHeight = height - 1 + 'px';
                }
            }

            setMaxHeight();

            setMaxHeight();
            let id = setInterval(setMaxHeight, 10);
            setTimeout(() => {
                clearInterval(id);
            }, 200)

            window.addEventListener('resize', setMaxHeight);

            btn.addEventListener('click', (e) => {
                e.preventDefault();

                list.style.maxHeight = list.scrollHeight + 22 + 'px';
                btn.style.display = 'none';
            })
        }
    }
};
		{
    let quiz = document.querySelector('[data-quiz]');
    if(quiz ) {
        let triggers = quiz.querySelectorAll('[data-quiz-trigger]');
        let contents = Array.from(quiz.querySelectorAll('[data-quiz-content]'));
        let buttonsBack = quiz.querySelectorAll('.quiz__btn-back');

        if(triggers.length && contents.length) {
            triggers.forEach(trigger => {
                let [content] = contents.filter(content => content.dataset.quizContent === trigger.dataset.quizTrigger);
                trigger.addEventListener('click', () => {
                    trigger.classList.add('active');
                    if(content) {
                        content.classList.add('active');
                    }

                    triggers.forEach(i => {
                        if(i === trigger) return;

                        let [content] = contents.filter(content => content.dataset.quizContent === i.dataset.quizTrigger);
                        i.classList.remove('active');
                        content.classList.remove('active');
                    })

                    quiz.classList.add('quiz--show-content');
                })
            })
        }

        if(buttonsBack.length) {
            buttonsBack.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    quiz.classList.remove('quiz--show-content');
                })
            })
        }
    }
};
		{
    let ratings = document.querySelectorAll('[data-rating]');
    if(ratings.length) {
        ratings.forEach(rating => {
            let count = rating.dataset.rating > 5 ? 5
                        : rating.dataset.rating ? rating.dataset.rating
                        : 0;
                        
            let starsLine = rating.querySelector('.rating__stars-1');

            starsLine.style.width = `calc(${count / 5 * 100}% - ${0.4}rem)`;
        })
    }
};
		{
    let frequentlyQuestions = document.querySelector('[data-frequently-questions]');
    if(frequentlyQuestions) {
        let btn = frequentlyQuestions.querySelector('.frequently-questions__see-more');
        let collpase = frequentlyQuestions.querySelector('.frequently-questions__list-collapse');
        let openText = btn.innerText;
        let closeText = btn.dataset.text;
        let cards = frequentlyQuestions.querySelectorAll('.frequently-questions-card');

        if(btn && collpase) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                if(btn.classList.contains('content-show')) {
                    btn.classList.remove('content-show');
                    btn.innerText = openText;
                } else {
                    btn.classList.add('content-show');
                    btn.innerText = closeText;
                }

                this.utils.slideToggle(collpase)
            })
        }

        if(cards.length) {
            cards.forEach(card => {
                let textCollapse = card.querySelector('.frequently-questions-card__text-collapse');
                card.addEventListener('click', (e) => {
                    e.preventDefault();

                    if(textCollapse) {
                        card.classList.toggle('frequently-questions-card--is-open')
                        this.utils.slideToggle(textCollapse, 300);
                    }
                })
            })
        }
    }
};
		{
    let testimonialsSection = document.querySelector('[data-testimonials]');
    if (testimonialsSection) {
        let list = testimonialsSection.querySelector('.testimonials-list');
        let listItems = testimonialsSection.querySelectorAll('.testimonials-list li');
        let btn = testimonialsSection.querySelector('.testimonials__mob-btn');
        let margin = 8;

        if (list && btn && listItems.length) {
            const toggleHideItems = () => {
                if (document.documentElement.clientWidth < 768 && !testimonialsSection.classList.contains('testimonials--showed')) {
                    listItems.forEach((item, index) => {
                        if (index > 1) {
                            item.classList.add('d-none')
                        }
                    })
                } else {
                    listItems.forEach(item => {
                        item.classList.remove('d-none')
                    })
                }
            }

            toggleHideItems();

            window.addEventListener('resize', toggleHideItems)


            btn.addEventListener('click', (e) => {
                e.preventDefault();
                listItems.forEach(item => {
                    item.classList.remove('d-none')
                })
                btn.style.display = 'none';
                testimonialsSection.classList.add('testimonials--showed')

            })
        }
    }

    let testimonialsListAll = document.querySelectorAll('[data-testimonials-list]');
    if (testimonialsListAll.length) {
        testimonialsListAll.forEach(testimonialsList => {
            let items = Array.from(testimonialsList.children);
            if (items.length > 9) {
                let btnWrap = document.createElement('div');
                btnWrap.className = 'testimonials-list-btn-wrap text-center'

                let btn = document.createElement('a');
                btn.className = 'btn btn--dark';
                btn.innerHTML = '???????????????? ?????? ????????????';
                btnWrap.append(btn);

                testimonialsList.after(btnWrap);

                items.forEach((item, index) => {
                    if (index > 8) {
                        item.classList.add('d-none');
                    }
                })

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (testimonialsList.classList.contains('show-all-items')) {
                        testimonialsList.classList.remove('show-all-items');

                        items.forEach((item, index) => {
                            if (index > 8) {
                                item.classList.add('d-none');
                            }
                        })
                        btn.innerHTML = '???????????????? ?????? ????????????';
                    } else {
                        testimonialsList.classList.add('show-all-items');

                        items.forEach((item) => {
                            item.classList.remove('d-none');
                        })

                        btn.innerHTML = '????????????????';
                    }

                })
            }
        })
    }
};
		{
    let testimonialCards = document.querySelectorAll('[data-testimonial-card]');
    if(testimonialCards.length) {
        testimonialCards.forEach(testimonialCard => {
            let text = testimonialCard.querySelector('.testimonial-card__text');
            let stringLength = 151;
            let str = text.innerText.trim();

			if (str.length <= stringLength) return;
			text.innerText = [...str].slice(0, stringLength).join('') + '...';

            text.insertAdjacentHTML('beforeend', '<br> <a href="#" class="testimonial-card__read-more">???????????? ??????????????????</a>');

            let btn = testimonialCard.querySelector('.testimonial-card__read-more');
            if(btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    text.innerHTML = str;
                })
            }
        })
    }
};
		{
    let comments = document.querySelectorAll('.commentlist .comment');
    if(comments.length) {
        comments.forEach(comment => {
            let author = comment.querySelector(".comment-author");
            let name = comment.querySelector(".comment-author .fn");
            let metaData = comment.querySelector('.commentmetadata');
            let likesButtonsWrap = comment.querySelector('.cld-like-dislike-wrap');
            let replyButton = comment.querySelector('.reply');

            if(name && metaData) {
                metaData.prepend(name);
            }

            if(likesButtonsWrap && replyButton) {
                likesButtonsWrap.prepend(replyButton);
            }

            if(author && metaData) {
                let authorWrap = document.createElement('div');
                authorWrap.className = 'comment-author-wrap';
                author.after(authorWrap);

                authorWrap.append(author);
                authorWrap.append(metaData);
            }
        })
    }
};
		// {
//     let sticyBox = document.querySelector('.main-grid__sticky-box');
//     if (sticyBox) {
//         let header = document.querySelector('[data-header]');
//         let currentScrollValue = window.pageYOffset;
//         let sticyBoxMouseOver = false;
//         let sticyScrollValue = 0;

//         window.addEventListener('scroll', (e) => {

//             if (window.pageYOffset > currentScrollValue) {
//                 if ((sticyBox.offsetTop + sticyBox.clientHeight) > (sticyBox.parentElement.clientHeight - 100)) {
//                     sticyBox.style.transform = `translateY(0px)`;
//                 } else {
//                     if (sticyBoxMouseOver && document.documentElement.clientWidth > 991.98) {
//                         if (sticyBox.clientHeight > (document.documentElement.clientHeight - header.clientHeight - 50)) {
//                             sticyBox.style.transform = `translateY(-${sticyBox.clientHeight - (document.documentElement.clientHeight - header.clientHeight - 50)}px)`
//                         }
//                     }
//                 }
//             } else {
//                 if (sticyBox.offsetTop < 50) {
//                     sticyBox.style.transform = `translateY(0px)`;
//                 } else {
//                     if (sticyBoxMouseOver && document.documentElement.clientWidth > 991.98) {
//                         sticyBox.style.transform = `translateY(0px)`;
//                     }
//                 }
//             }

//             currentScrollValue = window.pageYOffset;
//         })

//         sticyBox.addEventListener('mouseenter', () => {
//             sticyBoxMouseOver = true;
//         })
//         sticyBox.addEventListener('mouseleave', () => {
//             sticyBoxMouseOver = false;
//         })
//     }
// };

	}

	componentsScriptsBeforeLoad() {
		{
    let faqList = document.querySelector('[data-faq-list]');
    if(faqList) {
        let items = Array.from(faqList.children);

        if(items.length) {
            items.forEach(item => {
                let previewText = item.querySelector('.faq-list__preview-text');
                let collapsedText = item.querySelector('.faq-list__collaps');
                let title = item.querySelector('.faq-list__title');
                let btn = item.querySelector('.faq-list__btn');
                let btnText = null;

                if(btn) {
                    btnText = btn.innerHTML;
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if(item.classList.contains('text-is-show')) {
                            item.classList.remove('text-is-show');
                            btn.innerHTML = btnText;
                            this.utils.slideDown(previewText, 200);
                            this.utils.slideUp(collapsedText, 400);
                        } else {
                            item.classList.add('text-is-show');
                            btn.innerHTML = btn.dataset.text;
                            this.utils.slideUp(previewText, 200);
                            this.utils.slideDown(collapsedText, 400);
                        }
                    })
                }

                
                title.addEventListener('click', (e) => {
                    e.preventDefault();
                    if(item.classList.contains('text-is-show')) {
                        item.classList.remove('text-is-show');
                        if(previewText) this.utils.slideDown(previewText, 200);
                        this.utils.slideUp(collapsedText, 400);

                        if(btn) btn.innerHTML = btnText;
                    } else {
                        item.classList.add('text-is-show');
                        if(previewText) this.utils.slideUp(previewText, 200);
                        this.utils.slideDown(collapsedText, 400);

                        if(btn) btn.innerHTML = btn.dataset.text;
                    }
                })
            })
        }
    }
};
		{
    let portfolioCards = document.querySelectorAll('[data-portfolio-card]');
    if(portfolioCards.length) {
        portfolioCards.forEach(portfolioCard => {
            let col1 = portfolioCard.querySelector('.portfolio-card__col-1');
            let head = portfolioCard.querySelector('.portfolio-card__head');
            let review = portfolioCard.querySelector('.portfolio-card__review');

            const changePostion = () => {
                if(document.documentElement.clientWidth < 992) {
                    head.after(col1);
                } else {
                    portfolioCard.prepend(col1);
                }
            }

            const setMarginTop = () => {
                if(review) {
                    if(document.documentElement.clientWidth > 991.92) {
                        review.style.marginTop = -(review.clientHeight / 2) + 'px';
                    }
                }
            }
            setMarginTop();
            changePostion();

            window.addEventListener('resize', () => {
                setMarginTop();
                changePostion();
            });
        })
    }
};
		{
    let articleCards = document.querySelectorAll('[data-article-card]');
    if(articleCards.length) {
        articleCards.forEach(articleCard => {
            let title = articleCard.querySelector('.article-card__titel');
            let ratingParent = articleCard.querySelector('.article-card__mera-row-2');
            let rating = articleCard.querySelector('.rating, .kk-star-ratings');
            let reviewsParent = articleCard.querySelector('.article-card__mera-row-1');
            let reviews = articleCard.querySelector('.article-card__reviews');
            let metaList = articleCard.querySelector('.article-card__meta-list');

            const changePosition = () => {
                if(document.documentElement.clientWidth < 768) {
                    title.after(rating);
                    metaList.after(reviews);
                } else {
                    ratingParent.append(rating);
                    reviewsParent.prepend(reviews);
                }   
            }

            changePosition();

            window.addEventListener('resize', changePosition);
        })
    }
};
		{
    let commnetFormTextarea = document.querySelector('[data-comment-form] .textarea');
    let submit = document.querySelector('[data-comment-form] .comments__form-btn');
    if(commnetFormTextarea && submit) {
        commnetFormTextarea.addEventListener('input', () => {
            if(commnetFormTextarea.value.length) {
                submit.classList.remove('disabled');
            } else {
                submit.classList.add('disabled');
            }
        })
    }
};
		{
    let links = document.querySelectorAll('.links-group a');
    if(links.length) {
        links.forEach(link => {
            link.innerHTML = link.innerText.split(' ').map(word => `<span>${word}</span>`).join('');
        })
    }
};
		{
    let links = document.querySelectorAll('.content-list a');
    if(links.length) {
        links.forEach(link => {
            link.innerHTML = link.innerText.split(' ').map(word => `<span>${word}</span>`).join('');
        })
    }
};
		
let servicesQuestionsLists = document.querySelectorAll('[data-services-questions-list]');
if(servicesQuestionsLists.length) {
    servicesQuestionsLists.forEach(servicesQuestionsList => {
        let items = Array.from(servicesQuestionsList.children);
  
        if(items.length > 10) {
            
            let btnWrap = document.createElement('div');
            btnWrap.className = 'button-wrap button-wrap--bottom text-center'

            let btn = document.createElement('a');
            btn.className = 'btn btn--dark';
            btn.innerHTML = '???????????????? ?????? ????????????';
            btnWrap.append(btn);

            servicesQuestionsList.after(btnWrap);

            items.forEach((item, index) => {
                if(index > 9) {
                    item.classList.add('d-none');
                }
            })

            btn.addEventListener('click', (e) => {
                e.preventDefault();

                if(servicesQuestionsList.classList.contains('show-all-items')) {
                    servicesQuestionsList.classList.remove('show-all-items');

                    items.forEach((item, index) => {
                        if(index > 9) {
                            item.classList.add('d-none');
                        }
                    })
                    btn.innerHTML = '???????????????? ?????? ????????????';
                } else {
                    servicesQuestionsList.classList.add('show-all-items');
                    
                    items.forEach((item) => {
                        item.classList.remove('d-none');
                    })
                    
                    btn.innerHTML = '????????????????';
                }


            })
        }
    })
};
		let ctaFeedback = document.querySelector('.cta--feedback');
if(ctaFeedback) {
    let footer = document.querySelector('.footer');
    if(footer) {
        footer.classList.add('pt-0-mob');
    }
};
		let dataAdvantageSections = document.querySelectorAll('[data-advantage]');
if(dataAdvantageSections.length) {
    dataAdvantageSections.forEach(dataAdvantageSection => {
        let rows = dataAdvantageSection.querySelectorAll('.advantage__row');
        let textWrapAll = dataAdvantageSection.querySelectorAll('.advantage__text-wrap');
        
        if(rows.length) {
            rows.forEach(row => {
                let col1 = row.querySelector('.advantage__col--1');
                let col2 = row.querySelector('.advantage__col--2');
                let text1 = col1.querySelector('.advantage__text-wrap');
                let text2 = col2.querySelector('.advantage__text-wrap');


                col1.addEventListener('mouseenter', () => {
                    row.classList.remove('show-flaws');
                })
                col2.addEventListener('mouseenter', () => {
                    row.classList.add('show-flaws');
                })

                const setMinWidth = () => {
                    let widthValue = 0;
                    if(row.classList.contains('show-flaws')) {
                        widthValue = text2.parentElement.clientWidth;
                    } else {
                        widthValue = text1.parentElement.clientWidth;
                    }

                    if(document.documentElement.clientWidth > 992) {
                        return;
                    } else if(document.documentElement.clientWidth > 768) {
                        text1.style.minWidth = widthValue - 64 + 'px';
                        text2.style.minWidth = widthValue - 64 + 'px';
                    } else if(document.documentElement.clientWidth > 414) {
                        text1.style.minWidth = widthValue - 32 + 'px';
                        text2.style.minWidth = widthValue - 32 + 'px';
                    }
                }

                setMinWidth();

                window.addEventListener('resize', setMinWidth);
            })
        }
    })
};
		;
	}
}

window.addEventListener('DOMContentLoaded', function () {
	let app = new App();
	app.init();
});

