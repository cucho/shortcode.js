/* jshint strict: false, unused: false */
/* global Shortcode, describe, it, expect */

describe('Shortcode', function() {
  it('is a function', function() {
    var sc = new Shortcode();
    expect(sc instanceof Shortcode).toBe(true);
  });

  it('accepts an element whose contents will be replaced', function() {
    var body = document.querySelector('body');
    var sc = new Shortcode(body);
    expect(sc.el).toEqual(body);
  });

  it('accepts an object of tags', function() {
    var body = document.querySelector('body');
    var sc = new Shortcode(body, {
      hello: function() {
        return ['Hello', 'world'].join(' ');
      }
    });

    expect(Object.keys(sc.tags)).toEqual(['hello']);
  });

  it('matches defined tags', function() {
    var body = document.querySelector('body');
    var contents = '' +
    '<div>' +
      '[hello]' +
    '</div>';
    $(contents).appendTo('body');

    var sc = new Shortcode(body, {
      hello: function() {
        return ['Hello', 'world'].join(' ');
      }
    });

    expect(sc.matches).toEqual({
      hello: {
        tag: 'hello',
        options: undefined,
        regex: /[hello]/
      }
    });
  });

  it('converts tag options to object', function() {
    var body = document.querySelector('body');
    var contents = '' +
    '<div>' +
      '[hello text="Hello world"]' +
    '</div>';
    $(contents).appendTo('body');

    var sc = new Shortcode(body, {
      hello: function(options) {
        return options.text;
      }
    });

    expect(sc.matches.hello.options).toEqual({
      text: 'Hello world'
    });
  });

  it('replaces tag with matching object result');
  it('asynchronously replaces tag with matching object result');
});
