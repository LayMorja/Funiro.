/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Autoplay, Parallax, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.slider-main')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.slider-main__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Autoplay, Parallax, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 32,
			// autoHeight: true,
			speed: 800,
         parallax: true,

			//touchRatio: 0,
			//simulateTouch: false,
			loop: true,
			//preloadImages: false,
			//lazy: true,

			
			// Эффекты
			// effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
            pauseOnMouseEnter: true,
			},
			

			// Пагинация
			
			pagination: {
				el: '.controls-slider-main__dotts',
				clickable: true,
			},
			

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.slider-main .slider-arrow_prev',
				nextEl: '.slider-main .slider-arrow_next',
			},

			// Брейкпоинты
			/*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// События
			on: {

			}
		});
	}
   if (document.querySelector('.slider-rooms__body')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.slider-rooms__body', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Parallax, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 'auto',
			spaceBetween: 24,
			speed: 800,
         parallax: true,
			loop: true,
         preloadImages: false,
         loopAdditionalSlides: 5,
         watchOverflow: true,
			pagination: {
				el: '.slider-rooms__dotts',
				clickable: true,
			},
			navigation: {
				prevEl: '.slider-rooms .slider-arrow_prev',
				nextEl: '.slider-rooms .slider-arrow_next',
			},
		});
	}
   if (document.querySelector('.slider-tips__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.slider-tips__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 32,
			speed: 800,
			loop: true,
         watchOverflow: true,
			pagination: {
				el: '.slider-tips__dotts',
				clickable: true,
			},
			navigation: {
				prevEl: '.slider-tips .slider-arrow_prev',
				nextEl: '.slider-tips .slider-arrow_next',
			},
         breakpoints: {
            320: {
               slidesPerView: 1.1,
               spaceBetween: 15,
            },
            768: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            992: {
               slidesPerView: 3,
               spaceBetween: 32,
            }
         }
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
/*
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}
*/
window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});