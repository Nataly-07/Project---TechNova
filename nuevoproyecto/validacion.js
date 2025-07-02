document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("iniciosesion");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    
    function mostrarMsg(texto, tipo = "error") {
      const msgFlotante = document.getElementById("msg-flotante");

      msgFlotante.textContent = texto;
      msgFlotante.classList.remove("oculto");

      msgFlotante.classList.remove("error", "success");

      msgFlotante.classList.add(tipo);
      msgFlotante.classList.add("active");

      setTimeout(() => {
        msgFlotante.classList.remove("active");

        setTimeout(() => {
          msgFlotante.classList.add("oculto");

        }, 500);
      }, 3000);
    }

    
    if (email === '' || password === '') {
      mostrarMsg("Todos los campos son obligatorios.", "error");

    } else if (password.length < 6) {
      mostrarMsg("La contraseña debe tener al menos 6 dígitos.", "error");

    } else {
    
      localStorage.setItem("email_usuario", email);
      localStorage.setItem("password_usuario", password);
      mostrarMsg("Inicio de sesión exitoso.", "success");

      
      form.reset();

      setTimeout(() => {
        window.location.href = "perfilad.html";
      }, 1000);
    }
  });
});

