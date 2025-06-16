document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("email_usuario");

  if (!email) {
    // Si no estás autenticado, regresamos al inicio de sesión
    window.location.href = "iniciosesion.html";
  } else {
    document.getElementById("email_usuario_perfil").innerHTML = email;

    // Cierre de sesión opcional
    document.getElementById("cerrar-sesion").addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.removeItem("email_usuario");

      window.location.href = "iniciosesion.html";
    });
  }
});

