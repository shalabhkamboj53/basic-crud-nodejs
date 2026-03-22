const items = [
  {
    id: 1,
    name: 'Shalabh',
  },
  {
    id: 2,
    name: 'Taman',
  },
];

let nextId = 3;

function getAllItems() {
  return items;
}

function getItemById(id) {
  return items.find((item) => item.id === id) || null;
}

function createItem(name) {
  const newItem = { id: nextId++, name };
  items.push(newItem);
  return newItem;
}

function updateItem(id, name) {
  const item = getItemById(id);
  if (!item) {
    return null;
  }

  item.name = name;
  return item;
}

function deleteItem(id) {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  }

  items.splice(index, 1);
  return true;
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};