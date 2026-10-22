"use strict";
(() => {
  const translations = {
    '.table-shortcut': 'Find my table ↓',
    '#title': 'The wedding of Ianja & Eliza',
    '.hero h2': 'By our side on our special day',
    '.hero .intro': 'Thank you for joining us to celebrate.\nFind your table and enjoy the evening.',
    '.finder > .eyebrow': 'A PLACE FOR EACH OF YOU',
    '#search-title': 'Find your table',
    'label[for="search"]': 'Your first or last name',
    '.hint': 'A few letters are enough, with or without accents.',
    '.section-head .eyebrow': 'WHEN OUR LOVED ONES COME TOGETHER',
    '#tables-title': 'Let’s gather around the table!',
    '.table-intro': 'Tap a table to see its guests.',
    '#demo': 'Demo version · Table names are suggestions and guest names are fictional.',
    '.memories > .eyebrow': 'CELEBRATING THE GRACE OF GOD',
    '#memories-title': 'HE WHO HAS LOVED US SO MUCH AND UNITED US',
    '.memories > .intro': 'Memories of the two of us, and now a joy to share with you.',
    '.photo-gallery figure:nth-child(1) figcaption': 'Everyday tenderness',
    '.photo-gallery figure:nth-child(2) figcaption': 'Hand in hand',
    '.photo-gallery figure:nth-child(3) figcaption': 'The joy of being together',
    '.memories cite': 'Ecclesiastes 4:12',
    'footer p': 'Thank you for being part of our story.'
  };
  const attributes = [
    ['.top > a', 'aria-label', 'Ianja and Eliza — Home'],
    ['#search', 'placeholder', 'For example: Camille'],
    ['#clear', 'aria-label', 'Clear search'],
    ['.welcome-art', 'alt', 'Ianja and Eliza, 29 May 2027. A wooden cross decorated with burgundy, purple and white flowers on an ivory background.'],
    ['.photo-gallery figure:nth-child(1) img', 'alt', 'Ianja kisses Eliza on the cheek by the sea and cliffs of Étretat.'],
    ['.photo-gallery figure:nth-child(2) img', 'alt', 'Ianja kneels and holds Eliza’s hand on the beach at Étretat.'],
    ['.photo-gallery figure:nth-child(3) img', 'alt', 'Ianja and Eliza smile together in formal dress in a garden.'],
    ['meta[name="description"]', 'content', 'Welcome to Ianja and Eliza’s wedding. Find your table and the people sharing your evening.']
  ];
  const originals = new Map(Object.keys(translations).map(selector => [selector, document.querySelector(selector).innerHTML]));
  attributes.forEach(entry => entry.push(document.querySelector(entry[0]).getAttribute(entry[1])));
  const originalTitle = document.title;
  let saved; try { saved = localStorage.getItem('mariage-langue'); } catch (_) {}
  const query = new URLSearchParams(location.search).get('lang');
  window.mariageLangue = ['fr', 'en'].includes(query) ? query : (['fr', 'en'].includes(saved) ? saved : 'fr');
  window.setMariageLangue = lang => {
    if (!['fr', 'en'].includes(lang)) return;
    window.mariageLangue = lang;
    document.documentElement.lang = lang;
    document.title = lang === 'en' ? 'Ianja & Eliza — Our seating plan' : originalTitle;
    Object.entries(translations).forEach(([selector, english]) => {
      const node = document.querySelector(selector);
      if (lang === 'fr') node.innerHTML = originals.get(selector);
      else { node.replaceChildren(); english.split('\n').forEach((line, i) => { if (i) node.append(document.createElement('br')); node.append(document.createTextNode(line)); }); }
    });
    attributes.forEach(([selector, attribute, english, french]) => document.querySelector(selector).setAttribute(attribute, lang === 'en' ? english : french));
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
    try { localStorage.setItem('mariage-langue', lang); } catch (_) {}
    document.dispatchEvent(new Event('mariage:language'));
  };
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => window.setMariageLangue(button.dataset.lang)));
  window.setMariageLangue(window.mariageLangue);
})();
