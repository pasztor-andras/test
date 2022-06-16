const userDb = new Map();

module.exports = Object.freeze({
  findById: async (id) => userDb.get(id),
  insert: async (user) => userDb.set(user.id, user),
});

const myFunc = async () => {
    console.log(await module.exports.insert({id: 1, username: "Tom", password: "pass"}));
    //console.log(await module.exports.findById(1));
};

myFunc();
console.log(userDb.size);
