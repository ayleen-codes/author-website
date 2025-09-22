const form = document.getElementById("signupForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
  e.preventDefault(); // stop normal redirect

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
