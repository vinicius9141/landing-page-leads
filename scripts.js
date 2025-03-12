document.addEventListener('DOMContentLoaded', function() {
  const leadForm = document.getElementById('leadForm');
  const leadFormSection = document.getElementById('leadFormSection');
  const productPage = document.getElementById('productPage');
  const phoneInput = document.getElementById('phone');
  const countdownMinutes = document.getElementById('minutes');
  const countdownSeconds = document.getElementById('seconds');
  const welcomeMessage = document.getElementById('welcomeMessage'); // Elemento para a mensagem de boas-vindas

  // Máscara para o telefone
  VMasker(phoneInput).maskPattern('(99) 99999-9999');

  // Validação do formulário
  leadForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;

      if (validateEmail(email) && validatePhone(phone)) {
          // Feedback visual
          leadFormSection.innerHTML = `
              <div class="text-center">
                  <h2>Obrigado, ${name}!</h2>
                  <p class="transition-text">Seu cadastro foi realizado com sucesso.</p>
                  <p class="transition-text">Redirecionando para a página do produto...</p>
              </div>
          `;

          // Exibir a página do produto após 2 segundos
          setTimeout(() => {
              leadFormSection.style.display = 'none';
              productPage.style.display = 'block';
              welcomeMessage.innerText = `Seja bem-vindo, ${name}!`; // Atualiza a mensagem de boas-vindas
          }, 20000); // Reduzido para 2 segundos
      } else {
          alert('Por favor, insira um e-mail e telefone válidos.');
      }
  });

  // Validação de e-mail
  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

  // Validação de telefone
  function validatePhone(phone) {
      const re = /^\(\d{2}\) \d{5}-\d{4}$/;
      return re.test(phone);
  }

  // Timer Countdown
  let time = 300; // 5 minutos em segundos

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