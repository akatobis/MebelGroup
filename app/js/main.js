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
});