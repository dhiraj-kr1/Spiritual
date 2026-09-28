document.addEventListener('DOMContentLoaded',()=>{
  const nums=document.querySelectorAll('.mg-sc-num');
  if('IntersectionObserver' in window&&nums.length){const obs=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.transform='scale(1)';e.target.style.opacity='1';},i*130);obs.unobserve(e.target);}});},{threshold:0.4});nums.forEach(el=>{el.style.transform='scale(0)';el.style.opacity='0';el.style.transition='transform 0.45s cubic-bezier(0.34,1.56,0.64,1),opacity 0.3s ease';obs.observe(el);});}
  const mb=document.querySelector('.mg-mantra-box');
  if(mb){let t=0;setInterval(()=>{t+=0.025;mb.style.boxShadow=`0 0 ${30+18*Math.sin(t)}px rgba(80,96,192,${0.06+0.05*Math.sin(t)})`;},50);}
});
