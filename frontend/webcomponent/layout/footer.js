const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = new URL('./footer.css', import.meta.url);
document.head.appendChild(link);

export class AppFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="footer">
        <div class="footer__main">

          <div class="footer__brand-col">
            <div class="footer__brand">
              <span class="footer__brand-icon">🐾</span>
              <span class="footer__brand-name">InstaPet</span>
            </div>
            <p class="footer__tagline">A rede social<br>para ti e o teu pet.</p>
            <div class="footer__socials">
              <a class="footer__social-btn" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a class="footer__social-btn" href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.04-8.99a8.16 8.16 0 0 0 4.77 1.52V4.37a4.85 4.85 0 0 1-1-.68z"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="footer__links-col">
            <h4 class="footer__col-title">Navegar</h4>
            <ul class="footer__links">
              <li><a href="/pages/feed.html">Feed</a></li>
              <li><a href="/pages/search.html">Explorar</a></li>
              <li><a href="/pages/profile.html">Perfil</a></li>
            </ul>
          </div>

          <div class="footer__links-col">
            <h4 class="footer__col-title">Legal</h4>
            <ul class="footer__links">
              <li><a href="/pages/terms.html">Termos de Uso</a></li>
            </ul>
          </div>

        </div>

        <div class="footer__bottom">
          <p class="footer__copyright">© ${new Date().getFullYear()} InstaPet. Todos os direitos reservados.</p>
          <nav class="footer__legal">
            <a href="/pages/terms.html">Termos de Uso</a>
          </nav>
        </div>
      </footer>
    `;
  }
}

customElements.define('app-footer', AppFooter);
