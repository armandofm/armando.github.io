
$('#portfolio a').nivoLightbox({
        effect: 'fadeScale',
    });


   $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
   
   $('a[href="#topo"]').click(function(){
       $('html, body').animate({scrollTop: 0}, 'slow');
       return false;
   });