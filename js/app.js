class Cat {
  constructor(name) {
    this.name = name;
    this.imageSrc = `img/${this.name.toLowerCase()}.jpg`;
    this.url = 'http://example.com';
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
    adminView.init();
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

  save(params) {
    let currentCat = this.getCurrentCat();
    currentCat.name = params['name'];
    currentCat.url = params['url'];
    currentCat.clickCount = parseInt(params['clicks']);
  }
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
      return $('<li>', { class: 'cat-element', text: cat.name, data: { index: i } })[0];
    }));
  },

  addListClickListeners(cats) {
    this.$catList.on('click', 'li', function() {
      controller.setCurrentCat(cats[$(this).data('index')]);
      detailView.render();
      adminView.populateFormWithCurrentCat();
    });
  },

  removeListElements() {
    $('.cat-element').remove();
  },
};

const adminView = {
  init() {
    this.$btnAdmin = $('.btn-admin');
    this.$btnSave = $('.btn-save');
    this.$admin = $('.admin');
    this.$nameForm = $('#edit-name');
    this.$urlForm = $('#edit-url');
    this.$clicksForm = $('#edit-clicks');

    this.addSaveButtonEvent();
    this.handleAdminButtonToggle();
    this.render();
  },

  render() {
  },

  populateFormWithCurrentCat() {
    const cat = controller.getCurrentCat();
    this.$nameForm.val(cat.name);
    this.$urlForm.val(cat.url);
    this.$clicksForm.val(cat.clickCount);
  },

  handleAdminButtonToggle() {
    this.$btnAdmin.click(function() {
      adminView.populateFormWithCurrentCat();
      adminView.$admin.toggle();
    });
  },

  addSaveButtonEvent() {
    this.$btnSave.click(function() {
      const params = {
        name: adminView.$nameForm.val(),
        url: adminView.$urlForm.val(),
        clicks: adminView.$clicksForm.val()
      };
      controller.save(params);
      adminView.$admin.hide();
      listView.removeListElements();
      listView.render();
      detailView.render();
    });
  },
};

controller.init();
