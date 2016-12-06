QUnit.module('calc', {
// setup:function(){alert('setup moneyOps individual test');},
// teardown:function(){alert('teardown moneyOps individual test');}
});

QUnit.test('test_add', function(assert) {
  var fixture = '';
  fixture += ('<form id="form0">');
  fixture += ('<input type="text" id="v1" name="v1" value="2"/>');
  fixture += ('<input type="text" id="c1" name="c1" value="EU"/>');
  fixture += ('<input type="text" id="v2" name="v2" value="2"/>');
  fixture += ('<input type="text" id="c2" name="c2" value="EU"/>');
  fixture += ('<input type="text" id="ops" name="ops" value="ADD"/>');
  fixture += ('</form>');


  var fixtureNode = document.getElementById('qunit-fixture');
  fixtureNode.innerHTML = fixture;

  var c = new calc();
  c.computeResult(document.getElementById(('form0')));
  assert.equal(c.message, '4 (EU)');
});


QUnit.test('test_add_incompatible_currency', function(assert) {
  var fixture = '';
  fixture += ('<div id="res"></div>');
  fixture += ('<form id="form0">');
  fixture += ('<input type="text" id="v1" name="v1" value="2"/>');
  fixture += ('<input type="text" id="c1" name="c1" value="EU"/>');
  fixture += ('<input type="text" id="v2" name="v2" value="3"/>');
  fixture += ('<input type="text" id="c2" name="c2" value="CHT"/>');
  fixture += ('<input type="text" id="ops" name="ops" value="ADD"/>');
  fixture += ('</form>');


  var fixtureNode = document.getElementById('qunit-fixture');
  fixtureNode.innerHTML = fixture;

  var w_alert = sinon.stub(window, 'alert');

  var c = new calc();
  c.computeResult(document.getElementById(('form0')));
  assert.ok(w_alert.calledOnce);
  window.alert.restore();
});

QUnit.test('test_sub', function(assert) {
  var fixture = '';
  fixture += ('<div id="res"></div>');
  fixture += ('<form id="form0">');
  fixture += ('<input type="text" id="v1" name="v1" value="2"/>');
  fixture += ('<input type="text" id="c1" name="c1" value="EU"/>');
  fixture += ('<input type="text" id="v2" name="v2" value="2"/>');
  fixture += ('<input type="text" id="c2" name="c2" value="EU"/>');
  fixture += ('<input type="text" id="ops" name="ops" value="SUB"/>');
  fixture += ('</form>');


  var fixtureNode = document.getElementById('qunit-fixture');
  fixtureNode.innerHTML = fixture;

  var c = new calc();
  c.computeResult(document.getElementById(('form0')));
  assert.equal(c.message,'0.00 (EU)');
});

QUnit.test('test_sub_incompatible_currency', function(assert) {
  var fixture = '';
  fixture += ('<div id="res"></div>');
  fixture += ('<form id="form0">');
  fixture += ('<input type="text" id="v1" name="v1" value="5"/>');
  fixture += ('<input type="text" id="c1" name="c1" value="CHT"/>');
  fixture += ('<input type="text" id="v2" name="v2" value="3"/>');
  fixture += ('<input type="text" id="c2" name="c2" value="EU"/>');
  fixture += ('<input type="text" id="ops" name="ops" value="SUB"/>');
  fixture += ('</form>');

  var fixtureNode = document.getElementById('qunit-fixture');
  fixtureNode.innerHTML = fixture;

  var w_alert = sinon.stub(window, 'alert');

  var c = new calc();
  c.computeResult(document.getElementById(('form0')));
  assert.ok(w_alert.calledOnce);
  window.alert.restore();
});

QUnit.test('test_sub_inf', function(assert) {
  var fixture = '';
  fixture += ('<div id="res"></div>');
  fixture += ('<form id="form0">');
  fixture += ('<input type="text" id="v1" name="v1" value="1"/>');
  fixture += ('<input type="text" id="c1" name="c1" value="EU"/>');
  fixture += ('<input type="text" id="v2" name="v2" value="2"/>');
  fixture += ('<input type="text" id="c2" name="c2" value="EU"/>');
  fixture += ('<input type="text" id="ops" name="ops" value="SUB"/>');
  fixture += ('</form>');

  var fixtureNode = document.getElementById('qunit-fixture');
  fixtureNode.innerHTML = fixture;

  var w_alert = sinon.stub(window, 'alert' );

  var c = new calc();
  c.computeResult(document.getElementById(('form0')));
  assert.ok(w_alert.calledOnce);
  window.alert.restore();
});

QUnit.test('test_displayResult', function(assert) {
  var fixture = '';
  fixture += '<div id="res"></div>';

  var fixtureNode=document.getElementById('qunit-fixture');
  fixtureNode.innerHTML=fixture;

  var c = new calc();
  c.message = '4 (EU)';
  c.displayResult(document.getElementById("res"));
  assert.equal(document.getElementById("res").innerHTML, 'Result : 4 (EU)');
});
