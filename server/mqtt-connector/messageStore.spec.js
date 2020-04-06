const assert = require('assert');
const messageStore = require('./messageStore');

describe('messageStore', () => {
	afterEach(() => {
		messageStore.resetMessages('testClient');
	});

	it('should let the user add a message', () => {
		messageStore.addMessage('testClient', 'Hi test client!');

		assert.deepEqual(messageStore.getMessages('testClient'), [
			'Hi test client!'
		]);

		assert.deepEqual(
			messageStore.getMessages('nonexistentClient'),
			undefined
		);
	});

	it('should reset messages', () => {
		messageStore.addMessage('testClient', 'Hi test client!');

		assert.deepEqual(messageStore.getMessages('testClient'), [
			'Hi test client!'
		]);

		messageStore.resetMessages('testClient');

		assert.deepEqual(messageStore.getMessages('testClient'), []);

		messageStore.resetMessages('nonexistentClient');

		assert.deepEqual(
			messageStore.getMessages('nonexistentClient'),
			undefined
		);
	});
});
