"use strict";
(() => {
  const config = window.CONFIRMATION;
  const $ = selector => document.querySelector(selector);
  const french = Object.fromEntries([...document.querySelectorAll('[data-i18n]')].map(el => [el.dataset.i18n, el.textContent]));
  const en = {
    date:'29 MAY 2027',welcome:'By our side on our special day',intro:'Thank you for joining us to celebrate.',
    eyebrow:'THE JOY OF HAVING YOU BY OUR SIDE',title:'Your final RSVP',deadline:'Please reply by 10 January 2027 (inclusive).',
    setup:'The form will be available soon. Responses cannot be submitted yet.',name:'Your first and last name',attending:'Will you be joining us?',yes:'Yes, with pleasure!',no:'Unfortunately, we cannot attend',count:'Total number of people, including yourself',names:'First and last name of everyone attending',namesHelp:'One person per line, including yourself.',diet:'Dietary requirements or allergies (optional)',dietHelp:'Name the person concerned and include only information needed for the meal.',consent:'I agree that Ianja and Eliza may use this information to organise the wedding and meal.',privacy:'Your responses are private and accessible to the couple. They are stored through Google and are not published on this website. Please obtain permission from anyone you are responding for.',send:'Confirm my response',closedEyebrow:'THANK YOU FOR YOUR RESPONSES',closedTitle:'RSVPs are now closed',closedOne:'We are sorry, but registration has been closed since 10 January. Our commitments to our suppliers require us to respect this deadline.',closedTwo:'If you did not confirm your attendance by that date, unfortunately we will not be able to include you among the dinner guests.',closedThanks:'Thank you for your understanding.',seatingTitle:'A place is waiting for you',seatingIntro:'Find your table and enjoy the evening.',seatingLink:'View the seating plan',practicalEyebrow:'JOIN US',practicalTitle:'Practical information',dateFull:'We look forward to seeing you on Saturday 29 May 2027.',details:'Times and addresses will be provided here soon.',seatingNotice:'The seating plan will be available here from 28 May 2027.',footer:'Thank you for being part of our story.'
  };
  const messages = {
    fr:{sending:'Envoi en cours…',success:'Merci ! Votre réponse a bien été enregistrée. Nous avons hâte de partager ce jour avec vous.',declined:'Merci de nous avoir répondu. Votre réponse a bien été enregistrée.',timeout:'Nous n’avons pas reçu la confirmation d’enregistrement. Vous pouvez réessayer : une nouvelle tentative identique ne créera pas de doublon.',error:'L’enregistrement n’a pas pu être confirmé. Réessayez dans un instant.',closed:'Les confirmations de présence sont closes.',invalid:'Vérifiez les champs du formulaire.',names:'Indiquez une personne par ligne, avec autant de lignes que de personnes annoncées.'},
    en:{sending:'Sending…',success:'Thank you! Your response has been saved. We look forward to celebrating with you.',declined:'Thank you for letting us know. Your response has been saved.',timeout:'We have not received confirmation that your response was saved. You may retry: an identical retry will not create a duplicate.',error:'We could not confirm that your response was saved. Please try again shortly.',closed:'RSVPs are now closed.',invalid:'Please check the form fields.',names:'Enter one person per line, matching the total number of people.'}
  };
  Object.assign(en, {
    email:'Your email address',phone:'Your phone number',country:'Country and calling code',
    phoneHelp:'Choose the country code on the left, then enter the rest of the number. For example, for the UK: +44 and 7700 900123, without the initial zero.',
    privacyStart:'Your responses are private and accessible ',privacyOnly:'only',privacyEnd:' to the couple. They will not be published on the website.',
    contactHelp:'One email address and one phone number are enough for this response, including for a couple or family. We will use them to contact you about the wedding.',
    events:'Which parts of the day will you attend?',
    ceremonyRule:'If you are attending our wedding, attendance at the ceremony is required, even if you are only joining the drinks reception or dinner afterwards.',
    ceremony:'Ceremony (required)',drinks:'Drinks reception',reception:'Wedding reception / dinner',
    eventsHelp:'These choices apply to everyone in this response. If you will attend different parts of the day, please submit a separate response for the people concerned.',
    invitationRule:'Only the people named on the invitation you received can be included. If you add someone who is not named on it, we will contact you to explain that unfortunately we will not be able to accommodate them.',
    guestHelp:'You are already included in this response. Coming on your own? Do not add anyone. For a couple or family, add each other invited person who will be attending.',
    addGuest:'+ Add a guest'
  });
  let lang = 'fr', pending = false, completed = false, timer, messageKey = '';
  let saved; try { saved = localStorage.getItem('mariage-langue'); } catch (_) {}
  const requested = new URLSearchParams(location.search).get('lang');
  const initial = ['fr','en'].includes(requested) ? requested : (['fr','en'].includes(saved) ? saved : 'fr');
  const endpointReady = /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(config.endpoint);
  const parisDate = () => { const parts = new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()); const part = type => parts.find(p=>p.type===type).value; return `${part('year')}-${part('month')}-${part('day')}`; };
  const isOpen = () => parisDate() <= config.closingDate;
  const setMessage = key => { messageKey = key; $('#form-status').textContent = key ? messages[lang][key] : ''; };
  const state = () => {
    const today = parisDate(), seating = today >= config.seatingDate;
    $('#registration').hidden = !isOpen(); $('#closed').hidden = isOpen() || seating;
    $('#seating').hidden = !seating; $('#seating-notice').hidden = seating;
    $('#setup').hidden = endpointReady; $('#send').disabled = !endpointReady || !isOpen() || pending || completed;
  };
  let guestSequence = 0;
  const guestRows = [];
  const populateCountries = () => {
    const selected = $('#phone-country').value || 'FR';
    const names = new Intl.DisplayNames([lang],{type:'region'});
    const options = libphonenumber.getCountries().map(country => ({country,name:names.of(country),code:libphonenumber.getCountryCallingCode(country)})).sort((a,b)=>a.name.localeCompare(b.name,lang));
    $('#phone-country').replaceChildren();
    options.forEach(({country,name,code})=>{const option=document.createElement('option');option.value=country;option.textContent=`${name} (+${code})`;$('#phone-country').append(option);});
    $('#phone-country').value=selected;
  };
  const validateNames = () => {
    $('#dial-code').textContent = `+${libphonenumber.getCountryCallingCode($('#phone-country').value)} ▾`;
    $('#phone-country').setAttribute('title',new Intl.DisplayNames([lang],{type:'region'}).of($('#phone-country').value));
    const example = window.EXEMPLES_TELEPHONE[$('#phone-country').value];
    const callingCode = libphonenumber.getCountryCallingCode($('#phone-country').value);
    $('#contact-phone').setAttribute('placeholder',example);
    $('#phone-help').textContent = lang === 'en' ? `Example: choose +${callingCode} on the left and enter ${example} on the right.` : `Exemple : sélectionnez +${callingCode} à gauche et saisissez ${example} à droite.`;
    const phone = libphonenumber.parsePhoneNumberFromString($('#contact-phone').value,$('#phone-country').value);
    const validPhone = /^[+0-9\s().-]+$/.test($('#contact-phone').value) && phone && phone.isPossible() && !phone.ext;
    $('#international-phone').value = validPhone ? phone.number : '';
    $('#contact-phone').setCustomValidity($('#contact-phone').value && !validPhone ? (lang === 'en' ? 'Check the phone number and selected country.' : 'Vérifiez le numéro de téléphone et le pays sélectionné.') : '');
    const yes = $('#rsvp').elements.attendance.value === 'yes';
    const names = [$('#full-name').value.trim(), ...guestRows.map(row=>row.input.value.trim())];
    $('#guest-count').value = String(yes ? names.length : 0);
    $('#guest-names').value = yes ? names.join('\n') : '';
    $('#full-name').setCustomValidity($('#full-name').value && $('#full-name').value.trim().length < 2 ? (lang === 'en' ? 'Please enter your first and last name.' : 'Veuillez saisir votre prénom et nom.') : '');
    guestRows.forEach((row,i) => {
      row.label.textContent = lang === 'en' ? `Guest ${i+2} — First and last name` : `Invité ${i+2} — Prénom et nom`;
      row.remove.textContent = lang === 'en' ? 'Remove' : 'Retirer';
      row.remove.setAttribute('aria-label',lang === 'en' ? `Remove guest ${i+2}` : `Retirer l’invité ${i+2}`);
      row.input.disabled = !yes || completed; row.input.required = yes;
      row.input.setCustomValidity(row.input.value && row.input.value.trim().length < 2 ? (lang === 'en' ? 'Please enter a first and last name.' : 'Veuillez saisir un prénom et nom.') : '');
    });
    $('#guest-total').textContent = lang === 'en' ? `${names.length} ${names.length === 1 ? 'person' : 'people'} attending, including you` : `${names.length} personne${names.length > 1 ? 's' : ''} présente${names.length > 1 ? 's' : ''}, vous compris`;
    $('#add-guest').disabled = guestRows.length >= 29 || completed || pending;
  };
  $('#add-guest').addEventListener('click', () => {
    if (guestRows.length >= 29 || completed || pending) return;
    const row = document.createElement('div'); row.className = 'guest-entry';
    const label = document.createElement('label'), input = document.createElement('input'), remove = document.createElement('button');
    input.id = `extra-guest-${++guestSequence}`; input.type = 'text'; input.maxLength = 120; input.autocomplete = 'off';
    label.htmlFor = input.id; remove.type = 'button'; remove.className = 'remove-guest';
    const entry = {row,label,input,remove};
    input.addEventListener('input',validateNames);
    remove.addEventListener('click', () => { if (pending || completed) return; guestRows.splice(guestRows.indexOf(entry),1); row.remove(); validateNames(); $('#add-guest').focus(); });
    row.append(label,input,remove); guestRows.push(entry); $('#additional-guests').append(row); validateNames(); input.focus();
  });
  function language(next) {
    lang = next; document.documentElement.lang = lang;
    document.title = lang === 'en' ? 'Ianja & Eliza — RSVP' : 'Ianja & Eliza — Confirmation de présence';
    document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = (lang === 'en' ? en : french)[el.dataset.i18n]);
    if (config.practical[lang]) $('#practical-details').textContent = config.practical[lang];
    document.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===lang)));
    $('#response-language').value = lang; $('#seating-link').href = `plan-de-table.html?lang=${lang}`;
    try { localStorage.setItem('mariage-langue',lang); } catch (_) {}
    populateCountries(); validateNames(); setMessage(messageKey); state();
  }
  document.querySelectorAll('[data-lang]').forEach(el=>el.addEventListener('click',()=>language(el.dataset.lang)));
  $('#rsvp').addEventListener('change', () => {
    const yes = $('#rsvp').elements.attendance.value === 'yes'; $('#guest-fields').hidden = !yes;
    ['guest-count','guest-names','diet'].forEach(id => { $('#'+id).disabled = !yes; });
    ['ceremony','drinks','reception'].forEach(id => { $('#'+id).disabled = !yes; });
    $('#ceremony').required = yes;
    validateNames();
  });
  $('#full-name').addEventListener('input',validateNames);
  $('#contact-phone').addEventListener('input',validateNames);
  $('#phone-country').addEventListener('change',validateNames);
  const uuid = () => crypto.randomUUID ? crypto.randomUUID() : Array.from(crypto.getRandomValues(new Uint8Array(16)),b=>b.toString(16).padStart(2,'0')).join('');
  let previousPayload = '';
  $('#rsvp').addEventListener('submit', event => {
    event.preventDefault(); state();
    if (pending || completed || !endpointReady) return;
    if (!isOpen()) { setMessage('closed'); return; }
    validateNames(); if (!$('#rsvp').reportValidity()) return;
    const form = $('#rsvp');
    const payload = JSON.stringify([...new FormData(form)].filter(([key])=>!['requestId','language'].includes(key)));
    if (previousPayload !== payload || !$('#request-id').value) $('#request-id').value = uuid();
    previousPayload = payload;
    pending = true; state(); setMessage('sending');
    form.action = config.endpoint;
    HTMLFormElement.prototype.submit.call(form);
    timer = setTimeout(()=>{pending=false;setMessage('timeout');state();},45000);
  });
  window.addEventListener('message',event=>{
    let trusted = false;
    try { const origin = new URL(event.origin); trusted = origin.protocol === 'https:' && (origin.hostname === 'script.google.com' || origin.hostname === 'script.googleusercontent.com' || origin.hostname.endsWith('.script.googleusercontent.com')); } catch (_) {}
    const result = event.data;
    if (!trusted || !pending || !result || result.type !== 'wedding-rsvp' || result.requestId !== $('#request-id').value) return;
    clearTimeout(timer); pending=false;
    if(result.ok) {
      completed = true; setMessage($('#rsvp').elements.attendance.value === 'yes' ? 'success' : 'declined');
      [...$('#rsvp').elements].forEach(el=>el.disabled=true);
    } else setMessage(result.code === 'closed' ? 'closed' : result.code === 'invalid' ? 'invalid' : 'error');
    state(); $('#form-status').focus();
  });
  language(initial); setInterval(state,60000);
})();
