document.addEventListener('DOMContentLoaded',()=>{
  // Purple glow pulse on story dots
  document.querySelectorAll('.kr-story-dot').forEach((dot,i)=>{
    let t=i*1.2;
    setInterval(()=>{ t+=0.05; dot.style.boxShadow=`0 0 ${8+6*Math.sin(t)}px rgba(155,89,214,${0.4+0.3*Math.sin(t)})`; },60);
  });
  // Dark mantra box starfield shimmer
  const mb=document.querySelector('.kr-mantra-box');
  if(mb){let t=0;setInterval(()=>{t+=0.03;mb.style.boxShadow=`0 0 ${40+20*Math.sin(t)}px rgba(155,89,214,${0.12+0.08*Math.sin(t)})`;},50);}
  // Story steps slide in
  const steps=document.querySelectorAll('.kr-story-step');
  if('IntersectionObserver' in window&&steps.length){
    const obs=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.opacity='1';e.target.style.transform='translateX(0)';},i*130);obs.unobserve(e.target);}});},{threshold:0.15});
    steps.forEach(el=>{el.style.opacity='0';el.style.transform='translateX(-16px)';el.style.transition='opacity 0.5s ease,transform 0.5s ease';obs.observe(el);});
  }
});
