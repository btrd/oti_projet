QUnit.module('conversion');

QUnit.test('test new Conversion', function(assert) {
  var getElt = sinon.stub(document, 'getElementById');
  var conv = new Conversion('icsData', 'jsonData');

  assert.equal(getElt.callCount, 2);
  assert.deepEqual(conv.creneaux, []);

  document.getElementById.restore();
});

QUnit.test('test handleEvent', function(assert) {
  var conv = new Conversion('icsData', 'jsonData');
  var dem = sinon.stub(conv, 'demarrer', function() { this.creneaux = [1]; });
  var env = sinon.stub(conv, 'envoyerAuServeur');

  conv.handleEvent();
  assert.ok(dem.calledOnce);
  conv.handleEvent();
  assert.ok(env.calledOnce);

  conv.demarrer.restore();
  conv.envoyerAuServeur.restore();
});

QUnit.test('test click button', function(assert) {
  var fixture = '<button id="convertir"/>';
  var fixtureNode = document.getElementById('qunit-fixture');

  fixtureNode.innerHTML = fixture;

  var conv = new Conversion('icsData', 'jsonData');
  var event = sinon.stub(conv, 'handleEvent');

  var button = document.getElementById('convertir');
  button.addEventListener('click', conv);
  button.click();

  assert.ok(event.calledOnce);
  conv.handleEvent.restore();
});

QUnit.test('test conversionChamp null', function(assert) {
  var conv = new Conversion('icsData', 'jsonData');
  var creStart = {debut: "", fin: "", lieu: "", resume: ""};
  var cre = {debut: "", fin: "", lieu: "", resume: ""};

  conv.conversionChamp(creStart, '');
  assert.deepEqual(cre, creStart);

  conv.conversionChamp(creStart, 'TEST:TEST');
  assert.deepEqual(cre, creStart);
});

QUnit.test('test conversionChamp start', function(assert) {
  var conv = new Conversion('icsData', 'jsonData');
  
  var creStart = {debut: "", fin: "", lieu: "", resume: ""};
  var cre = {debut: "TEST_DTSTART", fin: "", lieu: "", resume: ""};

  conv.conversionChamp(creStart, 'DTSTART:TEST_DTSTART');
  assert.deepEqual(cre, creStart);
});

QUnit.test('test conversionChamp end', function(assert) {
  var conv = new Conversion('icsData', 'jsonData');
  
  var creStart = {debut: "", fin: "", lieu: "", resume: ""};
  var cre = {debut: "", fin: "TEST_DTEND", lieu: "", resume: ""};

  conv.conversionChamp(creStart, 'DTEND:TEST_DTEND');
  assert.deepEqual(cre, creStart);
});

QUnit.test('test conversionChamp resume', function(assert) {
  var conv = new Conversion('icsData', 'jsonData');
  
  var creStart = {debut: "", fin: "", lieu: "", resume: ""};
  var cre = {debut: "", fin: "", lieu: "", resume: "TEST_SUMMARY"};

  conv.conversionChamp(creStart, 'SUMMARY:TEST_SUMMARY');
  assert.deepEqual(cre, creStart);
});

QUnit.test('test conversionCreneau', function(assert) {
  var conv = new Conversion('icsData', 'jsonData');
  
  var data = "\nTRANSP:OPAQUE\nDTEND;TZID=Europe/Dublin:20160906T094500\nUID:Icald04a76e28f804f8762ed662a82ed5165\nDTSTAMP:20160831T140451Z\nLOCATION:M5 - A1\nDESCRIPTION: L'objectif était de passer d'une application JAVA vers une \n solution node.js.\nStage effectué par Sufiane Souissi à Ekino.\nRéférent\n  entreprise : Matthieu Comby\nTuteur universitaire : Lionel Seinturier\nSTATUS:CONFIRMED\nSEQUENCE:0\nX-APPLE-TRAVEL-ADVISORY-BEHAVIOR:AUTOMATIC\nSUMMARY: Conception et développement d’une application permettant l’orch\n estration et le provisioning d’un ensemble de services online à la deman\n de et à la destination des professionnels dans un cloud privé.\nDTSTART;TZID=Europe/Dublin:20160906T090000\nCREATED:19000101T120000Z\nLAST-MODIFIED:20160831T140451Z\nEND:VEVENT";
  var creneau = new Creneau();
  creneau.debut = "20160906T090000";
  creneau.fin = "20160906T094500";
  creneau.resume = " Conception et développement d’une application permettant l’orch";
  creneau.lieu = "M5 - A1";

  var creNew = conv.conversionCreneau(data);
  assert.deepEqual(creneau, creNew);
});

QUnit.test('test demarrer', function(assert) {
  var fixture = '<input type="text" id="icsData" value="icsData_test"/>';
  fixture += '<input type="text" id="jsonData"/>';
  var fixtureNode = document.getElementById('qunit-fixture');

  fixtureNode.innerHTML = fixture;

  var conv = new Conversion('icsData', 'jsonData');

  assert.equal(conv.source.value, 'icsData_test');

  var conversion = sinon.stub(conv, 'conversion', function() { this.creneaux = ['json_test']; });
  conv.demarrer();
  assert.equal(conv.cible.value, '[\"json_test\"]');
});

QUnit.test('test conversion', function(assert) {
  var input = 'TRUCBEGIN:VEVENTTOTOBEGIN:VEVENTTATA';
  var conv = new Conversion('icsData', 'jsonData');

  var conversionCreneau = sinon.stub(conv, 'conversionCreneau', function(data) { return data; });
  conv.conversion(input);

  assert.equal(conversionCreneau.callCount, 2);
  assert.deepEqual(conv.creneaux, ['TOTO', 'TATA']);
});

QUnit.test('test envoyerAuServeur', function(assert) {
  var conv = new Conversion('icsData', 'jsonData');
  conv.creneaux = ['TOTO', 'TATA'];

  var conversionCreneau = sinon.stub(window, 'ajouterElementDansTableauALaFin');
  conv.envoyerAuServeur();

  assert.equal(conversionCreneau.callCount, 2);
});
