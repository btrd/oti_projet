class Conversion {
  constructor(source, cible) {
    this.source = document.getElementById(source);
    this.cible = document.getElementById(cible);
    this.creneaux = []
  }

  handleEvent() {
    if (this.creneaux.length === 0) {
      try {
        this.demarrer();
      } catch(e) {
        window.alert(e.toString());
      }
    } else {
      this.envoyerAuServeur();
    }
  }

  demarrer() {
    var icsData = this.source.value;
    if (icsData === '') {
      throw new EmptyIcs(this.source);
    };
    this.conversion(icsData);
    this.cible.value = JSON.stringify(this.creneaux);
  }

  conversion(icsData) {
    var icsData_inArray = icsData.split('BEGIN:VEVENT');
    icsData_inArray.shift();
    for (var index = 0; index < icsData_inArray.length; index++) {
      var creneau = this.conversionCreneau(icsData_inArray[index]);
      this.creneaux.push(creneau);
    }
  }

  conversionCreneau(icsData) {
    var creneau = new Creneau();
    var champs = icsData.split(String.fromCharCode(10));
    champs.shift();
    for (var indexChamps = 0; indexChamps < champs.length; indexChamps++)
      this.conversionChamp(creneau, champs[indexChamps]);
    return creneau;
  }

  conversionChamp(creneau, champActuel) {
    if (champActuel.indexOf(':') !== -1) {
      var couple = champActuel.split(':');
      if(couple[0].startsWith('DTSTART'))
        creneau.debut = couple[1];
      else if(couple[0].startsWith('DTEND'))
        creneau.fin = couple[1];
      else if(couple[0].startsWith('SUMMARY'))
        creneau.resume = couple[1];
      else if(couple[0].startsWith('LOCATION'))
        creneau.lieu = couple[1];
    }
  }

  envoyerAuServeur() {
    for (var i = 0; i < this.creneaux.length; i++) {
      var creneauCourant = this.creneaux[i];
      ajouterElementDansTableauALaFin('agendaJean', creneauCourant,
         success(creneauCourant),
         error(creneauCourant)
      );
    }
  }

  success(creneauCourant) {
    return creneauCourant + 'envoyé au serveur';
  }

  error(creneauCourant) {
    return creneauCourant + 'PAS envoyé au serveur';
  }
}

function EmptyIcs(_e) {
  this.e = _e;
}

EmptyIcs.prototype.toString = function() {
  return 'ICS source is empty : ' + this.e;
}
