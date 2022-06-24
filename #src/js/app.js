@@include('files/utils.js');
@@include('files/dynamic_adapt.js');

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
		@@include('../common/header/header.js');
	}

	setPageMinHeight() {
		let page = document.querySelector('._page');
		if(page) {
			let footer = document.querySelector('.footer');
			const setHeight = () => {
				if(footer) {
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
		@@include('../common/popup/popup.js');
	}

	slidersInit() {
		@@include('../common/carousel/carousel.js');
		@@include('../common/promo-header/promo-header.js');
		@@include('../common/team-carousel/team-carousel.js');
		@@include('../common/documents-section/documents-section.js');
		@@include('../common/info-cards-list/info-cards-list.js');
		@@include('../common/gallery/gallery.js');
		@@include('../common/certificates/certificates.js');
		@@include('../common/image-carousel/image-carousel.js');
		@@include('../common/gallery-second/gallery-second.js');
	}


	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = Array.from(tabsContainer.querySelectorAll('[data-tab-trigger]'));
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));
				let select = tabsContainer.querySelector('[data-tab-select]');

				if(tabsContainer.dataset.tabs === 'sub') {
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
					if(activeItem) {
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

				if(select) {
					select.addEventListener('change', (e) => {
						getContentItem(e.target.value).classList.add('tab-active');

						contentItems.forEach(item => {
							if(getContentItem(e.target.value) === item) return;

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
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						// init
						if(trigger.classList.contains('active')) {
							content.style.display = 'block';
							parent.classList.add('active');
						}

						trigger.addEventListener('click', (e) => {
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
						})
					})
				}
			})
		}
	}

	filterInit() {
		let filters = document.querySelectorAll('[data-filter]');
		if(filters.length) {
			filters.forEach(filter => {
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
							if(i === trigger) return;

							i.classList.remove('active');
						})

						if(trigger.dataset.filterTrigger === '*') {
							filterItems.forEach(item => {
								item.el.classList.remove('d-none');
							})
						} else {
							filterItems.forEach(item => {
								if(item.multipleId.includes(trigger.dataset.filterTrigger)) {
									item.el.classList.remove('d-none');
								} else {
									item.el.classList.add('d-none');
								}
							})
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
		@@include('../common/select/select.js');
	}

	setFontSize() {
		let elements = document.querySelectorAll('[data-set-font-size]');
		if (elements.length) {
			elements.forEach(el => {
				const setFontSize = () => {
					if(document.documentElement.clientWidth > 992) {
						let value = 10 / 1903 * el.clientWidth;
						if(value > 10) value = 10;
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
	}

	componentsScripts() {
		@@include('../common/technology/technology.js');
		@@include('../common/quiz/quiz.js');
		@@include('../common/rating/rating.js');
		@@include('../common/frequently-questions/frequently-questions.js');
		@@include('../common/testimonials/testimonials.js');
		@@include('../common/testimonial-card/testimonial-card.js');
		@@include('../common/comments/comment.js');
		@@include('../common/main-grid/main-grid.js');

	}

	componentsScriptsBeforeLoad() {
		@@include('../common/faq-list/faq-list.js');
		@@include('../common/portfolio-card/portfolio-card.js');
		@@include('../common/article-card/article-card.js');
		@@include('../common/comment-form/comment-form.js');
		@@include('../common/links-group/links-group.js');
		@@include('../common/content-list/content-list.js');
		@@include('../common/services-questions/services-questions.js');
		@@include('../common/cta/cta.js');
	}
}

window.addEventListener('DOMContentLoaded', function () {
	let app = new App();
	app.init();
});

