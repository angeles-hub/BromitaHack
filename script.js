// =========================
// Nombre desde URL
// =========================
const parametros = new URLSearchParams(window.location.search);
const nombre = parametros.get("nombre") ? parametros.get("nombre") : "Usuario";

// Mensajes del análisis (según tu lista)
const mensajes = [
  "Iniciando conexión...",
  "Buscando dispositivo...",
  `Analizando usuario: ${nombre}`,
  `Recopilando información de ${nombre}`,
  "Evaluando nivel de curiosidad..."
];

// Elementos
const btnInicio = document.getElementById("btnInicio");
const inicio = document.getElementById("inicio");
const texto = document.getElementById("texto");
const progreso = document.getElementById("progreso");
const resultado = document.getElementById("resultado");

const body = document.getElementById("body");
const apagado = document.getElementById("apagado");

// Estado
let indiceMensaje = 0;
let isRunning = false;

function escribirLetraPorLetra(cadena, { onComplete, prefijo = "> " } = {}) {
  // Asegurar que trabajamos como texto (evita XSS)
  const full = prefijo + cadena + "\n";
  let i = 0;

  const delay = 38; // velocidad hacker
  const intervalo = setInterval(() => {
    // agregamos una letra a la vez
    texto.textContent += full[i];
    i++;

    if (i >= full.length) {
      clearInterval(intervalo);
      texto.textContent += "\n";
      onComplete && onComplete();
    }
  }, delay);
}

function setProgreso(valor01) {
  const pct = Math.max(0, Math.min(100, valor01 * 100));
  progreso.style.width = pct.toFixed(1) + "%";
}

function iniciar() {
  if (isRunning) return;
  isRunning = true;

  // UI inicial
  btnInicio.disabled = true;
  inicio.style.display = "none";
  resultado.innerHTML = "";
  texto.textContent = "";
  setProgreso(0);

  indiceMensaje = 0;
  ejecutarPaso();
}

function ejecutarPaso() {
  if (indiceMensaje < mensajes.length) {
    const msg = mensajes[indiceMensaje];
    escribirLetraPorLetra(msg, {
      prefijo: "> ",
      onComplete: () => {
        setProgreso((indiceMensaje + 1) / mensajes.length);
        indiceMensaje++;
        setTimeout(ejecutarPaso, 650);
      }
    });
  } else {
    // ===== FALLO =====
    iniciarFalla();
  }
}

function iniciarFalla() {
  // Mensaje error
  escribirLetraPorLetra("ERROR: Información corrupta...", {
    prefijo: "> ",
    onComplete: () => {
      // Efectos
      body.classList.add("glitch", "falla", "temblor");

      // “Temblor / corrupción” adicional en texto (sin HTML)
      setTimeout(() => {
        texto.textContent += ">> Sistema bajo estrés...\n\n";
      }, 400);

      // Sistema comprometido
      setTimeout(() => {
        escribirLetraPorLetra("Sistema comprometido...", { prefijo: "> " });
      }, 900);

      // Pantalla negra colapsa (varios segundos)
      setTimeout(() => {
        // Apagar completamente
        apagado.classList.add("on");

        // Mientras está apagado, “ocurre”
        setTimeout(() => {
          // Mostrar sorpresa final
          mostrarSorpresaFinal();

          // Volver luz
          apagado.classList.remove("on");
        }, 2200);
      }, 1900);
    }
  });
}

function mostrarSorpresaFinal() {
  // Quitar efectos
  setTimeout(() => {
    body.classList.remove("glitch", "falla", "temblor");
  }, 500);

  // Construir resultado de forma segura
  resultado.innerHTML = "";

  const wrap = document.createElement("div");

  const titulo = document.createElement("div");
  titulo.className = "buuu";
  titulo.textContent = `👻\n\nBUUUU ${nombre}\n\n😂`;

  const broma = document.createElement("div");
  broma.className = "smallline";
  broma.textContent = "El usuario fue engañado exitosamente.";

  const completada = document.createElement("div");
  completada.className = "smallline";
  completada.style.marginTop = "14px";
  completada.style.color = "var(--neon2)";
  completada.style.fontWeight = "800";
  completada.textContent = "🎉 Broma completada";

  const creada = document.createElement("div");
  creada.className = "smallline";
  creada.style.marginTop = "10px";
  creada.textContent = `Atentamente Annie ❤️`;

  const cierre = document.createElement("div");
  cierre.className = "smallline";
  cierre.style.marginTop = "6px";
  cierre.style.opacity = ".9";
  cierre.textContent = "Sistema cerrado...";

  wrap.appendChild(titulo);
  wrap.appendChild(broma);
  wrap.appendChild(completada);

  // Requisito: “Después de unos segundos mostrar …”
  // Arrancamos los textos finales y los escalonamos
  resultado.appendChild(wrap);

  setTimeout(() => {
    resultado.appendChild(creada);
  }, 850);

  setTimeout(() => {
    resultado.appendChild(cierre);
  }, 1400);
}

// ===== Eventos =====
btnInicio.addEventListener("click", iniciar);
