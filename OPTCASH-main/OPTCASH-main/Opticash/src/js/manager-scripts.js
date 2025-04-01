// Gestion de la sidebar mobile
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // Initialisation des tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });

    // Initialisation des graphiques
    initManagerCharts();
});

// Fonctions pour les tooltips
function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width/2 - tooltip.offsetWidth/2}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
}

function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Gestion des transactions
function setupTransactionHandlers() {
    // Suppression d'une transaction
    document.querySelectorAll('.delete-transaction').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const transactionId = this.getAttribute('data-transaction-id');
            if (confirm('Confirmez la suppression de cette transaction ?')) {
                fetch(`/api/transactions/${transactionId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        this.closest('tr').remove();
                        showAlert('Transaction supprimée avec succès', 'success');
                    }
                });
            }
        });
    });

    // Modification d'une transaction
    document.querySelectorAll('.edit-transaction').forEach(btn => {
        btn.addEventListener('click', function() {
            const transactionId = this.getAttribute('data-transaction-id');
            loadTransactionForm(transactionId);
        });
    });
}

function loadTransactionForm(transactionId) {
    fetch(`/api/transactions/${transactionId}`)
        .then(response => response.json())
        .then(data => {
            // Remplir le formulaire avec les données
            document.getElementById('transaction-id').value = data.id;
            document.getElementById('transaction-type').value = data.type;
            // ... autres champs
            
            // Afficher le formulaire modal
            document.getElementById('transaction-modal').classList.remove('hidden');
        });
}

function saveTransaction(form) {
    const formData = new FormData(form);
    const transactionId = formData.get('id');
    const url = transactionId ? `/api/transactions/${transactionId}` : '/api/transactions';
    const method = transactionId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        body: formData
    })
    .then(response => {
        if (response.ok) {
            showAlert('Transaction enregistrée avec succès', 'success');
            form.reset();
            document.getElementById('transaction-modal').classList.add('hidden');
            // Rafraîchir la liste
            loadTransactions();
        }
    });
}

// Gestion des stocks
function setupInventoryHandlers() {
    document.querySelectorAll('.edit-stock').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            loadStockForm(itemId);
        });
    });

    document.querySelectorAll('.order-stock').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemId = this.getAttribute('data-item-id');
            openOrderModal(itemId);
        });
    });
}

function loadStockForm(itemId) {
    fetch(`/api/inventory/${itemId}`)
        .then(response => response.json())
        .then(data => {
            // Remplir le formulaire
            document.getElementById('stock-id').value = data.id;
            // ... autres champs
            
            document.getElementById('stock-modal').classList.remove('hidden');
        });
}

// Alertes
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Initialisation des graphiques
function initManagerCharts() {
    // Graphique activité du jour
    const todayCtx = document.getElementById('todayChart');
    if (todayCtx) {
        new Chart(todayCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['8-10h', '10-12h', '12-14h', '14-16h', '16-18h'],
                datasets: [{
                    label: 'CA (€)',
                    data: [320, 450, 510, 480, 390],
                    backgroundColor: '#3b82f6'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
                animation: { duration: 0 }
            }
        });
    }

    // Graphique hebdomadaire
    const weeklyCtx = document.getElementById('weeklyChart');
    if (weeklyCtx) {
        new Chart(weeklyCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                datasets: [{
                    label: 'CA (€)',
                    data: [1250, 1320, 1400, 1280, 1450, 1520],
                    borderColor: '#7c3aed',
                    backgroundColor: 'transparent',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                elements: { point: { radius: 0 } }
            }
        });
    }
}

// Export des fonctions nécessaires
export {
    setupTransactionHandlers,
    setupInventoryHandlers,
    saveTransaction,
    loadStockForm
};