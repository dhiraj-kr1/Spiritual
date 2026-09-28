document.addEventListener('DOMContentLoaded',()=>{
  // Animate schedule dots
  const dots = document.querySelectorAll('.rp-schedule-item::before');
  // Stagger recipe sections
  const sections = document.querySelectorAll('.rp-recipe-section');
  if('IntersectionObserver' in window && sections.length){
    const obs=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)';obs.unobserve(e.target);}});},{threshold:0.06});
    sections.forEach((s,i)=>{s.style.opacity='0';s.style.transform='translateY(20px)';s.style.transition=`opacity 0.5s ease ${i*0.08}s,transform 0.5s ease ${i*0.08}s`;obs.observe(s);});
  }
  // Panchamrit five cards pop-in
  const fiveCards=document.querySelectorAll('.rp-five-card');
  if('IntersectionObserver' in window && fiveCards.length){
    const obs2=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.opacity='1';e.target.style.transform='scale(1)';},i*80);obs2.unobserve(e.target);}});},{threshold:0.2});
    fiveCards.forEach(c=>{c.style.opacity='0';c.style.transform='scale(0.9)';c.style.transition='opacity 0.4s ease,transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';obs2.observe(c);});
  }
});
