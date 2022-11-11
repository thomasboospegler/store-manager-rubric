const responseGetAllProducts = {
  message: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ],
};

const expectResponseGetAllProducts = [
{ id: 1, name: 'Martelo de Thor' },
{ id: 2, name: 'Traje de encolhimento' },
{ id: 3, name: 'Escudo do Capitão América' },
];

const responseGetById = {
  message: [
    { id: 1, name: 'Martelo de Thor' },
  ],
}

const expectResponseGetById = [
  { id: 1, name: 'Martelo de Thor' },
];

module.exports = {
  responseGetAllProducts,
  expectResponseGetAllProducts,
  responseGetById,
  expectResponseGetById,
};
