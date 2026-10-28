// ===== Configuración =====
// Número de WhatsApp (código de país + número, sin + ni espacios).
const WHATSAPP_NUMBER = "573204770469";

// ===== Menú móvil =====
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
  const abierto = menu.classList.toggle("open");
  menuBtn.classList.toggle("open", abierto);
  menuBtn.setAttribute("aria-expanded", abierto);
});

// Cierra el menú al tocar un enlace
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ===== Aparición al hacer scroll =====
const revelar = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revelar.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revelar.observe(el));

// ===== Formulario -> WhatsApp =====
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const negocio = document.getElementById("negocio").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !mensaje) {
    formMsg.textContent = "Por favor completa tu nombre y el mensaje.";
    formMsg.classList.add("error");
    return;
  }

  formMsg.classList.remove("error");
  formMsg.textContent = "Abriendo WhatsApp...";

  const texto =
    `Hola Jeison, soy ${nombre}` +
    (negocio ? ` de ${negocio}` : "") +
    `.\n${mensaje}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank", "noopener");
  form.reset();
});

// ===== Año del footer =====
document.getElementById("year").textContent = new Date().getFullYear();
