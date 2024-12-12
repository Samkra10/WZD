document.addEventListener('DOMContentLoaded', function() {
    const gifts = document.querySelectorAll('.gift-box');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalText = document.getElementById('modal-text');

    gifts.forEach(gift => {
        gift.addEventListener('click', function() {
            const giftId = this.id;
            fetch('Gifts.txt')
               .then(response => response.text())
               .then(data => {
                    const lines = data.split('\n');
                    lines.forEach(line => {
                        const [id, status, title, subtitle, text] = line.split(',');
                        if (id === giftId && status === 'Open') {
                            this.querySelector('img').src = 'opengift.png';
                            modalTitle.textContent = title;
                            modalSubtitle.textContent = subtitle;
                            modalText.textContent = text;
                            modal.style.display = 'block';
                        }
                    });
                });
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
