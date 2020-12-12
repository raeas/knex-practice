const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')
const { expect } = require('chai')

describe(`Shopping list service object`, function() {
  let db

  let testItems = [
    {
      id: 1,
      name: 'item 1',
      price: '9.99',
      category: 'Main',
      checked: true,
      date_added: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      name: 'item 2',
      price: '1.50',
      category: 'Snack',
      checked: false,
      date_added: new Date('2100-05-22T16:28:32.615Z')
    },
    {
      id: 3,
      name: 'item 3',
      price: '0.75',
      category: 'Lunch',
      checked: true,
      date_added: new Date('1919-12-22T16:28:32.615Z')
    }
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_list').truncate())

  before(() => {
    return db
      .into('shopping_list')
      .insert(testItems)
  })

  after(() => db.destroy())

  describe('getAllItems()', () => {
    it(`resolves all articles from 'shopping_list' table`, () => {
      // test that ShopppingListService.getAllItems gets data from table
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems)
        })
    })  
  })
})