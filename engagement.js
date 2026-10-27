"use strict";
// Texte fourni par les mariés : Confession de foi baptiste de 1689, chapitre 25.
(() => {
  const body=document.querySelector('#confession-content');if(!body)return;
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
  const family={
    fr:{source:'La Profession de Foi Baptiste et son Message 2000',title:'Article 18 - La famille',paragraphs:[
      'Dieu a ordonné que la famille soit l’institution fondamentale de la société humaine. Elle est composée de personnes en relation l’une avec l’autre par le mariage, par le sang ou par l’adoption.',
      'Le mariage est l’union d’un homme et d’une femme dans une obligation d’alliance qui dure à vie. C’est l’unique don de Dieu de révéler l’union entre Christ et Son Église et de donner à l’homme, ainsi qu’à la femme en mariage, le cadre d’une camaraderie intime, le moyen d’une expression sexuelle selon les normes bibliques et le moyen de procréation de la race humaine.',
      'L’homme et la femme sont d’une valeur égale devant Dieu, tous les deux étant créés à l’image de Dieu. Le mariage est le modèle de la relation de Dieu avec Son peuple. Le mari doit aimer sa femme comme Christ a aimé l’Église. Il a la responsabilité divine de pourvoir aux besoins de sa famille, de la protéger et de la diriger. La femme se soumet gracieusement au leadership serviable de son mari comme l’Église se soumet volontairement à Christ son chef. La femme, créée à l’image de Dieu comme son mari, donc, égale à lui, a la responsabilité que Dieu lui donne de respecter son mari et de servir comme son aide dans la gérance du foyer et l’éducation de la génération suivante.',
      'Du moment de leur conception, les enfants sont une bénédiction et un héritage du Seigneur. Les parents ont la responsabilité d’être un exemple à leurs enfants du mariage que Dieu ordonne. Les parents doivent enseigner à leurs enfants les valeurs morales et spirituelles, de les guider par un mode de vie cohérent et une discipline d’amour ainsi que de faire des choix basés sur la vérité biblique. Les enfants doivent honorer et obéir à leurs parents.'
    ],references:'Gn. 1:26-28 ; 2:15-25 ; 3:1-20 ; Ex. 20:12 ; Dt. 6:4-9 ; Jos. 24:15 ; 1 Sam. 1:26-28 ; Ps. 51:5 ; 78:1-8 ; 128 ; 139:13-16 ; Prov. 1:8 ; 5:15-20 ; 6:20-22 ; 12:4 ; 13:24 ; 14:1 ; 17:6 ; 18:22 ; 22:6, 15 ; 23:13-14 ; 24:3 ; 29:15, 17 ; 31:10-31 ; Ecc. 4:9-12 ; 9:9 ; Mal. 2:14-16 ; Mat. 1:18-32 ; 5:31-32 ; 18:2-5 ; 19:3-9 ; Mc. 10:6-12 ; Rom. 1:18-32 ; 1 Cor. 7:1-16 ; Eph. 5:21-33 ; 6:1-4 ; Col. 3:18-21 ; 1 Tim. 5:8, 14 ; 2 Tim. 1:3-5 ; Tites 2:3-5 ; Héb. 13:4 ; 1 Pierre 3:1-7'},
    en:{source:'The Baptist Faith and Message 2000',title:'Article 18 — The Family',paragraphs:[
      'God has ordained the family as the foundational institution of human society. It is composed of persons related to one another by marriage, blood, or adoption.',
      'Marriage is the uniting of one man and one woman in covenant commitment for a lifetime. It is God’s unique gift to reveal the union between Christ and His church and to provide for the man and the woman in marriage the framework for intimate companionship, the channel of sexual expression according to biblical standards, and the means for procreation of the human race.',
      'The husband and wife are of equal worth before God, since both are created in God’s image. The marriage relationship models the way God relates to His people. A husband is to love his wife as Christ loved the church. He has the God-given responsibility to provide for, to protect, and to lead his family. A wife is to submit herself graciously to the servant leadership of her husband even as the church willingly submits to the headship of Christ. She, being in the image of God as is her husband and thus equal to him, has the God-given responsibility to respect her husband and to serve as his helper in managing the household and nurturing the next generation.',
      'Children, from the moment of conception, are a blessing and heritage from the Lord. Parents are to demonstrate to their children God’s pattern for marriage. Parents are to teach their children spiritual and moral values and to lead them, through consistent lifestyle example and loving discipline, to make choices based on biblical truth. Children are to honor and obey their parents.'
    ],references:'Genesis 1:26-28; 2:15-25; 3:1-20; Exodus 20:12; Deuteronomy 6:4-9; Joshua 24:15; 1 Samuel 1:26-28; Psalms 51:5; 78:1-8; 127; 128; 139:13-16; Proverbs 1:8; 5:15-20; 6:20-22; 12:4; 13:24; 14:1; 17:6; 18:22; 22:6,15; 23:13-14; 24:3; 29:15,17; 31:10-31; Ecclesiastes 4:9-12; 9:9; Malachi 2:14-16; Matthew 5:31-32; 18:2-5; 19:3-9; Mark 10:6-12; Romans 1:18-32; 1 Corinthians 7:1-16; Ephesians 5:21-33; 6:1-4; Colossians 3:18-21; 1 Timothy 5:8,14; 2 Timothy 1:3-5; Titus 2:3-5; Hebrews 13:4; 1 Peter 3:1-7.'}
  };
  const el=(tag,text,cls)=>{const node=document.createElement(tag);node.textContent=text;if(cls)node.className=cls;return node;};
  const render=()=>{
    const lang=document.documentElement.lang==='en'?'en':'fr',text=content[lang];
    body.lang=lang;body.replaceChildren();
    body.append(el('p',text.source,'commitment-source'),el('h2',text.title));
    text.paragraphs.forEach(([paragraph,references],i)=>{
      const section=document.createElement('section');
      section.append(el('h3',`${lang==='en'?'Paragraph':'Paragraphe'} ${i+1}`),el('p',paragraph),el('p',references,'commitment-references'));
      body.append(section);
    });
    const extra=family[lang],article=document.createElement('section');article.className='family-confession';
    article.append(el('p',extra.source,'commitment-source'),el('h2',extra.title));
    extra.paragraphs.forEach(paragraph=>article.append(el('p',paragraph)));
    article.append(el('p',extra.references,'commitment-references'));
    const source=el('a',lang==='en'?'Read the original English text':'Lire le texte original en anglais','confession-source-link');source.href='https://bfm.sbc.net/bfm2000/#xviii-the-family';article.append(source);
    body.append(article);
  };
  new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();
})();
