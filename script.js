const modalButtons = document.querySelectorAll('[data-open-modal]');
const closeButtons = document.querySelectorAll('[data-close-modal]');

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.openModal);
    if (modal?.showModal) modal.showModal();
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => button.closest('dialog')?.close());
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const shareButton = document.getElementById('shareButton');
shareButton?.addEventListener('click', async () => {
  const shareData = {
    title: document.title,
    text: 'Guía visual de Isaac y Jacob en el Museo del Prado',
    url: window.location.href
  };

  if (navigator.share) {
    await navigator.share(shareData).catch(() => undefined);
    return;
  }

  await navigator.clipboard?.writeText(window.location.href).catch(() => undefined);
  shareButton.textContent = 'Link copiado';
  setTimeout(() => { shareButton.textContent = 'Compartir'; }, 1800);
});
