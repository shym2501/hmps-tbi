window.addEventListener("scroll", function(){
  const header = document.querySelector(".headerHome");
  header.classList.toggle("sticky", window.scrollY > 150);
  
  const carousel = document.querySelector(".carousel");
  carousel.classList.toggle("sticky", window.scrollY > 150);
});