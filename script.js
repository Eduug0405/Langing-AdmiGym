// Archivo script.js corregido
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
      const preloader = document.querySelector('.preloader');
      if (preloader) {
        preloader.classList.add('fade-out');
      }
    }, 800);
  
    // Sticky Header
    window.addEventListener('scroll', function() {
      const header = document.getElementById('header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
      }
    });
  
    // Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileNavToggle && navMenu) {
      mobileNavToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = this.querySelector('i');
        if (icon) {
          icon.classList.toggle('fa-bars');
          icon.classList.toggle('fa-times');
        }
      });
    }
  
    // Back to Top Button
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
  
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
      } else {
        backToTopButton.classList.remove('active');
      }
    });
  
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    if (navLinks && navLinks.length > 0) {
      // IMPORTANTE: No usar map en NodeList - usar forEach
      navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70,
              behavior: 'smooth'
            });
          }
          
          // Close mobile nav if open
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (mobileNavToggle) {
              const icon = mobileNavToggle.querySelector('i');
              if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
              }
            }
          }
        });
      });
    }
  
    // Configurar la funcionalidad de los videos
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    if (videoWrappers && videoWrappers.length > 0) {
      // IMPORTANTE: No usar map en NodeList - usar forEach
      videoWrappers.forEach(wrapper => {
        const videoElement = wrapper.querySelector('video');
        const playButton = wrapper.querySelector('.video-play');
        
        // Solo procesar si encontramos tanto el video como el botón
        if (videoElement && playButton) {
          // Ocultar los controles por defecto hasta que se reproduzca
          videoElement.controls = false;
          
          // Reproducir video al hacer clic en el botón de play
          playButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Quitar el botón de play y mostrar controles
            playButton.style.display = 'none';
            videoElement.controls = true;
            
            // Reproducir el video
            videoElement.play().catch(err => {
              console.log('Error al reproducir el video:', err);
              // Restaurar el botón de play si hay error
              playButton.style.display = 'flex';
            });
          });
          
          // También permitir clic en todo el wrapper
          wrapper.addEventListener('click', function(e) {
            // Solo si no se hizo clic directamente en el video (para evitar conflictos con controles)
            if (e.target !== videoElement) {
              // Quitar el botón de play y mostrar controles
              playButton.style.display = 'none';
              videoElement.controls = true;
              
              // Reproducir el video
              videoElement.play().catch(err => {
                console.log('Error al reproducir el video:', err);
                // Restaurar el botón de play si hay error
                playButton.style.display = 'flex';
              });
            }
          });
          
          // Restaurar el botón de play cuando termine el video
          videoElement.addEventListener('ended', function() {
            playButton.style.display = 'flex';
            videoElement.controls = false;
          });
        }
      });
    }
  
    // Animation on scroll (opcional)
    const animateElements = document.querySelectorAll('.animate');
    if (animateElements && animateElements.length > 0) {
      function checkIfInView() {
        // IMPORTANTE: No usar map en NodeList - usar forEach
        animateElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const elementVisible = 150;
          
          if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
          }
        });
      }
      
      window.addEventListener('scroll', checkIfInView);
      checkIfInView(); // Check on initial load
    }
  });