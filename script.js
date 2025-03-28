// Configurar la funcionalidad de los videos
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos de video
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    
    videoWrappers.forEach(wrapper => {
      const videoElement = wrapper.querySelector('video');
      const playButton = wrapper.querySelector('.video-play');
      
      // Ocultar los controles por defecto hasta que se reproduzca
      if (videoElement) {
        videoElement.controls = false;
      }
      
      // Reproducir video al hacer clic en el botón de play
      playButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (videoElement) {
          // Quitar el botón de play y mostrar controles
          playButton.style.display = 'none';
          videoElement.controls = true;
          
          // Reproducir el video
          videoElement.play();
        }
      });
      
      // También permitir clic en todo el wrapper
      wrapper.addEventListener('click', function(e) {
        // Solo si no se hizo clic directamente en el video (para evitar conflictos con controles)
        if (e.target !== videoElement) {
          // Quitar el botón de play y mostrar controles
          playButton.style.display = 'none';
          videoElement.controls = true;
          
          // Reproducir el video
          videoElement.play();
        }
      });
      
      // Restaurar el botón de play cuando termine el video
      videoElement.addEventListener('ended', function() {
        playButton.style.display = 'flex';
        videoElement.controls = false;
      });
    });
  });