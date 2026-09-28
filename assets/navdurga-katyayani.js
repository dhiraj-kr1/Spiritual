document.addEventListener('DOMContentLoaded',()=>{
  const nums=document.querySelectorAll('.ky-birth-num');
  if('IntersectionObserver' in window&&nums.length){const obs=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.transform='scale(1)';e.target.style.opacity='1';},i*130);obs.unobserve(e.target);}});},{threshold:0.4});nums.forEach(el=>{el.style.transform='scale(0)';el.style.opacity='0';el.style.transition='transform 0.4s cubic-bezier(0.34,1.56,0.64,1),opacity 0.3s ease';obs.observe(el);});}
  const mb=document.querySelector('.ky-mantra-box');
  if(mb){let t=0;setInterval(()=>{t+=0.035;mb.style.boxShadow=`0 0 ${32+14*Math.sin(t)}px rgba(200,80,0,${0.07+0.04*Math.sin(t)})`;},50);}
});
