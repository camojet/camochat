import { run } from '@ember/runloop';
import { module, test, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import localforage from 'localforage';

import { nameForm } from 'emberclear/tests/helpers/pages/setup';

module('Acceptance | Identity Setup', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function() {
    await localforage.clear();
  });

  module('visiting /setup', function(hooks) {
    hooks.beforeEach(async function() {
      await visit('/setup');
    });

    test('redirects to setup/new', function(assert) {
      assert.equal(currentURL(), '/setup/new');
    });

    module('name is not filled in', function(hooks) {
      test('proceeding is disallowed', async function(assert) {
        await nameForm.clickNext();

        assert.equal(currentURL(), '/setup/new');
      });
    });

    module('name is filled in', function(hooks) {
      hooks.beforeEach(async function() {
        await nameForm.enterName('My Name');

        await run(async () => {
          await nameForm.clickNext();
        });
      });

      // testing is hard :(
      skip('proceeds to next page', async function(assert) {
        assert.equal(currentURL(), '/setup/completed');
      });
    });
  });


});
