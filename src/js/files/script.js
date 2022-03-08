// Подключение функционала "Чертогов Фрилансера"
import { isMobile, removeClasses } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

window.onload = function () {
   document.addEventListener("click", documentActions);

   function documentActions(e) {
      const targetElement = e.target;
      if (window.innerWidth > 768 && isMobile.any()) {
         if (targetElement.classList.contains('menu__arrow')) {
            targetElement.closest('.menu__item').classList.toggle('_hover');
         }
         if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
            removeClasses(document.querySelectorAll('.menu__item._hover'), "_hover")
         }
      }
      if (targetElement.classList.contains('search-form__icon')) {
         document.querySelector('.search-form').classList.toggle('_active');
      } else if (!targetElement.closest('.search-form') &&  document.querySelector('.search-form._active')) {
         document.querySelector('.search-form._active').classList.remove('_active');
      }
      if (targetElement.classList.contains('actions-product__button')) {
         const productId = targetElement.closest('.item-product').dataset.pid;         
         addToCart(targetElement, productId);
         e.preventDefault();
      }
      if (targetElement.classList.contains('cart-header__icon') || (targetElement.closest('cart-header__icon'))) {
         if (document.querySelector('.cart-list').children.length > 0) {
            document.querySelector('.cart-header').classList.toggle('_active');
         }
         e.preventDefault();
      } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
         document.querySelector('.cart-header').classList.remove('_active');
      }
      if (targetElement.classList.contains('cart-list__delete')) {
         const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
         updateCart(targetElement, productId, false);
         e.preventDefault();
      }
   }

   const headerElement = document.querySelector('.header');

   const callback = function(entries, observer) {
      if (entries[0].isIntersecting) {
         headerElement.classList.remove('_scroll');
      } else {         
         headerElement.classList.add('_scroll');
      }
   }

   const headerOvserver = new IntersectionObserver(callback);
   headerOvserver.observe(headerElement);

   function addToCart(productButton, productId) {
      if(!productButton.classList.contains('_hold')) {
         productButton.classList.add('_hold');
         productButton.classList.add('_fly');

         const cart = document.querySelector('.cart-header__icon');         
         const product = document.querySelector(`[data-pid="${productId}"]`);         
         const productImage = product.querySelector('.item-product__image-ibg');

         const productImageFly = productImage.cloneNode(true);

         const productImageFlyWidth = productImage.offsetWidth;
         const productImageFlyHeight = productImage.offsetHeight;
         const productImageFlyTop = productImage.getBoundingClientRect().top;
         const productImageFlyLeft = productImage.getBoundingClientRect().left;


         productImageFly.setAttribute('class', '_flyImage-ibg');
         productImageFly.style.cssText = 
         `
            left: ${productImageFlyLeft}px;
            top: ${productImageFlyTop}px;
            width: ${productImageFlyWidth}px;
            height: ${productImageFlyHeight}px;
         `;
         document.body.append(productImageFly);

         const cartFlyLeft = cart.getBoundingClientRect().left;
         const cartFlyTop = cart.getBoundingClientRect().top;

         productImageFly.style.cssText = 
         `
            left: ${cartFlyLeft}px;
            top: ${cartFlyTop}px;
            width: 0px;
            height: 0px;
            opacity: 0;
         `;

         productImageFly.addEventListener('transitionend', function() {
            if (productButton.classList.contains('_fly')) {
               productImageFly.remove();
               updateCart(productButton, productId);
               productButton.classList.remove('_fly');
            }
         });
      }
   }

   function updateCart(productButton, productId, productAdd = true) {
      const cart = document.querySelector('.cart-header');
      const cartIcon = cart.querySelector('.cart-header__icon');
      const cartQuantity = cartIcon.querySelector('span');      
      const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
      const cartList = document.querySelector('.cart-list');

      if (productAdd) {
         if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
         } else {
            cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
         }
         if (!cartProduct) {
            const product = document.querySelector(`[data-pid="${productId}"]`);
            const cartProductImage = product.querySelector('.item-product__image-ibg').innerHTML;
            const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
            const cartProductContent = `
               <a href="" class="cart-list__image-ibg">${cartProductImage}</a>
               <div class="cart-list__body">
                  <a href="" class="cart-list__title">${cartProductTitle}</a>
                  <div class="cart-list__quantity">Quantity: <span>1</span></div>
                  <a href="" class="cart-list__delete">Delete</a>
               </div>`;
            cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`)
         } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
         }
         productButton.classList.remove('_hold');
      } else {
         const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
         cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
         if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
         }

         const cartQuantityValue = --cartQuantity.innerHTML;

         if (cartQuantityValue) {
            cartQuantity.innerHTML = cartQuantityValue;
         } else {
            cartQuantity.remove();
            cart.classList.remove('_active');
         }
      }
   }
   
   const furniture = document.querySelector('.furniture__body');
   if (furniture && !isMobile.any()) {
      const furnitureItems = document.querySelector('.furniture__items');
      const furnitureColumn = document.querySelectorAll('.furniture__column');

      let speed = furniture.dataset.speed;

      let positionX = 0;
      let coordXprocent = 0;

      function setMouseGalleryStyle() {
         let furnitureItemsWidth = 0;
         furnitureColumn.forEach(element => {
            furnitureItemsWidth += element.offsetWidth;
         });

         const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;
         const distX = Math.floor(coordXprocent - positionX);

         positionX = positionX + (distX * speed);
         let position = furnitureDifferent / 200 * positionX;         

         furnitureItems.style.cssText = `transform: translate(${-position}px,0);`;
         

         if (Math.abs(distX) > 0) {
            requestAnimationFrame(setMouseGalleryStyle);
         } else {
            furniture.classList.remove('_init');
         }
      }

      furniture.addEventListener('mousemove', function(e) {
         const furnitureWidth = furniture.offsetWidth;

         const coordX = e.pageX - furnitureWidth / 2;

         coordXprocent = coordX / furnitureWidth * 200;

         if (!furniture.classList.contains('_init')) {
            requestAnimationFrame(setMouseGalleryStyle);
            furniture.classList.add('_init');
         }
      });
   }
} 