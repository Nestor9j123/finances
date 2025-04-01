// Initialisation générale
document.addEventListener('DOMContentLoaded', function() {
    // Gestion des utilisateurs
    setupUserHandlers();
    
    // Gestion des points de vente
    setupLocationHandlers();
    
    // Gestion de l'audit
    setupAuditFilters();
    
    // Initialisation des graphiques
    initAdminCharts();
});

// Gestion des utilisateurs
function setupUserHandlers() {
    // Suppression d'un utilisateur
    document.querySelectorAll('.delete-user').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const userId = this.getAttribute('data-user-id');
            const userName = this.getAttribute('data-user-name');
            
            if (confirm(`Confirmez la suppression de ${userName} ?`)) {
                fetch(`/api/users/${userId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        this.closest('tr').remove();
                        showAlert('Utilisateur supprimé avec succès', 'success');
                    }
                });
            }
        });
    });

    // Modification d'un utilisateur
    document.querySelectorAll('.edit-user').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            loadUserForm(userId);
        });
    });

    // Réinitialisation du mot de passe
    document.querySelectorAll('.reset-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            resetUserPassword(userId);
        });
    });
}

function loadUserForm(userId) {
    fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            // Remplir le formulaire
            document.getElementById('user-id').value = data.id;
            document.getElementById('user-name').value = data.name;
            // ... autres champs
            
            // Afficher le modal
            document.getElementById('user-modal').classList.remove('hidden');
        });
}

function saveUser(form) {
    const formData = new FormData(form);
    const userId = formData.get('id');
    const url = userId ? `/api/users/${userId}` : '/api/users';
    const method = userId ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showAlert('Utilisateur enregistré avec succès', 'success');
            form.reset();
            document.getElementById('user-modal').classList.add('hidden');
            // Rafraîchir la liste
            loadUsers();
        }
    });
}

function resetUserPassword(userId) {
    if (confirm('Générer un nouveau mot de passe pour cet utilisateur ?')) {
        fetch(`/api/users/${userId}/reset-password`, {
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                showAlert('Mot de passe réinitialisé avec succès', 'success');
            }
        });
    }
}

// Gestion des points de vente
function setupLocationHandlers() {
    document.querySelectorAll('.delete-location').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const locationId = this.getAttribute('data-location-id');
            const locationName = this.getAttribute('data-location-name');
            
            if (confirm(`Supprimer le point de vente ${locationName} ?`)) {
                fetch(`/api/locations/${locationId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        this.closest('tr').remove();
                        showAlert('Point de vente supprimé avec succès', 'success');
                    }
                });
            }
        });
    });

    document.querySelectorAll('.edit-location').forEach(btn => {
        btn.addEventListener('click', function() {
            const locationId = this.getAttribute('data-location-id');
            loadLocationForm(locationId);
        });
    });
}

function loadLocationForm(locationId) {
    fetch(`/api/locations/${locationId}`)
        .then(response => response.json())
        .then(data => {
            // Remplir le formulaire
            document.getElementById('location-id').value = data.id;
            // ... autres champs
            
            document.getElementById('location-modal').classList.remove('hidden');
        });
}

// Gestion des filtres d'audit
function setupAuditFilters() {
    const filterForm = document.getElementById('audit-filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            loadAuditLogs(formData);
        });
    }
}

function loadAuditLogs(params) {
    const query = new URLSearchParams(params).toString();
    fetch(`/api/audit?${query}`)
        .then(response => response.json())
        .then(data => {
            // Mettre à jour le tableau d'audit
            updateAuditTable(data);
        });
}

// Initialisation des graphiques admin
function initAdminCharts() {
    // Graphique de performance
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Stations', 'Boutiques', 'Restaurants'],
                datasets: [{
                    label: 'CA (€)',
                    data: [18500, 8750, 6200],
                    backgroundColor: '#7c3aed'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'CA: €' + context.raw.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '€' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
}

// Fonction d'alerte générique
function showAlert(message, type = 'info') {
    const alert = document.createElement('div');
    alert.className = `fixed top-4 right-4 px-4 py-2 rounded-md text-white ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 'bg-blue-500'
    }`;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Export des fonctions nécessaires
export {
    setupUserHandlers,
    setupLocationHandlers,
    saveUser,
    resetUserPassword,
    loadLocationForm
};