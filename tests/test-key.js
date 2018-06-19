/* global describe, it, assert, _ */

var assert = require('assert');

var _ = require('../lib/key');

describe('key', function () {

  it('getKey', function() {

    assert.strictEqual( _.key({ foo: 'bar' }, 'foo'), 'bar');
    assert.strictEqual( _.key({ foo: 'bar' }, 'foo.bar'), undefined);

    assert.strictEqual( _.getKey({ foo: 'bar' }, 'foo'), 'bar');
    assert.strictEqual( _.getKey({ foo: 'bar' }, 'foo.bar'), undefined);

    var o_list = { list: ['foo', 'bar', 'foobar'] };

    assert.strictEqual( _.getKey(o_list, 'list.0'), 'foo');
    assert.strictEqual( _.getKey(o_list, 'list.1'), 'bar');
    assert.strictEqual( _.getKey(o_list, 'list.2'), 'foobar');
    assert.strictEqual( _.getKey(o_list, 'list.3'), undefined);

    assert.strictEqual( _.getKey(o_list, 'list[0]'), 'foo');
    assert.strictEqual( _.getKey(o_list, 'list[1]'), 'bar');
    assert.strictEqual( _.getKey(o_list, 'list[2]'), 'foobar');
    assert.strictEqual( _.getKey(o_list, 'list[3]'), undefined);

  });

  it('setKey', function() {

    var o = {};

    assert.deepEqual( _.key(o, 'foo', 'bar'), { foo: 'bar' }, 'foo: bar');
    assert.deepEqual( _.key(o, 'foo.bar', 'foobar'), { foo: { bar: 'foobar' } }, 'foo.bar: foobar');
    assert.deepEqual( _.key(o, 'foo', 'bar'), { foo: 'bar' }, 'foo: bar (2)');

    assert.deepEqual( _.key(o, 'foo2', 'bar2'), { foo: 'bar', foo2: 'bar2' }, 'foo2: bar2');
    assert.deepEqual( _.key(o, 'foo3.bar', 'bar3'), { foo: 'bar', foo2: 'bar2', foo3: { bar: 'bar3' } }, 'foo3.bar: bar3');

    assert.deepEqual( _.key({ list: [] }, 'list.0', 'item'), { list: ['item'] }, 'list.o: item');

  });

});
