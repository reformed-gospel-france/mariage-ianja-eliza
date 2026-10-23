"use strict";
// Aucun nom de table ni d’invité dans cette page publique.
(() => {
  const capacities = [...Array(6).fill(10), ...Array(10).fill(8), ...Array(14).fill(6)];
  const render = () => {
    const en = document.documentElement.lang === 'en';
    document.querySelector('#date').textContent=en?'29 May 2027':'29 mai 2027';
    document.querySelector('#search-title').textContent=en?'Your table will be revealed on our wedding day':'Votre table se dévoilera le jour J';
    document.querySelector('.hint').textContent=en?'Find your place here on 29 May 2027.':'Retrouvez votre place ici le 29 mai 2027.';
    document.querySelector('.table-intro').textContent=en?'Table names and guest names will be revealed on our wedding day.':'Les noms des tables et des invités seront dévoilés le jour du mariage.';
    document.querySelector('.table-shortcut').textContent=en?'Our tables ↓':'Nos tables ↓';
    document.querySelector('#demo').hidden=true;
    document.querySelector('#count').textContent=en?'30 tables · To be revealed':'30 tables · À découvrir';
    const tables=document.querySelector('#tables');tables.replaceChildren();
    capacities.forEach((capacity,i)=>{
      const card=document.createElement('article');card.className='table';
      const cover=document.createElement('div');cover.className='table-cover';
      const label=document.createElement('span');label.className='eyebrow';label.textContent=`TABLE ${String(i+1).padStart(2,'0')}`;
      const name=document.createElement('span');name.className='table-name';name.textContent=en?'To be revealed':'Table à découvrir';
      const guests=document.createElement('span');guests.className='guest-count';guests.textContent=en?`${capacity} seats`:`${capacity} places`;
      cover.append(label,name,guests);card.append(cover);tables.append(card);
    });
  };
  document.addEventListener('mariage:language',render);
  render();
})();
