// Define a function to initialize EmailJS
function initializeEmailJS() {
    emailjs.init("mKAkcvOsTh9tEfVVs");
  }
  
  // Define a function to handle form submission using EmailJS
  function handleFormSubmission() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault(); 
      emailjs.sendForm('service_ww48tbo', 'template_rpjkpr9', this)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message sent successfully!');
        }, function(error) {
          console.log('FAILED...', error);
          alert('Message sending failed!');
        });
    });
  }
  
  // Call the initialization function
  initializeEmailJS();
  
  // Call the form submission handling function
  handleFormSubmission();
  const wrapper = document.querySelector(".wrapper"),
    form = document.querySelector("form"),
    fileInp = form.querySelector("input"),
    infoText = form.querySelector("p"),
    closeBtn = document.querySelector(".close"),
    copyBtn = document.querySelector(".copy");

  function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(result => {
      result = result[0].symbol[0].data;
      infoText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR Code";
      if (!result) return;
      document.querySelector("textarea").innerText = result;
      form.querySelector("img").src = URL.createObjectURL(file);
      wrapper.classList.add("active");
      const downloadLink = document.getElementById('download-link');
      downloadLink.href = `data:text/plain;charset=utf-8,${encodeURIComponent(result)}`;
      downloadLink.classList.remove("hidden");
    }).catch(() => {
      infoText.innerText = "Couldn't scan QR Code";
    });
  }

  fileInp.addEventListener("change", async e => {
    let file = e.target.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
  });

  copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
  });

  form.addEventListener("click", () => fileInp.click());
  closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));