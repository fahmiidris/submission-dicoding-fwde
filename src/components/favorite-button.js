import FavoriteIDB from '../data/favorites';

const FavoriteButtonInitiator = {
  async init({ likeButtonContainer, food }) {
    this._likeButtonContainer = likeButtonContainer;
    this._food = food;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._food;

    if (await this._isFoodExist(id)) {
      this._renderFavorited();
    } else {
      this._renderFavorite();
    }
  },

  async _isFoodExist(id) {
    const food = await FavoriteIDB.getFoodById(id);

    return !!food;
  },

  _renderFavorite() {
    this._likeButtonContainer.innerHTML = `
        <button type="button" class="button-add-to-favorite">
          Add to Favorite
        </button>
      `;

    const likeButton = document.querySelector('.button-add-to-favorite');

    likeButton.addEventListener('click', async () => {
      await FavoriteIDB.putFood(this._food);
      this._renderButton();
    });
  },

  _renderFavorited() {
    this._likeButtonContainer.innerHTML = `
        <button type="button" class="button-remove-from-favorite">
          Remove from Favorite
        </button>
      `;

    const likeButton = document.querySelector('.button-remove-from-favorite');
    likeButton.addEventListener('click', async () => {
      await FavoriteIDB.deleteFood(this._food.id);
      this._renderButton();
    });
  },
};

export default FavoriteButtonInitiator;
