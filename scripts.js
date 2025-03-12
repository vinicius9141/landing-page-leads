document.addEventListener('DOMContentLoaded', function() {
  const leadForm = document.getElementById('leadForm');
  const leadFormSection = document.getElementById('leadFormSection');
  const productPage = document.getElementById('productPage');
  const phoneInput = document.getElementById('phone');
  const countdownMinutes = document.getElementById('minutes');
  const countdownSeconds = document.getElementById('seconds');
  const welcomeMessage = document.getElementById('welcomeMessage');

  VMasker(phoneInput).maskPattern('(99) 99999-9999');

  leadForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;

      if (validateEmail(email) && validatePhone(phone)) {
          leadFormSection.innerHTML = `
              <div class="text-center">
                  <h2>Obrigado, ${name}!</h2>
                  <p class="transition-text">Seu cadastro foi realizado com sucesso.</p>
                  <p class="transition-text">Redirecionando para a página do produto...</p>
              </div>
          `;
          setTimeout(() => {
              leadFormSection.style.display = 'none';
              productPage.style.display = 'block';
              welcomeMessage.innerText = `Seja bem-vindo, ${name}!`;
          }, 2000);
      } else {
          alert('Por favor, insira um e-mail e telefone válidos.');
      }
  });

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
      const re = /^\(\d{2}\) \d{5}-\d{4}$/;
      return re.test(phone);
  }

  let time = 300; 

  function updateCountdown() {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      countdownMinutes.textContent = String(minutes).padStart(2, '0');
      countdownSeconds.textContent = String(seconds).padStart(2, '0');

      if (time > 0) {
          time--;
      } else {
          clearInterval(countdownInterval);
      }
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
});