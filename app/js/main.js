$(() => {
   //icon search
   $('#search').click( () => {
      $('.menu-item').addClass('hide-item');
      $('.header__search-form').addClass('active');
      $('.close').addClass('active');
      $('#search').hide();
   })
   $('.close').click(() => {
      $('.menu-item').removeClass('hide-item');
      $('.header__search-form').removeClass('active');
      $('.close').removeClass('active');
      $('#search').show();
   })

   // sticky scroll header
   window.addEventListener('scroll', () => {
      const header = document.querySelector('.header__top-inner');
      header.classList.toggle('sticky', window.scrollY > 0)
   })

   // slider
   $('.slider__inner').slick({
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
   })

   // Load more
   $('#load-more').click(() => {
      $('#boxs .box:hidden').slice(0, 4).slideDown()
         if ($('#boxs .box:hidden').length === 0){
            $('load-more').fadeOut('slow')
         }
   })
});