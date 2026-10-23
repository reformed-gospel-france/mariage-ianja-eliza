"use strict";
// Texte fourni par les mariés : Confession de foi baptiste de 1689, chapitre 25.
(() => {
  const footer=document.querySelector('footer');if(!footer)return;
  const content={
    fr:{summary:'Notre engagement',source:'Confession de foi baptiste de 1689',title:'Chapitre 25 — Le mariage',paragraphs:[
      ['Le mariage est entre un seul homme et une seule femme ; aussi, il n’est pas permis qu’un homme ait plus d’une femme ou qu’une femme ait plus d’un mari, à la fois.', '1. Gn 2.24 ; Ml 2.15 ; Mt 19.5-6'],
      ['Le mariage a été institué pour le soutien mutuel du mari et de la femme, pour l’accroissement du genre humain par légitime descendance, et pour parer à l’impudicité.', '2. Gn 2.18 · 3. Gn 1.28 · 4. 1 Co 7.2, 9'],
      ['Tous ceux qui sont capables de donner leur consentement avec discernement, peuvent légitimement se marier. Cependant, il est du devoir des chrétiens de ne se marier que dans le Seigneur. Par conséquent, ceux qui professent la vraie religion ne doivent pas se marier avec des infidèles ou des idolâtres ; de plus, leur piété devrait les empêcher de se mettre sous un joug différent, en épousant des personnes notoirement connues pour leur inconduite ou qui soutiennent de damnables hérésies.', '5. Hé 13.4 ; 1 Tm 4.3 · 6. 1 Co 7.39 · 7. Ne 13.25-27'],
      ['Il ne doit pas y avoir de mariage aux degrés de consanguinité ou de parenté par alliance interdits par la Parole. De tels mariages incestueux ne peuvent être légitimés par aucune loi humaine, ni par le consentement des parties, pour permettre à ces personnes de vivre ensemble comme mari et femme.', '8. cf. Lv 18 · 9. Mc 6.18 ; 1 Co 5.1']
    ]},
    en:{summary:'Our commitment',source:'The 1689 Baptist Confession of Faith',title:'Chapter 25 — Of Marriage',paragraphs:[
      ['Marriage is to be between one man and one woman; neither is it lawful for any man to have more than one wife, nor for any woman to have more than one husband at the same time.', '1. Gen. 2:24; Mal. 2:15; Matt. 19:5–6'],
      ['Marriage was ordained for the mutual help of husband and wife, for the increase of mankind with a legitimate issue, and the preventing of uncleanness.', '2. Gen. 2:18 · 3. Gen. 1:28 · 4. 1 Cor. 7:2, 9'],
      ['It is lawful for all sorts of people to marry, who are able with judgment to give their consent; yet it is the duty of Christians to marry in the Lord; and therefore such as profess the true religion, should not marry with infidels, or idolaters; neither should such as are godly, be unequally yoked, by marrying with such as are wicked in their life, or maintain damnable heresy.', '5. Heb. 13:4; 1 Tim. 4:3 · 6. 1 Cor. 7:39 · 7. Neh. 13:25–27'],
      ['Marriage ought not to be within the degrees of consanguinity or affinity, forbidden in the Word; nor can such incestuous marriages ever be made lawful, by any law of man or consent of parties, so as those persons may live together as man and wife.', '8. Lev. 18 · 9. Mark 6:18; 1 Cor. 5:1']
    ]}
  };
  const details=document.createElement('details');details.className='commitment';
  const summary=document.createElement('summary'),body=document.createElement('div');body.className='commitment-body';
  details.append(summary,body);footer.append(details);
  const el=(tag,text,cls)=>{const node=document.createElement(tag);node.textContent=text;if(cls)node.className=cls;return node;};
  const render=()=>{
    const lang=document.documentElement.lang==='en'?'en':'fr',text=content[lang];
    summary.textContent=text.summary;body.lang=lang;body.replaceChildren();
    body.append(el('p',text.source,'commitment-source'),el('h2',text.title));
    text.paragraphs.forEach(([paragraph,references],i)=>{
      const section=document.createElement('section');
      section.append(el('h3',`${lang==='en'?'Paragraph':'Paragraphe'} ${i+1}`),el('p',paragraph),el('p',references,'commitment-references'));
      body.append(section);
    });
  };
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();
})();
