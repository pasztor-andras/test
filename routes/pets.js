const { Pets } = require('../services');
const pets = new Pets();

module.exports = {
  'pets#list': (req, res) => {
    res.json(pets.findAll(req.query));
  },
  'pets#pet': (req, res) => {
    const pet = pets.findById(req.param.id);
    pet ? res.json(pet) : res.status(404).json({ message: 'not found' });
  }
};