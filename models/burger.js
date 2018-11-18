const orm = require('../config/orm.js');

let burger = {
  all: cb => {
    orm.all('burgers', res => {
      cb(res);
    });
  },
  create: (name, cb) => {
    orm.create('burgers', ['burger_name', 'devoured'], [name, false], cb);
  },
  update: (id, cb) => {
    let condition = 'id=' + id;
    orm.update(
      'burgers',
      {
        devoured: true
      },
      condition,
      cb
    );
  }
};

module.exports = burger;
