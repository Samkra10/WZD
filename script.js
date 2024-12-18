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
                    const gifts = data.split('\n\n');
                    gifts.forEach(gift => {
                        const [id, status, title, subtitle, ...contentLines] = gift.split('\n');
                        const content = contentLines.join('\n');
                        if (id === giftId && status === 'Open') {
                            this.querySelector('img').src = 'opengift.png';
                            modalTitle.textContent = title;
                            modalSubtitle.textContent = subtitle;
                            modalText.textContent = content;
                            modal.style.display = 'flex';
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

    fetch('LB.txt')
        .then(response => response.text())
        .then(data => {
            const leaderboardTable = document.getElementById('leaderboard-table').getElementsByTagName('tbody')[0];
            const entries = data.trim().split('\n');
            entries.forEach(entry => {
                const [rank, name, points] = entry.split(',');
                const row = leaderboardTable.insertRow();
                const cellRank = row.insertCell(0);
                const cellName = row.insertCell(1);
                const cellPoints = row.insertCell(2);
                cellRank.textContent = rank;
                cellName.textContent = name;
                cellPoints.textContent = points;
            });
        });
});
