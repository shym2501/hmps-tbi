window.addEventListener("scroll", function() {
  const header = document.querySelector(".headerHome");
  header.classList.toggle("sticky", window.scrollY > 150);

  const carousel = document.querySelector(".carousel");
  carousel.classList.toggle("sticky", window.scrollY > 150);
});

const path = window.location.pathname.replace(/[&\/\\#]/g, "")
const tab = document.querySelector(`a[href='${path}']`)
tab.classList.add('blue800');
tab.classList.remove('gray100');