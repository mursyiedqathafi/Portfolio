(function(){ emailjs.init("ijfpHB5HON8vE4f8P"); })();

AOS && AOS.init && AOS.init({duration:900, once:true});

document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  emailjs.sendForm('service_cf421tl','template_yrx4q2u', this)
    .then(function(){ alert('✅ Message sent successfully!'); }, function(err){ alert('❌ Failed to send: '+JSON.stringify(err)); });
  this.reset();
});

// simple nav scroll spy
const links = document.querySelectorAll('.nav a');
links.forEach(l=>{
  l.addEventListener('click', e=>{
    e.preventDefault();
    document.querySelector(l.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    links.forEach(x=>x.classList.remove('active'));
    l.classList.add('active');
  });
});

// reveal elements with AOS already handles, fallback:
window.addEventListener('load', ()=>{ document.querySelectorAll('[data-aos]').forEach(el=>el.classList.add('aos-initialized')); });
