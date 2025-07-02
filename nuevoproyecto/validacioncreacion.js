document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registro-form");
  const inputs = form.querySelectorAll("input, select");
  const btnEnviar = document.getElementById("btn-enviar");
  const mensaje = document.getElementById("mensaje");

  const validators = {
    nombre: (val) => /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{3,}$/.test(val),
    apellido: (val) => /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{4,}$/.test(val),
    "tipo-doc": (val) => val !== "",
    documento: (val) => /^\d{7,10}$/.test(val),
    correo: (val) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val),
    "confirmar-correo": () =>
      document.getElementById("confirmar-correo").value ===
      document.getElementById("correo").value,
    telefono: (val) => /^\d{10}$/.test(val),
    direccion: (val) => val.trim().length >= 8,
    password: (val) =>
      /[A-Z]/.test(val) &&
      /[a-z]/.test(val) &&
      /[0-9]/.test(val) &&
      /[\W_]/.test(val) &&
      val.length >= 8,
    "confirmar-password": () =>
      document.getElementById("confirmar-password").value ===
      document.getElementById("password").value,
  };

  function validar(input) {
    const id = input.id;
    const val = input.value.trim();
    const icono = document.getElementById(`icono-${id}`);
    const error = document.getElementById(`error-${id}`);

    let esValido = false;
    if (validators[id]) {
      esValido =
        typeof validators[id] === "function" ? validators[id](val) : false;
    }

    if (icono) {
      input.classList.toggle("valid", esValido);
      input.classList.toggle("invalid", !esValido);
    }

    if (error) {
      error.classList.toggle("valid", esValido);
    }

    if (id === "password") {
      document.querySelector('[data-req="length"]').classList.toggle("valid", val.length >= 8);
      document.querySelector('[data-req="upper"]').classList.toggle("valid", /[A-Z]/.test(val));
      document.querySelector('[data-req="lower"]').classList.toggle("valid", /[a-z]/.test(val));
      document.querySelector('[data-req="digit"]').classList.toggle("valid", /[0-9]/.test(val));
      document.querySelector('[data-req="special"]').classList.toggle("valid", /[\W_]/.test(val));
    }

    return esValido;
  }

  function validarTodo() {
    return Array.from(inputs).every((input) => validar(input));
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validar(input);
      btnEnviar.disabled = !validarTodo();
    });

    input.addEventListener("blur", () => {
      validar(input);
      btnEnviar.disabled = !validarTodo();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validarTodo()) {
      mensaje.textContent = "✅ Cuenta creada exitosamente.";
      mensaje.className = "mensaje-confirmacion mensaje-exito";
      form.reset();
      inputs.forEach((i) => {
        i.classList.remove("valid", "invalid");
        const icono = document.getElementById(`icono-${i.id}`);
        const error = document.getElementById(`error-${i.id}`);
        if (icono) icono.textContent = "";
        if (error) error.classList.remove("valid");
      });
      document
        .querySelectorAll(".password-requisitos .requisito")
        .forEach((el) => el.classList.remove("valid"));
      btnEnviar.disabled = true;
    }
  });
});
