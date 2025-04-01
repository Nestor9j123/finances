// Gestion des modals
function setupModals() {
    // Fermer les modals au clic sur le bouton close
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.add('hidden');
        });
    });

    // Fermer les modals au clic en dehors
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.add('hidden');
            }
        });
    });
}

// Gestion des formulaires
function setupFormValidation() {
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showAlert('Veuillez remplir tous les champs obligatoires', 'error');
            }
        });
    });
}

// Gestion des tabs
function setupTabs() {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Désactiver tous les tabs
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
            });
            
            // Activer le tab sélectionné
            document.getElementById(tabId).classList.remove('hidden');
            this.classList.add('bg-blue-600', 'text-white');
        });
    });
}

// Initialisation générale
document.addEventListener('DOMContentLoaded', function() {
    setupModals();
    setupFormValidation();
    setupTabs();
});

// Export des fonctions
export {
    setupModals,
    setupFormValidation,
    setupTabs
};