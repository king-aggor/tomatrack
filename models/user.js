// array to store users
const users = [];

let userid;
// create and export User class
module.exports = class User {
  constructor(id, role, name, email, country, region, password) {
    id = userid;
    this.role = role;
    this.name = name;
    this.email = email;
    this.country = country;
    this.region = region;
    this.password = password;
  }

  //   function to save user
  save() {
    // userid = Math.floor(Math.random() * 100 + 1).toString();
    userid = 1;
    this.id = userid;
    users.push(this);
  }

  //   function to find user
  static findUser(id) {
    if ((id = 1)) {
      return users;
    }
  }
};
