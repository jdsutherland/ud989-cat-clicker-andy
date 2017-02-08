class Cat {
  constructor(name) {
    this.name = name;
    this.imageSrc = `img/${this.name.toLowerCase()}.jpg`;
    this.clickCount = 0;
  }
}

const model = {
  currentCat: null,
  cats: [
    new Cat('Meowser'),
    new Cat('Peanut'),
    new Cat('Shadow'),
    new Cat('Tiger'),
    new Cat('Toby'),
  ],
};

const controller = {
  init() {
    model.currentCat = model.cats[0];
    detailView.init();
    listView.init();
  },

  getCurrentCat() {
    return model.currentCat;
  },

  getCats() {
    return model.cats;
  },

  setCurrentCat(cat) {
    model.currentCat = cat;
  },

  incrementCounter() {
    model.currentCat.clickCount++;
    detailView.render();
  },
};

const detailView = {
  init() {
    this.$cat = $('.cat');
    this.$catName = $('.cat-name');
    this.$catCount = $('.cat-count');
    this.$catImg = $('.cat-img');

    this.$cat.click(controller.incrementCounter);
    this.render();
  },


  render() {
    const cat = controller.getCurrentCat();
    this.$catName.text(cat.name);
    this.$catCount.text(cat.clickCount);
    this.$catImg.attr('src', cat.imageSrc);
  },
};

const listView = {
  init() {
    this.$catList = $('.cat-list');
    this.render();
  },

  render() {
    const cats = controller.getCats();

		this.appendListElements(cats);
		this.addListClickListeners(cats);
  },

	appendListElements(cats) {
		this.$catList.append($.map(cats, function(cat, i) {
			return $('<li>', { text: cat.name, data: { index: i } })[0];
		}));
	},

	addListClickListeners(cats) {
		this.$catList.on('click', 'li', function() {
			controller.setCurrentCat(cats[$(this).data('index')]);
			detailView.render()
		});
	},
};

controller.init();
