
// Données simulées
const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// Configuration commune des graphiques
const chartConfig = {
    type: 'line',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1E1B4B',
                titleColor: '#E5E7EB',
                bodyColor: '#E5E7EB'
            }
        },
        scales: {
            x: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#9CA3AF' }
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#9CA3AF' }
            }
        }
    }
};

// Données pour Station-service 1
new Chart(document.getElementById('station1Chart'), {
    ...chartConfig,
    data: {
        labels: days,
        datasets: [{
            label: 'CA Journalier',
            data: [1200, 1800, 1500, 2000, 1700, 2200, 1900],
            borderColor: '#7C3AED',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#7C3AED'
        }]
    }
});

// Données pour Boutique 1
new Chart(document.getElementById('boutique1Chart'), {
    ...chartConfig,
    data: {
        labels: days,
        datasets: [{
            label: 'CA Journalier',
            data: [800, 600, 750, 900, 650, 1100, 950],
            borderColor: '#6D28D9',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#6D28D9'
        }]
    }
});
