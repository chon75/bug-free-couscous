// Hero 슬라이드, 네비 토글, 라이트박스, 간단한 폼 검증
document.addEventListener('DOMContentLoaded', function () {
  // 네비 토글 (모바일)
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('siteNav');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('show');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // 슬라이드
  (function heroSlides() {
    var slides = document.querySelectorAll('.hero .slide');
    if (!slides || slides.length <= 1) return;
    var index = 0;
    var prevBtn = document.querySelector('.slide-prev');
    var nextBtn = document.querySelector('.slide-next');
    function setSlide(i) {
      slides.forEach(function (s, idx) {
        s.setAttribute('aria-hidden', idx === i ? 'false' : 'true');
      });
    }
    function next() { index = (index + 1) % slides.length; setSlide(index); }
    function prev() { index = (index - 1 + slides.length) % slides.length; setSlide(index); }
    var timer = setInterval(next, 5000);
    if (nextBtn) nextBtn.addEventListener('click', function(){ next(); clearInterval(timer); });
    if (prevBtn) prevBtn.addEventListener('click', function(){ prev(); clearInterval(timer); });
  })();

  // 라이트박스 (갤러리 클릭 확대)
  (function lightbox() {
    var galleryImgs = document.querySelectorAll('.gallery-item img, .card img');
    if (!galleryImgs.length) return;
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<div class="content"><img alt=""><div class="caption"></div></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbCaption = lb.querySelector('.caption');

    function open(src, alt){
      lbImg.src = src;
      lbImg.alt = alt || '';
      lbCaption.textContent = alt || '';
      lb.classList.add('open');
    }
    function close(){
      lb.classList.remove('open');
      lbImg.src = '';
    }
    galleryImgs.forEach(function(img){
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function(){
        open(img.src, img.alt || img.nextElementSibling?.textContent || '');
      });
    });
    lb.addEventListener('click', function(e){
      if (e.target === lb || e.target === lbImg) close();
    });
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') close(); });
  })();

  // 폼 처리
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert('모든 필드를 작성해 주세요.');
        return;
      }
      alert('문의가 정상적으로 접수되었습니다. 감사합니다!');
      form.reset();
    });
  }
});
