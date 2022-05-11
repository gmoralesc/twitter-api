const { faker } = require('@faker-js/faker');

const getUser = function (overrides = {}) {
  const firstname = faker.name.firstName();
  const lastname = faker.name.lastName();
  const user = {
    username: faker.internet.userName(firstname, lastname),
    firstname,
    lastname,
    email: faker.internet.email(firstname, lastname),
    password: faker.internet.password(8),
  };

  return Object.assign(user, overrides);
};

module.exports = {
  getUser,
};
