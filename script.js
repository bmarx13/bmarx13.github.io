// Edit project URLs, copy and screenshots here. Status is intentionally not inferred.
const projects = [
  {title:'CAAP Corporate Website', description:'A public-facing gateway to aviation information, services, advisories, and resources.', tags:['Public website','Digital services'], images:['assets/caap-home.png','assets/caap-services.png'], url:'https://www.caap.gov.ph/', linkLabel:'Visit website'},
  {title:'OFSAM Appointment Portal', description:'An online experience for scheduling Airmen Medical Examinations, with examination dates and session availability.', tags:['Web application','Appointments'], images:['assets/ofsam-home.png','assets/ofsam-booking.png'], url:'https://ofsam.caap.gov.ph/', linkLabel:'Visit website'},
  {title:'CAAP Project Monitoring', description:'A central workspace for tracking projects from planning and procurement through implementation.', tags:['Internal platform','Project tracking'], images:['assets/projects-home.png','assets/projects-dashboard.png'], url:'https://infra-monitoring.caap.gov.ph/', linkLabel:'Visit portal'},
  {title:'CAAP Online Payment System', description:'A digital payment experience for CAAP fees, with payment references and downloadable Order of Payment slips.', tags:['Web application','Online payments'], images:['assets/payment-home.png'], url:'https://ops.caap.gov.ph/', linkLabel:'Visit portal'}
];

