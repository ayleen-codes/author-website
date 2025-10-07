const form = document.getElementById("signupForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSdYA7ViY9DHOqLIEq5lINH4-yXq34Ht3eSNrZMNABl9ccRZCg/formResponse", {
    method: "POST",
    body: formData,
    mode: "no-cors"
  })
  .then(() => {
    form.style.display = "none"; 
    message.style.display = "block";
  })
  .catch(() => {
    alert("Something went wrong. Please try again.");
  });
});

const preorderForm = document.getElementById("preorderForm");
const preorderMessage = document.getElementById("formMessagePreorder");

preorderForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData2 = new FormData(preorderForm);
  
  fetch("https://docs.google.com/forms/d/e/1FAIpQLSepenLS9plJ2DDbICjHcrPP7-MuS0z4wSsl8x-Wvp3L-TNMsw/formResponse", {
    method: "POST",
    body: formData2,
    mode: "no-cors"
  })
  .then(() => {
    preorderForm.style.display = "none"; 
    preorderMessage.style.display = "block";
  })
  .catch(() => {
    alert("Something went wrong. Please try again.");
  });
});

