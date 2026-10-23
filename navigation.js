"use strict";
(() => {
  const header = document.querySelector('.top');
  if (!header) return;
  const config = window.CONFIRMATION;
  const dateParts = new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const part = type => dateParts.find(p=>p.type===type).value;
  const seatingOpen = `${part('year')}-${part('month')}-${part('day')}` >= config.seatingDate;
  const toggle = document.createElement('button');
  toggle.type='button'; toggle.id='menu-toggle'; toggle.className='menu-toggle';
  toggle.setAttribute('aria-controls','main-navigation'); toggle.setAttribute('aria-expanded','false');
  const nav = document.createElement('nav');nav.id='main-navigation';nav.className='main-navigation';
  const items = [
    ['index.html','Accueil','Home'],['infos-pratiques.html','Infos pratiques','Practical information'],
    ['liste-de-mariage.html','Liste de mariage','Gift list'],
    ['plan-de-table.html','Plan de table','Seating plan'],
    ['questions-frequentes.html','Questions fréquentes','FAQs']
  ];
  const file = location.pathname.split('/').pop() || 'index.html';
  const links=items.map(([href,fr,en])=>{
    const link=document.createElement('a');
    if(href===file || (file==='plan-de-table.html' && fr==='Plan de table'))link.setAttribute('aria-current','page');
    nav.append(link);return {link,href,fr,en};
  });
  header.append(toggle,nav);
  const close=()=>{header.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');};
  toggle.addEventListener('click',()=>{const opened=toggle.getAttribute('aria-expanded')==='true';header.classList.toggle('menu-open',!opened);toggle.setAttribute('aria-expanded',String(!opened));});
  header.addEventListener('keydown',event=>{if(event.key==='Escape'){close();toggle.focus();}});
  nav.addEventListener('click',event=>{if(event.target.closest('a'))close();});
  function refresh() {
    const lang=document.documentElement.lang==='en'?'en':'fr';
    toggle.textContent='☰ Menu';nav.setAttribute('aria-label',lang==='en'?'Main navigation':'Navigation principale');
    links.forEach(({link,href,fr,en})=>{link.textContent=lang==='en'?en:fr;link.href=`${href}?lang=${lang}`;if(fr==='Plan de table'&&!seatingOpen){const badge=document.createElement('span');badge.className='nav-badge';badge.textContent=lang==='en'?'29 May':'29 mai';link.append(badge);}});
    document.querySelectorAll('[data-page-fr]').forEach(el=>{el.textContent=el.getAttribute(lang==='en'?'data-page-en':'data-page-fr');});
    document.querySelectorAll('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===lang)));
    const heading=document.querySelector('[data-page-title]');if(heading)document.title=`Ianja & Eliza — ${heading.textContent}`;
    const home=document.querySelector('.page-home');if(home)home.href=`index.html?lang=${lang}`;
    const access=document.querySelector('#open-seating');if(access){access.hidden=!seatingOpen;access.href=`plan-de-table.html?lang=${lang}`;}
  }
  // Les pages du formulaire et du plan de table gèrent déjà leur traduction.
  if(!document.querySelector('#rsvp')&&!document.querySelector('#tables')){
    let stored;try{stored=localStorage.getItem('mariage-langue');}catch(_){}
    const query=new URLSearchParams(location.search).get('lang');
    document.documentElement.lang=['fr','en'].includes(query)?query:(stored==='en'?'en':'fr');
    document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{
      document.documentElement.lang=button.dataset.lang;try{localStorage.setItem('mariage-langue',button.dataset.lang);}catch(_){}refresh();
    }));
  }
  new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  refresh();
})();
