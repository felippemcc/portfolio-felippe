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
  
  // Verifica se os elementos existem
  if (!toggleBtn || !iconEl) {
    console.warn('⚠️ Botão de tema não encontrado');
    return;
  }
  
  // Função para determinar tema inicial
  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }
  
  // Função para aplicar tema
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    iconEl.innerHTML = theme === 'light' ? ICONS.moon : ICONS.sun;
    toggleBtn.setAttribute('aria-label', theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro');
  }
  
  // Inicializa tema
  let currentTheme = getInitialTheme();
  applyTheme(currentTheme);
  
  // Event listener para alternar tema
  toggleBtn.addEventListener('click', () => {
    currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
  });
  
  // Detecta mudança de preferência do sistema
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

// ⚠️ CONFIGURAÇÃO DO EMAILJS
// Substitua com suas credenciais do EmailJS
const EMAILJS_CONFIG = {
  publicKey: 'QIjzleQQUaWXp51IZ',     // Ex: 'user_aBcDeFgH123456'
  serviceId: 'service_1oqwyx5',     // Ex: 'service_gmail'
  templateId: 'template_q9yq7cm'    // Ex: 'template_contato'
};

function initEmailJS() {
  // Verifica se EmailJS está disponível
  if (typeof emailjs === 'undefined') {
    console.error('❌ EmailJS não carregado! Adicione o script no HTML.');
    return false;
  }
  
  // Verifica se credenciais foram configuradas
  if (EMAILJS_CONFIG.publicKey === 'SEU_PUBLIC_KEY_AQUI') {
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
    e.preventDefault(); // IMPEDE O RELOAD DA PÁGINA
    
    console.log('📤 Formulário submetido');
    
    // Verifica se EmailJS foi configurado
    const emailjsReady = initEmailJS();
    
    if (!emailjsReady) {
      alert('⚠️ Sistema de email não configurado.\n\nPor favor, entre em contato diretamente:\nfelippe.mcc1@gmail.com');
      return;
    }
    
    // Desabilita botão durante envio
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Enviando...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
    
    // Coleta dados do formulário
    const formData = new FormData(form);
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };
    
    console.log('📧 Enviando email com dados:', templateParams);
    
    try {
      // Envia email via EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );
      
      console.log('✅ Email enviado com sucesso!', response);
      alert('✅ Mensagem enviada com sucesso!\n\nObrigado pelo contato, responderei em breve!');
      form.reset();
      
    } catch (error) {
      console.error('❌ Erro ao enviar email:', error);
      
      let errorMsg = '❌ Erro ao enviar mensagem.\n\n';
      if (error.text) errorMsg += 'Detalhes: ' + error.text + '\n\n';
      errorMsg += 'Por favor, tente novamente ou entre em contato:\nfelippe.mcc1@gmail.com';
      
      alert(errorMsg);
      
    } finally {
      // Reabilita botão
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
   INICIALIZAÇÃO
======================================== */

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOM carregado');
  
  // Inicializa todos os módulos
  initTheme();
  initSmoothScroll();
  initNavbarEffect();
  initContactForm();
  initCardsAnimation();
  
  console.log('✅ Todas as funcionalidades inicializadas!');
});

// Log final
console.log('📊 main.js carregado completamente');