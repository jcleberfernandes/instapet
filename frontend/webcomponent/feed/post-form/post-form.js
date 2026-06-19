const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = new URL('./post-form.css', import.meta.url);
document.head.appendChild(link);

const MAX_CHARS = 280;

export class PostForm extends HTMLElement {
  connectedCallback() {
    const username    = this.getAttribute('username') || '';
    const displayName = this.getAttribute('display-name') || username;
    const avatar      = this.getAttribute('avatar') || '';

    this.innerHTML = `
      <div class="post-form">
        <h3 class="post-form__title">Criar publicação</h3>

        <textarea
          class="post-form__textarea"
          placeholder="O que se passa com o teu pet? 🐾"
          maxlength="${MAX_CHARS}"
          rows="3"
        ></textarea>

        <div class="post-form__secondary">
          <input
            class="post-form__image-input"
            type="url"
            placeholder="URL da imagem (opcional)"
          >
          <input
            class="post-form__tags-input"
            type="text"
            placeholder="Tags (ex: gatos, cães, funny)"
          >
        </div>

        <div class="post-form__footer">
          <span class="post-form__char-count">0 / ${MAX_CHARS}</span>
          <button class="post-form__submit" disabled>Publicar</button>
        </div>
        <span class="post-form__error" hidden></span>
      </div>
    `;

    const textarea  = this.querySelector('.post-form__textarea');
    const submitBtn = this.querySelector('.post-form__submit');
    const charCount = this.querySelector('.post-form__char-count');
    const errorEl   = this.querySelector('.post-form__error');

    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      charCount.textContent = `${len} / ${MAX_CHARS}`;
      charCount.classList.toggle('post-form__char-count--warn', len > MAX_CHARS * 0.85);
      submitBtn.disabled = len === 0;
    });

    submitBtn.addEventListener('click', async () => {
      const content   = textarea.value.trim();
      const image_url = this.querySelector('.post-form__image-input').value.trim() || undefined;
      const tagsRaw   = this.querySelector('.post-form__tags-input').value.trim();
      const tags      = tagsRaw
        ? tagsRaw.split(/[\s,]+/).map(t => t.replace(/^#/, '').toLowerCase()).filter(Boolean)
        : [];

      if (!content) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'A publicar...';
      errorEl.hidden = true;

      this.dispatchEvent(new CustomEvent('post-submit', {
        detail: { content, image_url, tags },
        bubbles: true,
        composed: true,
      }));
    });

    document.addEventListener('post-created', () => {
      textarea.value = '';
      this.querySelector('.post-form__image-input').value = '';
      this.querySelector('.post-form__tags-input').value  = '';
      charCount.textContent = `0 / ${MAX_CHARS}`;
      charCount.classList.remove('post-form__char-count--warn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Publicar';
    });

    document.addEventListener('post-create-error', () => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Publicar';
      errorEl.textContent = 'Erro ao publicar. Tenta novamente.';
      errorEl.hidden = false;
    });
  }
}

customElements.define('post-form', PostForm);
