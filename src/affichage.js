class Affichage {

  constructor() {
    this.tableau = {};
  }

  recupererLesDonnees() {
    var self = this;
    avoirToutLeTableau('tableauLePallec', function (retour) {
      var tableau = retour.donnees.tableau.sort();
      self.afficherLesDonnees(tableau);
    });
  }

  afficherLesDonnees(tableau) {
    var tab = this.copie(tableau);

    for (var i = 0; i < tableau.length; i++) {
      this.formaterAffichage(tab[i]);
    }
  }

  copie(tab) {
    var cop = [];
    for (var i = 0; i < tab.length; i++) {
      cop[i]=tab[i];
    }
    return cop;
  }

  formaterAffichage(donnee) {
    var jour = donnee.debut.split(' ')[2];
    var entier = parseInt(jour);
    if(entier > 5 && entier < 10)
      jour = entier;
    else
      jour = 0;

    var div = document.createElement('div');
    div.className = 'col-lg-12';

    document.getElementById('j' + jour).appendChild(div);

    var div2 = document.createElement('div');
    div2.className = 'panel panel-default';
    div.appendChild(div2);

    this.creerUnCarre(donnee.debut.split(' ')[4], div2, 'panel-heading');
    this.creerUnCarre(donnee.resume, div2, 'panel-body');
    this.creerUnCarre(donnee.lieu, div2, 'panel-footer');

  }

  creerUnCarre(donnee, parent, myClass) {
    var div = document.createElement('div');
    div.className = myClass;

    var text = document.createTextNode(donnee);
    div.appendChild(text);

    parent.appendChild(div);
  }
}

var launcher = new Affichage();
launcher.recupererLesDonnees();

class triTabIndex {
  constructor() {
    this.tab = [];
    this.cpt = 0;
  }

  addValue(val) {
    this.tab = val;
    this.cpt++;
  }

  trier() {
    var min;
    var p;
    for (var i = 0; i < this.tab.length -1; i++) {
      min = 0;
      for (var j = i + 1; j < this.tab.length; j++) {
        if(this.tab[j].value < this.tab[i].value)
          min = j;
      }
      if (min !== i) {
        p = new Index();
        p.index = this.tab[i].index;
        p.value = this.tab[i].value;
        this.tab[i] = this.tab[min];
        this.tab[min] = p;
      }
    }
  }
}

class Index {
  constructor() {
    this.index = 0;
    this.value = 0;
  }
}
