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
