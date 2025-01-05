// Simple contact form validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
  
    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }
  
    // Example basic email format check:
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    // If everything is fine, you can send the form data
    // For example, you might want to use an email API or a backend endpoint
    alert('Thank you for reaching out! I will get back to you soon.');
    
    // Clear the form
    this.reset();
  });
  