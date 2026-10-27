"use strict";
// Seuls les noms de tables et capacités sont publics ; aucun invité ni placement.
(() => {
  const capacities = [...Array(6).fill(10), ...Array(10).fill(8), ...Array(14).fill(6)];
  const names = ["Calvin","Sproul","MacArthur","Saillens","Whitefield","Sibbes","Gaussen","Knox","Watson","Gill","Bunyan","Flavel","Lloyd-Jones","Tozer","Keach","Ravenhill","Augustin","Perkins","Malan","Purnell","Spurgeon","Merle d'Aubigné","Carey","Owen","Knollys","Ryle","Anselm","Dagg","Luther","Coxe"];
  const render = () => {
    const en = document.documentElement.lang === 'en';
    document.querySelector('#date').textContent=en?'29 May 2027':'29 mai 2027';
    document.querySelector('#search-title').textContent=en?'Your table will be revealed on our wedding day':'Votre table se dévoilera le jour J';
    document.querySelector('.hint').textContent=en?'Search available on 29 May 2027.':'Recherche disponible le 29 mai 2027.';
    document.querySelector('.table-intro').textContent=en?'Discover our table names. Guest seating assignments will be revealed on our wedding day.':'Découvrez les noms de nos tables. Le placement des invités sera dévoilé le jour du mariage.';
    document.querySelector('.table-shortcut').textContent=en?'Our tables ↓':'Nos tables ↓';
    document.querySelector('#demo').hidden=true;
    document.querySelector('#count').textContent=en?'30 tables':'30 tables';
    const tables=document.querySelector('#tables');tables.replaceChildren();
    capacities.forEach((capacity,i)=>{
      const card=document.createElement('article');card.className='table';
      const cover=document.createElement('div');cover.className='table-cover';
      const label=document.createElement('span');label.className='eyebrow';label.textContent=`TABLE ${String(i+1).padStart(2,'0')}`;
      const name=document.createElement('span');name.className='table-name';name.textContent=names[i];
      const guests=document.createElement('span');guests.className='guest-count';guests.textContent=en?`${capacity} seats`:`${capacity} places`;
      cover.append(label,name,guests);card.append(cover);tables.append(card);
    });
  };
  document.addEventListener('mariage:language',render);
  render();
})();
