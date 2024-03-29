const assert = require('assert');

Feature('Add Favorite Food');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('like one Food', async ({ I }) => {
  I.amOnPage('/');

  I.scrollTo('list-food');
  I.wait(1);

  I.seeElement('item-food h2');

  const firstFood = locate('item-food h2').first();
  const firstFoodHref = locate('item-food a').first();

  const firstFoodTitle = await I.grabTextFrom(firstFood);

  I.click(firstFoodHref);
  I.wait(2);

  I.seeElement('.button-add-to-favorite');
  I.click('.button-add-to-favorite');

  I.amOnPage('/#/favorites');
  I.seeElement('item-food h2');

  const likedFoods = await I.grabTextFrom(locate('item-food h2').first());

  assert.strictEqual(firstFoodTitle, likedFoods);
});
