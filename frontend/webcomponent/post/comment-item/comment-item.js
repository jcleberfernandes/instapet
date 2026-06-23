import { avatarHTML } from '../../ui/avatar.js';
import { escapeHtml } from '../../ui/escape.js';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = new URL('./comment-item.css', import.meta.url);
document.head.appendChild(link);

export class CommentItem extends HTMLElement {
  connectedCallback() {
    const username    = escapeHtml(this.getAttribute('username') || '');
    const displayName = escapeHtml(this.getAttribute('display-name') || username);
    const avatar      = this.getAttribute('avatar') || '';
    const content     = escapeHtml(this.getAttribute('content') || '');
    const time        = this.getAttribute('time') || '';
    const mine        = this.getAttribute('mine') === 'true';
    const commentId   = this.getAttribute('comment-id') || '';

    this.innerHTML = `
      <div class="comment-item">
        ${avatarHTML(displayName, avatar, 'comment-item__avatar')}
        <div class="comment-item__body">
          <div class="comment-item__header">
            <a class="comment-item__username" href="/pages/profile.html?user=${username}">${displayName}</a>
            ${time ? `<span class="comment-item__time">${time}</span>` : ''}
            ${mine ? `<button class="comment-item__delete" aria-label="Apagar comentário" title="Apagar comentário"><span class="material-symbols-outlined">delete</span></button>` : ''}
          </div>
          <p class="comment-item__text">${content}</p>
        </div>
      </div>
    `;

    if (mine && commentId) {
      this.querySelector('.comment-item__delete').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('comment-delete', {
          bubbles: true,
          detail: { commentId },
        }));
      });
    }
  }
}

customElements.define('comment-item', CommentItem);
