const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const counters = document.querySelectorAll("[data-count]");
const countObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting || entry.target.dataset.done) return;
    entry.target.dataset.done="1";
    const el=entry.target, target=+el.dataset.count, duration=1100, start=performance.now();
    function tick(now){
      const p=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=Math.floor(target*eased)+"+";
      if(p<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })
},{threshold:.5});
counters.forEach(el=>countObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const id=a.getAttribute("href");
    if(id.length>1){e.preventDefault();document.querySelector(id)?.scrollIntoView({behavior:"smooth"})}
  })
});