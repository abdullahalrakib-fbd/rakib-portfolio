/* ===== Init AOS & Typed ===== */
AOS && AOS.init({ duration: 900, once: true, easing: 'ease-out-cubic' });

new Typed('#typed', {
  strings: ['Web Developer', 'UI Designer', 'Shopify Themer', 'Problem Solver'],
  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 1500,
  loop: true
});

/* ===== Theme Toggle ===== */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  try { localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light') } catch(e){}
});
// Load saved theme
try {
  const saved = localStorage.getItem('theme');
  if(saved === 'dark') { document.body.classList.add('dark'); themeToggle.textContent='☀️' }
} catch(e){}

/* ===== Mobile nav toggle ===== */
const menuBtn = document.getElementById('menuBtn');
const navList = document.querySelector('.nav-list');
menuBtn.addEventListener('click', () => navList.classList.toggle('show'));
document.querySelectorAll('.nav-list a').forEach(a => a.addEventListener('click', () => navList.classList.remove('show')));

/* ===== Smooth scroll ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

/* ===== Skill bars animation ===== */
const skills = document.querySelectorAll('.skill');
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      const percent = el.getAttribute('data-percent') || 95;
      const fill = el.querySelector('.skill-fill');
      const pctLabel = el.querySelector('.skill-percent');
      fill.style.width = percent + '%';
      let cur = 0;
      const step = Math.max(1, Math.floor(percent/50));
      const interval = setInterval(()=> {
        cur += step;
        if(cur >= percent){ cur = percent; clearInterval(interval); }
        pctLabel.textContent = cur + '%';
      }, 15);
      skillObserver.unobserve(el);
    }
  });
}, {threshold:0.3});
skills.forEach(s => skillObserver.observe(s));

/* ===== Testimonials slider (5 dynamic testimonials) ===== */
const testimonials = [
  { text:"Rakib created a beautiful site for our small business. Fast, patient and professional.", author:"— Hasan, CEO" },
  { text:"Great communication and clean code. Highly recommended.", author:"— Mehnaz, Product Manager" },
  { text:"Delivered on time with attention to detail.", author:"— Arif, Founder" },
  { text:"Transformed our e-commerce platform with clean UI and seamless UX.", author:"— Nadia, Marketing Lead" },
  { text:"Highly responsive and always available for questions.", author:"— Tanvir, Startup Owner" }
];

const sliderWrap = document.getElementById('testSlider');
let slideIndex = 0;

function renderSlides(){
  sliderWrap.innerHTML = testimonials.map((t,i)=>`
    <div class="slide ${i===0 ? 'active':''}">
      <blockquote>${t.text}</blockquote>
      <p class="author">${t.author}</p>
    </div>
  `).join('');
}
renderSlides();

const slides = sliderWrap.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

function showSlide(i){
  sliderWrap.querySelectorAll('.slide').forEach((s, idx) => s.classList.toggle('active', idx === i));
}

function nextSlide(){ slideIndex = (slideIndex + 1) % testimonials.length; showSlide(slideIndex); }
function prevSlideF(){ slideIndex = (slideIndex - 1 + testimonials.length) % testimonials.length; showSlide(slideIndex); }

nextBtn && nextBtn.addEventListener('click', nextSlide);
prevBtn && prevBtn.addEventListener('click', prevSlideF);

let autoSlide = setInterval(nextSlide, 6000);
sliderWrap.addEventListener('mouseenter', ()=> clearInterval(autoSlide));
sliderWrap.addEventListener('mouseleave', ()=> autoSlide = setInterval(nextSlide,6000));

/* ===== Project modal ===== */
const projectData = {
  1: { title:'Portfolio Website', desc:'A responsive portfolio built with modern HTML, CSS, JS. Focus on accessibility & performance.', images:['images/project1.jpg'], live:'#', code:'#' },
  2: { title:'Blog Layout', desc:'Semantic blog layout with clean typography & responsive grid.', images:['images/project2.jpg'], live:'#', code:'#' },
  3: { title:'E-commerce Landing', desc:'Landing page concept for fashion brand optimized for conversions.', images:['images/project3.jpg'], live:'#', code:'#' }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalGallery = document.getElementById('modalGallery');
const modalLive = document.getElementById('modalLive');
const modalCode = document.getElementById('modalCode');
const closeModal = modal.querySelector('.modal-close');

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', ()=>{
    const id = btn.getAttribute('data-project');
    const data = projectData[id];
    if(!data) return;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalGallery.innerHTML = data.images.map(src=>`<img src="${src}" alt="${data.title}">`).join('');
    modalLive.href = data.live;
    modalCode.href = data.code;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
  });
});
closeModal.addEventListener('click', ()=>{ modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; });
modal.addEventListener('click', (e)=>{ if(e.target===modal){ modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; } });

/* ===== Contact form basic UX ===== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if(contactForm){
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    formStatus.textContent='Sending...';
    setTimeout(()=>{
      formStatus.textContent='Thanks! Your message was received. (demo)';
      contactForm.reset();
    },900);
  });
}
