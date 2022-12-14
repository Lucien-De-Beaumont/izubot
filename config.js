const config = {
  prefix: 'i!',
    zones: {
      categories: {
        "Heroic Academy": "1003690286502920212",
        "Dortoirs garçons": "1003695024959135754",
        "Dortoirs filles": "1003696077121269880",
        "Bâtiment principal": "1003700025056034856",
        "Forêt": "1003708077830324244",
        "Ville": "1003710024981434439",
        "Terre Inconnue": "1007330194786357389",
        "Montagne": "1033338848186486794"
      },
      roles: {
        "Catégorie": "1005525501324054548",
        "academy": "1005526188929851432",
        "boys": "1005526365635887114",
        "girls": "1005526449861697598",
        "bat": "1005526875168321588",
        "foret": "1005526978742468638",
        "ville": "1005527054181204069",
        "terre": "1007332131158102079",
        "mountain": "1033343710844424272",
      },
    },
    roles: {
      'Mute': '874401466104815617',
      autoroles: {
        'arrivee': ['1003235882624618557', '1003303551231066212']
      }
    },
    channels: {
      'transcript-ticket': '1003761933486391306',
      'ticket': '1002182678348582922',
      'category-ticket': '1003761934539182181',
      'reglement': '1002176615779926058',
      'arrivee': '1002141497560399912',
      'depart': '1002141568251211856',
      'plan-environs': '1005615949258436648',
      'meteo': '1013810288241430528',
      'data': '1016786920933687356',
      'goto-logger': '1006227089265008750',
    },
    perms: {
      'fondateur': ['1009588631939338411','1003358879645712414'],
      'wholeStaff': ['1009588631939338411','1003358879645712414', '1002488004847357952', '1003359884886151271', '1003759145331195957'],
      'adminPerms': ['1009588631939338411','1003358879645712414', '1002488004847357952', '1003759145331195957'],
      'moderation': ['1009588631939338411','1003358879645712414', '1002488004847357952', '1003359884886151271'],
      'mecano': ['1003759145331195957'],
    },
    "guild": "1002135735241023548",
  };

module.exports = config;

/*
git add .
git commit -m "TEXTE A COMMIT"
git push
git push heroku main 
*/