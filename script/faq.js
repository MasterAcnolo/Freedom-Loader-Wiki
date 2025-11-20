const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    faqItems.forEach(otherItem => {
      if(otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});
