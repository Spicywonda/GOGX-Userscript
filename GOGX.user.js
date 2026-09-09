// ==UserScript==
// @name         GoGX - GOG Direct Link (Turbo)
// @namespace    WonderSpicy
// @version      3.1
// @description  Agrega un botón morado casi instantáneo hacia gog-rev.com
// @author       WonderSpicy
// @match        *://*.gog.com/game/*
// @match        *://*.gog.com/*/game/*
// @icon         https://i.ibb.co/YBkHKbX7/Foticopijuda.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("🏴‍☠️ GoGX v3.1 Iniciado: Modo Turbo (MutationObserver)...");

    // Empaquetamos todo el proceso de crear el botón en una función
    function inyectarBoton() {
        let contenedorBotones = document.querySelector('.product-actions') || document.querySelector('.product-actions-price');

        // Si no está el contenedor o ya pusimos el botón, cancelamos FUCK YEAH
        if (!contenedorBotones || document.getElementById('piratex-btn')) return false;

        let path = window.location.pathname;
        let gameSlug = "";

        if (path.includes('/game/')) {
            gameSlug = path.split('/game/')[1].replace(/\/$/, '');
        }

        if (!gameSlug) return false;

        let btnPirata = document.createElement('a');
        btnPirata.id = 'piratex-btn';
        btnPirata.href = `https://gog-rev.com/game/${gameSlug}`;
        btnPirata.target = '_blank';
        btnPirata.innerHTML = `🏴‍☠️ Free GOG Games`;

        btnPirata.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #8a2be2;
            color: #ffffff;
            text-transform: uppercase;
            font-weight: 500;
            padding: 14px 24px;
            border-radius: 4px;
            margin-top: 10px;
            margin-bottom: 10px;
            text-decoration: none;
            font-size: 14px;
            line-height: 1;
            transition: background-color 0.2s ease;
            cursor: pointer;
            width: 100%;
            box-sizing: border-box;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;

        btnPirata.onmouseover = () => btnPirata.style.backgroundColor = '#6a1b9a';
        btnPirata.onmouseout = () => btnPirata.style.backgroundColor = '#8a2be2';

        let botonWishlist = document.querySelector('.product-actions-wishlist') || document.querySelector('[ng-click="wishlist()"]');

        if (botonWishlist && botonWishlist.parentNode) {
            botonWishlist.parentNode.insertBefore(btnPirata, botonWishlist);
        } else {
            contenedorBotones.appendChild(btnPirata);
        }

        console.log(`🏴‍☠️ Enlace inyectado al instante para: ${gameSlug}`);
        return true; // Retorna true si tuvo éxito
    }

    // 1. Intentamos inyectarlo inmediatamente por si la página cargó muy rápido
    if (!inyectarBoton()) {

        // 2. Si aún no carga, activamos el Ojo de Sauron (MutationObserver)
        const observer = new MutationObserver((mutations, obs) => {
            // Cada vez que la página cambie un píxel, intenta inyectar el botón
            if (inyectarBoton()) {
                // Si el botón se inyectó con éxito, apagamos el vigilante para no gastar memoria
                obs.disconnect();
            }
        });

        // Le decimos al vigilante que mire todo el cuerpo de la página
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();
