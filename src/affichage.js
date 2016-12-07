class Affichage {

  constructor() {}

  getData() {
    var self = this;
    avoirToutLeTableau('tableauLePallec', function (res) {
      var array = res.donnees.tableau;
      self.showData(array);
    });
  }

  showData(array) {
    array = this.formatData(array);
    for (var i = 0; i < array.length; i++) {
      this.showElt(array[i]);
    }
  }

  formatData(array) {
    array = array.filter(function(e) { return e.debut !== undefined });
    array = array.map(function(e) {
      e.debut = new Date(e.debut);
      e.fin = new Date(e.fin);
      return e;
    });
    
    array = array.sort(function(a, b){
      return b.debut - a.debut;
    });
    return array;
  }

  showElt(elt) {
    var col = this.getCol(elt.debut);

    var div = document.createElement('div');
    div.className = 'panel panel-default';

    var time = elt.debut.getHours() + ':' + elt.debut.getMinutes() + ' - ' + elt.fin.getHours() + ':' + elt.fin.getMinutes();
    this.createElt(time, div, 'panel-heading');
    this.createElt(elt.resume, div, 'panel-body');
    this.createElt(elt.lieu, div, 'panel-footer');

    col.appendChild(div);
  }

  getCol(date) {
    var date_id = 'j' + date.getFullYear() + date.getMonth() + date.getDay();
    var col = document.getElementById(date_id);

    if (col === null) {
      var row = document.getElementById('row');

      col = document.createElement('div');
      col.className = 'col';
      col.id = date_id;
      row.appendChild(col);
      
      var title = document.createElement('h2');
      title.innerHTML = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
      col.appendChild(title)
    }
    return col;
  }

  createElt(content, parent, myClass) {
    var div = document.createElement('div');
    div.className = myClass;
    div.innerHTML = content;
    parent.appendChild(div);
  }
}
