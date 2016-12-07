QUnit.module('affichage');

QUnit.test('test getData', function(assert) {
  var aff = new Affichage();
  var getArray = sinon.stub(window, 'avoirToutLeTableau', function(type, callback) { callback({donnees: { tableau: []}}); });
  var showData = sinon.stub(aff, 'showData');

  aff.getData();

  assert.ok(getArray.calledOnce);
  assert.ok(showData.calledOnce);

  window.avoirToutLeTableau.restore();
  aff.showData.restore();
});

QUnit.test('test showData', function(assert) {
  var aff = new Affichage();
  var formatData = sinon.stub(aff, 'formatData', function(arg) { return arg });
  var showElt = sinon.stub(aff, 'showElt');

  aff.showData([1, 2]);

  assert.ok(formatData.calledOnce);
  assert.equal(showElt.callCount, 2);

  aff.showElt.restore();
});

QUnit.test('test formatData order by date', function(assert) {
  var aff = new Affichage();

  var res = aff.formatData([{debut:'2016-09-06T07:00:00.000Z', fin:'2016-09-06T07:45:00.000Z', resume:'Conception', lieu:'A1'}, {debut:'2016-09-08T07:45:00.000Z', fin:'2016-09-08T08:30:00.000Z', resume:'Approche', lieu:'A14'}, {debut:'2016-09-08T07:00:00.000Z', fin:'2016-09-08T07:45:00.000Z', resume:'Automatisation', lieu:'A2'}, {debut:'2016-09-06T12:30:00.000Z', fin:'2016-09-06T13:15:00.000Z', resume:'Transcription', lieu:'A2'}, {debut:'2016-09-07T11:30:00.000Z', fin:'2016-09-07T12:15:00.000Z', resume:'Etudes', lieu:'A1'}]);

  assert.deepEqual(res, [{debut: new Date('Thu Sep 08 2016 09:45:00 GMT+0200 (CEST)'), fin: new Date('Thu Sep 08 2016 10:30:00 GMT+0200 (CEST)'), lieu: 'A14', resume: 'Approche'}, {debut: new Date('Thu Sep 08 2016 09:00:00 GMT+0200 (CEST)'), fin: new Date('Thu Sep 08 2016 09:45:00 GMT+0200 (CEST)'), lieu: 'A2', resume: 'Automatisation'}, {debut: new Date('Wed Sep 07 2016 13:30:00 GMT+0200 (CEST)'), fin: new Date('Wed Sep 07 2016 14:15:00 GMT+0200 (CEST)'), lieu: 'A1', resume: 'Etudes'}, {debut: new Date('Tue Sep 06 2016 14:30:00 GMT+0200 (CEST)'), fin: new Date('Tue Sep 06 2016 15:15:00 GMT+0200 (CEST)'), lieu: 'A2', resume: 'Transcription'}, {debut: new Date('Tue Sep 06 2016 09:00:00 GMT+0200 (CEST)'), fin: new Date('Tue Sep 06 2016 09:45:00 GMT+0200 (CEST)'), lieu: 'A1', resume: 'Conception'}]);
});

QUnit.test('test formatData no debut', function(assert) {
  var aff = new Affichage();

  var res = aff.formatData([{resume: 'toto'}]);

  assert.deepEqual(res, []);
});

QUnit.test('test showElt', function(assert) {
  var fixture = '<div id="test_div"/>';
  var fixtureNode = document.getElementById('qunit-fixture');
  fixtureNode.innerHTML = fixture;

  var aff = new Affichage();
  var getCol = sinon.stub(aff, 'getCol', function() { return document.getElementById('test_div');});
  var createElt = sinon.stub(aff, 'createElt');

  var start = new Date('Tue Sep 06 2016 09:00:00 GMT+0200 (CEST)');
  var end = new Date('Tue Sep 06 2016 09:45:00 GMT+0200 (CEST)');
  aff.showElt({debut: start, fin: end, lieu: 'A1', resume: 'Conception'});

  assert.ok(getCol.calledOnce);
  assert.equal(document.getElementById('test_div').innerHTML, '<div class="panel panel-default"></div>');
  assert.ok(createElt.withArgs(start).onCall(0));
  assert.ok(createElt.withArgs(end).onCall(1));
  assert.ok(createElt.withArgs('A1').onCall(2));
  assert.ok(createElt.withArgs('Conception').onCall(3));

  aff.getCol.restore();
  aff.createElt.restore();
});
