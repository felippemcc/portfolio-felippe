/* ========================================
   PORTFÓLIO - FELIPPE MOURA
   JavaScript Principal
======================================== */

console.log('🚀 JavaScript carregado!');

/* ========================================
   TEMA DARK/LIGHT
======================================== */

const ICONS = {
  sun: `<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zm10.48 14.32l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM1 13h3v-2H1v2zm19 0h3v-2h-3v2zM12 7a5 5 0 100 10 5 5 0 000-10zm-1-7h2v3h-2V0zm0 18h2v3h-2v-3zM4.22 19.78l1.41 1.41 1.8-1.79-1.41-1.41-1.8 1.79zM18.36 4.64l1.8-1.79-1.41-1.41-1.79 1.8 1.4 1.4z"/>`,
  moon: `<path d="M21.75 15.5A9 9 0 0110.5 2.25 9 9 0 1021.75 15.5z"/>`
};

function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const iconEl = document.getElementById('theme-icon');
  
  if (!toggleBtn || !iconEl) {
    console.warn('⚠️ Botão de tema não encontrado');
    return;
  }
  
  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    iconEl.innerHTML = theme === 'light' ? ICONS.moon : ICONS.sun;
    toggleBtn.setAttribute('aria-label', theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro');
  }
  
  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);
  
  toggleBtn.addEventListener('click', () => {
    currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  });
  
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
  
  console.log('✅ Sistema de tema inicializado');
}

/* ========================================
   SMOOTH SCROLL
======================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  console.log('✅ Smooth scroll configurado');
}

/* ========================================
   NAVBAR SCROLL EFFECT
======================================== */

function initNavbarEffect() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
  console.log('✅ Navbar scroll effect configurado');
}

/* ========================================
   FORMULÁRIO DE CONTATO
======================================== */

const EMAILJS_CONFIG = {
  publicKey: 'user_aBcDeFgH123456',
  serviceId: 'service_gmail',
  templateId: 'template_contato'
};

function initEmailJS() {
  if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS não carregado! Adicione o script no HTML.');
    return false;
  }
  
  if (EMAILJS_CONFIG.publicKey === 'user_aBcDeFgH123456') {
    console.warn('⚠️ Credenciais do EmailJS não configuradas em main.js');
    return false;
  }
  
  try {
    emailjs.init(EMAILJS_CONFIG.publicKey);
    console.log('✅ EmailJS inicializado');
    return true;
  } catch (error) {
    console.error('❌ Erro ao inicializar EmailJS:', error);
    return false;
  }
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = form?.querySelector('.btn-submit');
  
  if (!form) {
    console.warn('⚠️ Formulário de contato não encontrado');
    return;
  }
  
  console.log('📋 Formulário de contato encontrado');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('📤 Formulário submetido');
    
    const emailjsReady = initEmailJS();
    
    if (!emailjsReady) {
      alert('⚠️ Sistema de email não configurado.\n\nPor favor, entre em contato diretamente:\nfelippe.mcc1@gmail.com');
      return;
    }
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Enviando...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    
    const formData = new FormData(form);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    console.log('📧 Enviando email com dados:', templateParams);
    
    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );
      
      console.log('✅ Email enviado com sucesso!', response);
      alert('✅ Mensagem enviada com sucesso!\n\nObrigado pelo contato, responderei em breve!');
      form.reset();
      
    } catch (error) {
      console.warn('Falha ao enviar (modo silencioso). Formulário resetado.');
      form.reset();
      
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  });
  
  console.log('✅ Event listener do formulário configurado');
}

/* ========================================
   ANIMAÇÃO DE ENTRADA DOS CARDS
======================================== */

function initCardsAnimation() {
  const cards = document.querySelectorAll('.project-card, .timeline-item');
  
  if (cards.length === 0) {
    console.warn('⚠️ Nenhum card encontrado para animar');
    return;
  }
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  cards.forEach(card => observer.observe(card));
  console.log(`✅ Animação configurada para ${cards.length} cards`);
}

/* ========================================
   CARROSSEL DE PROJETOS TÉCNICOS
======================================== */

function initCarousel() {
  const track = document.querySelector('.projects-track');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const dots = document.querySelectorAll('.dot');
  const cards = document.querySelectorAll('#projetos-tecnicos .project-card');
  
  if (!track || !prevBtn || !nextBtn || cards.length === 0) {
    console.log('⚠️ Carrossel não encontrado');
    return;
  }

  let currentIndex = 0;
  let cardsPerView = 3;
  let autoplayInterval;
  const autoplayDelay = 5000;

  function updateCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) {
      cardsPerView = 1;
    } else if (width <= 1024) {
      cardsPerView = 2;
    } else {
      cardsPerView = 3;
    }
  }

  function moveToIndex(index) {
    const maxIndex = Math.max(0, cards.length - cardsPerView + 1);
    
    currentIndex = Math.max(0, Math.min(index, maxIndex));

    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const offset = currentIndex * (cardWidth + gap);
    
    track.style.transform = `translateX(-${offset}px)`;

    updateDots();
    updateButtonStates();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function updateButtonStates() {
    // Botões sempre ativos no modo infinito
    prevBtn.style.opacity = '1';
    prevBtn.style.cursor = 'pointer';
    nextBtn.style.opacity = '1';
    nextBtn.style.cursor = 'pointer';
  }

  function nextSlide() {
    const maxIndex = Math.max(0, cards.length - cardsPerView + 1);
    if (currentIndex >= maxIndex) {
      // Se está no último, volta para o primeiro (infinito)
      moveToIndex(0);
    } else {
      moveToIndex(currentIndex + 1);
    }
  }

  function prevSlide() {
    const maxIndex = Math.max(0, cards.length - cardsPerView);
    if (currentIndex <= 0) {
      // Se está no primeiro, vai para o último (infinito)
      moveToIndex(maxIndex);
    } else {
      moveToIndex(currentIndex - 1);
    }
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      moveToIndex(index);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      const maxIndex = Math.max(0, cards.length - cardsPerView);
      if (currentIndex >= maxIndex) {
        moveToIndex(0); // Volta para o início
      } else {
        nextSlide();
      }
    }, autoplayDelay);
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  const carouselContainer = document.querySelector('.carousel-container');
  
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCardsPerView();
      moveToIndex(currentIndex);
    }, 150);
  });

  updateCardsPerView();
  moveToIndex(0);
  startAutoplay();

  console.log(`✅ Carrossel inicializado com ${cards.length} projetos!`);
}

/* ========================================
   INICIALIZAÇÃO
======================================== */

document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOM carregado');
  
  initTheme();
  initSmoothScroll();
  initNavbarEffect();
  initContactForm();
  initCardsAnimation();
  initCarousel();
  
  console.log('✅ Todas as funcionalidades inicializadas!');
});

console.log('📊 main.js carregado completamente');