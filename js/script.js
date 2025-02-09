document.addEventListener('DOMContentLoaded', () => {
  // Configuration des thèmes
  const themes = {
    cyberpunk: {
      name: 'Thème Cyberpunk',
      class: 'theme-cyberpunk',
      style: { bg: '#000', color: '#00fff9' }
    },
    hacking: {
      name: 'Thème Hacking',
      class: '',
      style: { bg: '#003300', color: '#00ff00' }
    },
    pink: {
      name: 'Thème Rose',
      class: 'theme-pink',
      style: { bg: '#ff69b4', color: '#fff' }
    },
    bluered: {
      name: 'Thème Bleu-Rouge',
      class: 'theme-bluered',
      style: { bg: '#000428', color: '#ff3366' }
    },
    neon: {
      name: 'Thème Néon',
      class: 'theme-neon',
      style: { bg: '#000', color: '#ff00ff' }
    },
    space: {
      name: 'Thème Spatial',
      class: 'theme-space',
      style: { bg: '#000033', color: '#4a90e2' }
    },
    sakura: {
      name: 'Thème Sakura',
      class: 'theme-sakura',
      style: { bg: '#ffd1dc', color: '#d500f9' }
    },
    sunset: {
      name: 'Thème Coucher de Soleil',
      class: 'theme-sunset',
      style: { bg: '#ff4e50', color: '#f9d423' }
    },
    synthwave: {
      name: 'Thème Synthwave', 
      class: 'theme-synthwave',
      style: { bg: '#150022', color: '#0ff' }
    },
    forest: {
      name: 'Thème Forêt',
      class: 'theme-forest',
      style: { bg: '#1b4b36', color: '#7fff00' }
    }
  };

  // Fonction pour changer de thème
  function setTheme(themeName) {
    if (!themes[themeName]) {
      console.error(`Theme "${themeName}" not found`);
      themeName = 'cyberpunk';
    }

    Object.values(themes).forEach(theme => {
      if (theme.class) {
        document.body.classList.remove(theme.class);
      }
    });

    if (themes[themeName].class) {
      document.body.classList.add(themes[themeName].class);
    }

    localStorage.setItem('theme', themeName);
  }

  // Create and handle modal
  function createThemeModal() {
    const modalHTML = `
      <div class="modal-overlay" id="themeModal">
        <div class="modal">
          <button class="close-modal">&times;</button>
          <h2>Choisir un thème</h2>
          <div class="theme-grid"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const themeGrid = document.querySelector('.theme-grid');
    Object.entries(themes).forEach(([key, theme]) => {
      const button = document.createElement('button');
      button.className = 'theme-btn';
      button.textContent = theme.name;
      button.style.backgroundColor = theme.style.bg;
      button.style.color = theme.style.color;
      button.addEventListener('click', () => {
        setTheme(key);
        document.getElementById('themeModal').style.display = 'none';
      });
      themeGrid.appendChild(button);
    });

    // Close modal handlers
    const modal = document.getElementById('themeModal');
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Create and handle background modal
  function createBackgroundModal() {
    const modalHTML = `
      <div class="modal-overlay background-modal" id="backgroundModal">
        <div class="modal">
          <button class="close-modal">&times;</button>
          <h2>Choisir un arrière-plan</h2>
          <div class="background-grid">
            <div class="background-option" data-bg="default">
              <div class="default-bg-preview">
                <span>Animation par défaut du thème</span>
              </div>
            </div>
            <div class="background-option" data-bg="yellow_pink">
              <img src="Capture_decran_2025-02-08_162326.png" alt="Gradient jaune-rose">
            </div>
            <div class="background-option" data-bg="gray_diamond">
              <img src="Capture_decran_2025-02-08_162347.png" alt="Motif diamant gris">
            </div>
            <div class="background-option" data-bg="teal_blue">
              <img src="Capture_decran_2025-02-08_162309.png" alt="Gradient bleu-vert">
            </div>
            <div class="background-option" data-bg="coral_peach">
              <img src="Capture_decran_2025-02-08_162319.png" alt="Gradient corail-pêche">
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Background selection handlers
    const backgroundOptions = document.querySelectorAll('.background-option');
    const savedBg = localStorage.getItem('background');

    backgroundOptions.forEach(option => {
      if (option.dataset.bg === savedBg) {
        option.classList.add('selected');
      }

      option.addEventListener('click', () => {
        backgroundOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        setBackground(option.dataset.bg);
        document.getElementById('backgroundModal').style.display = 'none';
      });
    });

    // Close modal handlers
    const modal = document.getElementById('backgroundModal');
    const closeBtn = modal.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  // Function to set background
  function setBackground(bgName) {
    // Reset any existing background styles
    document.body.style.removeProperty('background-image');
    document.body.style.removeProperty('background-size');
    document.body.style.removeProperty('background-attachment');
    
    if (bgName === 'default') {
      localStorage.removeItem('background'); // Remove background preference for default
    } else {
      const backgrounds = {
        yellow_pink: "url('Capture_decran_2025-02-08_162326.png')",
        gray_diamond: "url('Capture_decran_2025-02-08_162347.png')",
        teal_blue: "url('Capture_decran_2025-02-08_162309.png')",
        coral_peach: "url('Capture_decran_2025-02-08_162319.png')"
      };

      if (backgrounds[bgName]) {
        document.body.style.backgroundImage = backgrounds[bgName];
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        localStorage.setItem('background', bgName);
      }
    }
  }

  // Initialize modals
  createThemeModal();
  createBackgroundModal();

  // Handle settings dropdown
  const settingsBtn = document.querySelector('.settings-btn');
  const settingsDropdown = document.querySelector('.settings-dropdown');
  const themeBtn = document.querySelector('.theme-btn-dropdown');

  settingsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    settingsDropdown.classList.toggle('show');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    settingsDropdown.classList.remove('show');
  });

  // Theme button click handler
  themeBtn.addEventListener('click', () => {
    document.getElementById('themeModal').style.display = 'flex';
    settingsDropdown.classList.remove('show');
  });

  // Add background button to settings dropdown
  const bgButton = document.createElement('button');
  bgButton.className = 'background-btn-dropdown';
  bgButton.textContent = 'Arrière-plan';
  settingsDropdown.appendChild(bgButton);

  // Background button click handler
  bgButton.addEventListener('click', () => {
    document.getElementById('backgroundModal').style.display = 'flex';
    settingsDropdown.classList.remove('show');
  });

  // Set initial theme
  const savedTheme = localStorage.getItem('theme') || 'cyberpunk';
  setTheme(savedTheme);

  // Set initial background if saved
  const savedBg = localStorage.getItem('background');
  if (savedBg) {
    setBackground(savedBg);
  }
});