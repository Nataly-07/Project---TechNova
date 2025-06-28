document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registro-form");
  const inputs = form.querySelectorAll("input, select");
  const btnEnviar = document.getElementById("btn-enviar");
  const mensaje = document.getElementById("mensaje");

  const validators = {
    nombre: (val) => /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{2,}$/.test(val),
    apellido: (val) => /^[a-zA-ZÁÉÍÓÚáéíóúñÑ\s]{2,}$/.test(val),
    "tipo-doc": (val) => val !== "",
    documento: (val) => /^\d{7,10}$/.test(val),
    correo: (val) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val),
    "confirmar-correo": () =>
      document.getElementById("confirmar-correo").value ===
      document.getElementById("correo").value,
    telefono: (val) => /^\d{10}$/.test(val),
    direccion: (val) => val.trim().length >= 5,
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
    const valor = input.value.trim();
    const icono = document.getElementById(`icono-${id}`);
    const error = document.getElementById(`error-${id}`);

    let esValido = false;
    if (validators[id]) {
      esValido = typeof validators[id] === "function"
        ? validators[id](valor)
        : false;
    }

    input.classList.toggle("valid", esValido);
    input.classList.toggle("invalid", !esValido);
    if (icono) {
      icono.textContent = esValido ? "✅" : "❌";
    }

    error.textContent = esValido ? "" : "Campo obligatorio o inválido";
    return esValido;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validar(input);
      validarTodo();
    });
    input.addEventListener("blur", () => validar(input));
  });

  function validarTodo() {
    const validos = Array.from(inputs).every((i) => validar(i));
    btnEnviar.disabled = !validos;
    return validos;
  }

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
        if (error) error.textContent = "";
      });
      btnEnviar.disabled = true;
    }
  });
});
