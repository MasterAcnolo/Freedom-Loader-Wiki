document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarRight = document.querySelector('.navbar-right');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navbarRight.classList.toggle('active');
  });
});