document.addEventListener('alpine:init',()=>{
 Alpine.data('hoverGallery',()=>({
  active:0,
  touchStart:null,
  suppressClickUntil:0,
  init(){
   this.stack=this.$el.querySelector('.gallery-stack');
   this.onTouchStart=event=>{
    this.touchStart=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;
   };
   this.onTouchEnd=event=>{
    if(!this.touchStart)return;
    const touch=event.changedTouches[0];
    const swiped=this.swipe(touch.clientX-this.touchStart.x,touch.clientY-this.touchStart.y);
    this.touchStart=null;
    if(swiped){this.suppressClickUntil=Date.now()+500;if(event.cancelable)event.preventDefault();}
   };
   this.onTouchCancel=()=>{this.touchStart=null;};
   this.onSwipeClick=event=>{if(Date.now()<this.suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();}};
   this.stack.addEventListener('touchstart',this.onTouchStart,{passive:true});
   this.stack.addEventListener('touchend',this.onTouchEnd,{passive:false});
   this.stack.addEventListener('touchcancel',this.onTouchCancel,{passive:true});
   this.stack.addEventListener('click',this.onSwipeClick,true);
  },
  select(index){this.active=index;},
  swipe(dx,dy){
   // Horizontal finger swipes change projects; vertical gestures scroll the page.
   if(Math.abs(dx)<45 || Math.abs(dx)<=Math.abs(dy)*1.3)return false;
   this.active=(this.active+(dx<0?1:-1)+projects.length)%projects.length;
   return true;
  },
  destroy(){
   this.stack.removeEventListener('touchstart',this.onTouchStart);
   this.stack.removeEventListener('touchend',this.onTouchEnd);
   this.stack.removeEventListener('touchcancel',this.onTouchCancel);
   this.stack.removeEventListener('click',this.onSwipeClick,true);
  }
 }));
});
const caseStudies = [
 {purpose:'Make aviation information and public services easier to find in one place.',workflow:['Browse aviation information and advisories','Find licensing, certification, and frontline services','Access resources and service portals']},
 {purpose:'Bring the Airmen Medical Examination appointment process online.',workflow:['Review examination dates and availability','Choose a morning or afternoon session','Provide examination and application details']},
 {purpose:'Provide one workspace for project visibility from planning through completion.',workflow:['Register and review projects','Follow budget and procurement hand-offs','Track implementation and project reports']},
 {purpose:'Provide an online route for CAAP fee payments and payment documentation.',workflow:['Select a payment type and applicable fees','Generate an Order of Payment reference','Download the payment slip and continue to payment']}
];
const grid=document.querySelector('#projects');
grid.innerHTML='<div class="gallery-index"><span class="gallery-caption">THE COLLECTION</span><div class="gallery-index-list"></div><span class="gallery-hint">Hover to explore<br>Click to look closer ↗</span></div><div class="gallery-stack" aria-label="Project previews. Swipe left or right to change project."></div><p class="gallery-swipe-hint">Swipe left or right to explore ↔</p><div class="gallery-info"></div>';
projects.forEach((project,index)=>{
 const number=String(index+1).padStart(2,'0');
 grid.querySelector('.gallery-index-list').insertAdjacentHTML('beforeend',
  '<button type="button" @mouseenter="select('+index+')" @focus="select('+index+')" @click="select('+index+')" :class="{selected: active === '+index+'}" :aria-pressed="active === '+index+'"><span>'+number+'</span>'+project.title+'</button>');
 const panel=document.createElement('button');
 panel.type='button';panel.className='gallery-panel';panel.dataset.preview=index;
 panel.setAttribute('@mouseenter',"if (matchMedia('(hover: hover)').matches) select("+index+")");panel.setAttribute('@focus','select('+index+')');
 panel.setAttribute(':class','{expanded: active === '+index+'}');
 panel.setAttribute('aria-label','View screenshots: '+project.title);
 panel.innerHTML='<img src="'+project.images[0]+'" alt="'+project.title+' homepage" decoding="async">';
 grid.querySelector('.gallery-stack').append(panel);
 const info=document.createElement('article');info.className='gallery-project-info';
 info.setAttribute('x-show','active === '+index);info.setAttribute('x-transition.opacity.duration.300ms','');
 if(index>0)info.setAttribute('x-cloak','');
 info.innerHTML='<span class="gallery-caption">SELECTED WORK / '+number+'</span><h3>'+project.title+'</h3><p>'+project.description+'</p><div class="tags">'+project.tags.map(tag=>'<span>'+tag+'</span>').join('')+'</div><a class="gallery-visit" href="'+project.url+'" target="_blank" rel="noopener noreferrer">'+project.linkLabel+' <span>↗</span></a><button class="gallery-preview" data-preview="'+index+'">Explore project <span>＋</span></button>';
 grid.querySelector('.gallery-info').append(info);
});
const dialog=document.querySelector('#project-dialog');
document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{
 const project=projects[Number(button.dataset.preview)];
 document.querySelector('#dialog-title').textContent=project.title;
 document.querySelector('#dialog-description').textContent=project.description;
 const study=caseStudies[Number(button.dataset.preview)];
 const details=document.querySelector('#dialog-case-study');
 details.replaceChildren();
 const purpose=document.createElement('section');purpose.className='case-purpose';
 const heading=document.createElement('h3');heading.textContent='The purpose';
 const copy=document.createElement('p');copy.textContent=study.purpose;purpose.append(heading,copy);
 const workflow=document.createElement('section');workflow.className='case-workflow';
 const workflowHeading=document.createElement('h3');workflowHeading.textContent='Inside the experience';
 const list=document.createElement('ol');study.workflow.forEach(text=>{const item=document.createElement('li');item.textContent=text;list.append(item);});
 workflow.append(workflowHeading,list);details.append(purpose,workflow);
 document.querySelector('#dialog-images').innerHTML=project.images.map((src,index)=>`<a href="${src}" target="_blank" rel="noopener" title="Open original screenshot"><img src="${src}" alt="${project.title} — ${index===0?'landing page':'application view'}"></a>`).join('');
 document.querySelector('#dialog-link').innerHTML=project.url?`<a class="button dark" href="${project.url}" target="_blank" rel="noopener noreferrer">${project.linkLabel} ↗</a>`:'';
 dialog.showModal();
}));
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
if('IntersectionObserver' in window){document.documentElement.classList.add('js-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(element=>observer.observe(element));}
document.querySelector('#year').textContent=new Date().getFullYear();
document.querySelectorAll('[data-copy-email]').forEach(button=>button.addEventListener('click',async()=>{const status=document.getElementById(button.dataset.copyEmail);try{await navigator.clipboard.writeText('bret.dumaraos@caap.gov.ph');status.textContent='Email copied. Let’s connect.';}catch{status.textContent='Copy this address: bret.dumaraos@caap.gov.ph';}}));
const art=document.querySelector('.orbit-art');
if(matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches){art.addEventListener('pointermove',event=>{const rect=art.getBoundingClientRect();art.style.transform=`perspective(700px) rotateY(${(event.clientX-rect.left-rect.width/2)/35}deg) rotateX(${-(event.clientY-rect.top-rect.height/2)/35}deg)`;});art.addEventListener('pointerleave',()=>{art.style.transform='none';});}


// Hero typing line. Keep timing and role copy together for easy customization.
const ty = document.getElementById('ty');
const R = ['Lead DevSecOps Developer', 'Systems Administrator', 'Security-minded builder'];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let ri = 0, ci = 0, del = false, typingTimer;
function typeRole() {
  const word = R[ri];
  ci += del ? -1 : 1;
  ty.textContent = word.slice(0, ci);
  let delay = del ? 35 : 70;
  if (!del && ci === word.length) { del = true; delay = 1600; }
  else if (del && ci === 0) { del = false; ri = (ri + 1) % R.length; delay = 300; }
  typingTimer = setTimeout(typeRole, delay);
}
function syncTypingMotion() {
  clearTimeout(typingTimer);
  ri = 0; ci = 0; del = false;
  ty.textContent = R[0];
  if (!reducedMotion.matches) { ty.textContent = ''; typeRole(); }
}
syncTypingMotion();
reducedMotion.addEventListener('change', syncTypingMotion);

// Duplicate equal-width groups for a seamless -50% loop.
const SK = ['DevSecOps', 'CI/CD pipelines', 'Systems administration', 'Incident handling',
  'ICS cybersecurity', 'Security+', 'Automation', 'Hardening'];
const track = document.getElementById('trk');
[false, true].forEach(duplicate => {
  const group = document.createElement('div');
  group.className = 'mq-group';
  if (duplicate) group.setAttribute('aria-hidden', 'true');
  SK.forEach(skill => { const span = document.createElement('span'); span.textContent = skill; group.append(span); });
  track.append(group);
});
const marqueeToggle = document.getElementById('mq-toggle');
marqueeToggle.addEventListener('click', () => {
  const paused = track.classList.toggle('paused');
  marqueeToggle.setAttribute('aria-pressed', String(paused));
  marqueeToggle.setAttribute('aria-label', paused ? 'Resume skills animation' : 'Pause skills animation');
  marqueeToggle.textContent = paused ? 'Play ↔' : 'Pause ↔';
});

// Start in dark mode; remember an explicit visitor choice.
const themeToggle=document.querySelector('#theme-toggle');
function syncThemeButton(){const dark=document.documentElement.dataset.theme==='dark';themeToggle.setAttribute('aria-pressed',String(dark));themeToggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');themeToggle.querySelector('.theme-label').textContent=dark?'Light mode':'Dark mode';document.querySelector('meta[name="theme-color"]').content=dark?'#191d18':'#f3f1eb';}
syncThemeButton();
themeToggle.addEventListener('click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';try{localStorage.setItem('bret-theme',document.documentElement.dataset.theme);}catch{}syncThemeButton();});


// Add supplied portrait/certificate files here; absent assets produce no broken images.
const profileAssets={portrait:null,portraitAlt:'Bret Michael Dumaraos'};
const credentialEvidence=[{issuer:"SANS Institute"},{issuer:"CISA"},{issuer:"Tainocate"},{issuer:"DICT"},{}]; // Optional: image, issuer, verificationUrl.
if(profileAssets.portrait){const image=document.createElement('img');image.src=profileAssets.portrait;image.alt=profileAssets.portraitAlt;image.className='profile-portrait';image.loading='lazy';document.querySelector('.about>div').append(image);}
const credentialDialog=document.querySelector('#credential-dialog');
document.querySelectorAll('.credential').forEach((row,index)=>{
 const button=document.createElement('button');button.type='button';button.className='credential-open';button.textContent='View details ↗';
 const title=row.querySelector('h3').innerText.replace(/\s+/g,' ');
 button.setAttribute('aria-label','View credential: '+title);button.setAttribute('aria-haspopup','dialog');
 row.querySelector('h3').after(button);
 button.addEventListener('click',()=>{
  document.querySelector('#credential-title').textContent=title;
  document.querySelector('#credential-category').textContent=row.querySelector('.credential-type').textContent;
  const evidence=document.querySelector('#credential-evidence');evidence.replaceChildren();
  const data=credentialEvidence[index]||{};
  if(data.issuer){const p=document.createElement('p');p.textContent='Organization / training provider: '+data.issuer;evidence.append(p);}
  if(data.image){const a=document.createElement('a');a.href=data.image;a.target='_blank';a.rel='noopener';const image=document.createElement('img');image.src=data.image;image.alt=title+' certificate';a.append(image);evidence.append(a);}
  if(data.verificationUrl){const a=document.createElement('a');a.href=data.verificationUrl;a.target='_blank';a.rel='noopener noreferrer';a.className='button dark';a.textContent='Verify credential ↗';evidence.append(a);}
  credentialDialog.showModal();
 });
});
document.querySelector('#close-credential').addEventListener('click',()=>credentialDialog.close());
credentialDialog.addEventListener('click',event=>{if(event.target===credentialDialog){const r=credentialDialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)credentialDialog.close();}});
