document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');
    const navbarMenu = document.querySelector('.navbar-menu');
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const navLinks = document.querySelectorAll('.navbar-link');
   
    // Menú móvil
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navbarMenu.classList.toggle('active');
       
        // Cambiar el degradado cuando el menú está abierto
        if (navbarMenu.classList.contains('active')) {
            navbar.style.background = 'var(--gradient-secondary)';
        } else {
            navbar.style.background = 'var(--gradient-primary)';
        }
    });
   
    // Scroll suave para navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                mobileMenu.classList.remove('active');
                navbarMenu.classList.remove('active');
                navbar.style.background = 'var(--gradient-primary)';
            }
            
            // Obtener el ID de la sección objetivo
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Scroll suave
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Ajuste para el navbar fijo
                    behavior: 'smooth'
                });
                
                // Actualizar link activo
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
   
    // Efecto de scroll en el navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.style.height = '70px';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.height = '85px';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        }
        
        // Actualizar link activo según scroll
        updateActiveLink();
    });
   
    // Función para actualizar el link activo según la posición del scroll
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
   
    // Función de búsqueda
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            alert(`Buscando: ${searchTerm}`);
            searchInput.value = '';
            searchInput.blur();
        }
    }
   
    searchBtn.addEventListener('click', performSearch);
   
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
   
    // Efecto hover en el buscador
    searchInput.addEventListener('focus', function() {
        document.querySelector('.navbar-search').style.background = 'rgba(255, 255, 255, 0.3)';
    });
   
    searchInput.addEventListener('blur', function() {
        document.querySelector('.navbar-search').style.background = 'rgba(255, 255, 255, 0.2)';
    });
});