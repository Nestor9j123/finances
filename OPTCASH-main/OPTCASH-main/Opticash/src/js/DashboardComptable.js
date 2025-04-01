    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('closed');
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light');
        localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light');
    }

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
            datasets: [
                {
                    label: 'Stations-service',
                    data: [12000, 15000, 18000, 14000, 16000, 19000],
                    backgroundColor: 'rgba(124, 58, 237, 0.7)',
                    borderColor: 'rgba(124, 58, 237, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Boutiques',
                    data: [8000, 8500, 9000, 8200, 8700, 9500],
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Restaurants',
                    data: [6000, 6500, 7000, 6800, 7200, 7500],
                    backgroundColor: 'rgba(245, 158, 11, 0.7)',
                    borderColor: 'rgba(245, 158, 11, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '€' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': €' + context.raw.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Transaction Pie Chart
    const pieCtx = document.getElementById('transactionPieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'doughnut',
        data: {
            labels: ['Stations-service', 'Boutiques', 'Restaurants', 'Dépenses'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: [
                    'rgba(124, 58, 237, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)'
                ],
                borderColor: [
                    'rgba(124, 58, 237, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(239, 68, 68, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });

    // Export functionality
    document.getElementById('exportButton').addEventListener('click', function (e) {
        e.stopPropagation();
        document.getElementById('exportMenu').classList.toggle('hidden');
    });

    document.addEventListener('click', function () {
        document.getElementById('exportMenu').classList.add('hidden');
    });

    function exportDocument(format) {
        const filename = `dashboard_${new Date().toISOString().split('T')[0]}`;
        
        if (format === 'pdf') {
            // In a real app, you would generate a PDF report
            console.log('Exporting PDF report...');
            alert(`Export PDF: ${filename}.pdf`);
        }
        else if (format === 'xlsx') {
            console.log('Exporting Excel report...');
            alert(`Export Excel: ${filename}.xlsx`);
        }
        else if (format === 'csv') {
            console.log('Exporting CSV data...');
            alert(`Export CSV: ${filename}.csv`);
        }
        
        document.getElementById('exportMenu').classList.add('hidden');
    }

    // Logout Modal
    class LogoutModal {
        constructor() {
            this.modal = document.getElementById('logoutModal');
            this.logoutLink = document.getElementById('logoutLink');
            this.confirmButton = document.getElementById('logoutConfirm');
            this.cancelButton = document.getElementById('logoutCancel');
            this.initializeEvents();
        }

        initializeEvents() {
            this.logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showModal();
            });
            this.cancelButton.addEventListener('click', () => this.hideModal());
            this.confirmButton.addEventListener('click', () => this.handleLogout());
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.hideModal();
            });
        }

        showModal() {
            this.modal.classList.remove('hidden');
        }

        hideModal() {
            this.modal.classList.add('hidden');
        }

        handleLogout() {
            this.hideModal();
            // In a real app, you would redirect to logout endpoint
            console.log('Utilisateur déconnecté');
            window.location.href = 'login.html';
        }
    }

    new LogoutModal();

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth < 768) {
            sidebar.classList.add('closed');
            hamburgerBtn.style.display = 'flex';
        } else {
            sidebar.classList.remove('closed');
            hamburgerBtn.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();