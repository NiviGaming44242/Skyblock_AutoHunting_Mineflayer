var assert = require('better-assert'),
    _ = require('../index.js');

describe('Collections', function() {
  it('args()', function() {
    assert(typeof _.args !== "undefined");
    assert(!(arguments instanceof Array));
    assert(_.args(arguments) instanceof Array);
  });

  describe('each()', function() {
    it("iterates over Objects", function() {
      assert(typeof _.each !== "undefined");
      var obj = {
        1: 1,
        2: 2
      };

      _.each(obj, function(value, key, original) {
        assert(original === obj);
        assert(['1', '2'].indexOf(key) >= 0);
        assert(obj[key] === value);
      });
    });

    it("iterates over Arrays", function() {
      assert(typeof _.each !== "undefined");
      var arr = [1, 2];

      _.each(arr, function(key, index, original) {
        assert(original === arr);
        assert(arr.indexOf(key) === index);
        assert(arr[index] === key);
      });
    });
  });
  
  it('isEmpty()', function() {
    assert(typeof _.isEmpty !== "undefined");
    assert(_.isEmpty({}));
    assert(!_.isEmpty({
      1: 1
    }));
  });

  it('mixin()', function() {
    assert(typeof _.mixin !== "undefined");
    var a = {
      a: 0
    };
    var b = {
      a: 1,
      b: 0
    };

    var mixin = _.mixin({}, a, b);
    assert(typeof mixin.a !== "undefined");
    assert(typeof mixin.b !== "undefined");
    assert(mixin.a === 1);
    assert(_.mixin({}, b, a).a === 0);
  });

  describe('map()', function() {
    it("iterates over Objects", function() {
      assert(typeof _.map !== "undefined");
      var obj = {
        1: 1,
        2: 2
      };

      var map = _.map(obj, function(value, key, original) {
        assert(original === obj);
        assert(['1', '2'].indexOf(key) >= 0);
        assert(obj[key] === value);
        return 10 - value;
      });

      assert(map['1'] === 9);
      assert(map['2'] === 8);
    });

    it("iterates over Arrays", function() {
      assert(typeof _.map !== "undefined");
      var arr = [1, 2];

      var map = _.map(arr, function(key, index, original) {
        assert(original === arr);
        assert(arr.indexOf(key) === index);
        assert(arr[index] === key);
        return 10 - key;
      });

      assert(map[0] === 9);
      assert(map[1] === 8);
    });
  });

  it('removeWhere()', function() {
    assert(typeof _.removeWhere !== "undefined");
    var arr = [1, 2];

    var newarr = _.removeWhere(arr, function(key, index, original) {
      assert(original === arr);
      assert(arr.indexOf(key) === index);
      assert(arr[index] === key);
      return key === 1;
    });

    assert(newarr.length === 1);
    assert(newarr[0] === 2);
  });

  it('replaceAll()', function() {
    assert(typeof _.replaceAll !== "undefined");
    var string = "aaa bbb ccc";

    assert(_.replaceAll(string, "a", "d") === "ddd bbb ccc");
    assert(_.replaceAll(string, "a") === " bbb ccc");
    assert(string === "aaa bbb ccc");

    assert(_.replaceAll(string, "d") === "aaa bbb ccc");

    require('assert')(_.replaceAll(string, {
      a: 'b',
      b: 'c',
      c: 'd'
    }) === "ddd ddd ddd");
  });
});

describe('Helpers', function() {
  it('findChild()', function() {
    assert(typeof _.findChild !== "undefined");
    var obj = {
      1: {
        2: {
          hello: 'hello'
        }
      }
    };

    assert(_.findChild(obj, ['1', '2']).hello === 'hello');

    try {
      _.findChild(obj, ['3']);
      assert(false);
    } catch(e) {
    }
  });

  it('inherits()', function() {
    assert(typeof _.inherits !== "undefined");
    function A() {}
    function B() {}

    _.inherits(A, B);
    assert(A.prototype.constructor === A);

    var a = new A();
    assert(a instanceof A);
    assert(a instanceof B);
  });

  it('toNumber()', function() {
    assert(typeof _.toNumber !== "undefined");

    assert(_.toNumber(null) === 0);
    assert(_.toNumber() === 0);

    assert(_.toNumber(2) === 2);
    assert(_.toNumber(true) === 1);

    var date = new Date();
    assert(_.toNumber(date) === date.valueOf());
  });

  it('typeOf()', function() {
    assert(typeof _.typeOf !== "undefined");
    assert(_.typeOf(new Date()) === "date");
  });
});
