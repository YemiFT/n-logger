import chai from 'chai';
import chaiString from 'chai-string';
chai.should();
chai.use(chaiString);
import formatter from '../../src/lib/formatter';

describe('Formatter', () => {

	it('should exist', () => {
		formatter.should.exist;
	});

	it('should format the message', () => {
		const options = { message: 'a message' };
		formatter(options).should.equal('a message');
	});

	it('should handle non-string message', () => {
		const options = { message: 1234 };
		const formatted = formatter(options);
		formatted.should.be.a('string');
		formatted.should.equal('1234');
	});

	it('should format the level as a field', () => {
		const options = { level: 'error' };
		formatter(options).should.equal('level=error');
	});

	it('should format the meta as fields', () => {
		const options = { meta: { foo: 'bar' }};
		formatter(options).should.equal('foo=bar');
	});

	it('should format all options', () => {
		const options = { message: 'a message', level: 'error', meta: { foo: 'bar' }};
		formatter(options).should.equal('a message level=error foo=bar');
	});

	it('should understand a message that\'s an Error', () => {
		class MyError extends Error { };
		const message = new MyError('whoops!');
		const options = { message };
		formatter(options).should.startWith('whoops! error_message=whoops! error_name=Error error_stack="Error: whoops!\n    at');
	});

	it('should understand a message that\'s an Error with meta', () => {
		class MyError extends Error { };
		const message = new MyError('whoops!');
		const options = { message, meta: { foo: 'bar' }};
		formatter(options).should.endWith('foo=bar');
	});

	it('should understand meta that\'s an Error', () => {
		class MyError extends Error { };
		const meta = new MyError('whoops!');
		const options = { meta };
		formatter(options).should.startWith('error_message=whoops! error_name=Error error_stack="Error: whoops!\n    at');
	});

	it('should understand meta that\'s an Error with a message', () => {
		class MyError extends Error { };
		const meta = new MyError('whoops!');
		const options = { message: 'a message', meta };
		formatter(options).should.startWith('a message error_message=whoops! error_name=Error error_stack="Error: whoops!\n    at');
	});

});
