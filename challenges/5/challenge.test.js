const paginate = require('./challenge')

describe('Challenge 5', () => {
  let collection

  beforeEach(() => {
    collection = Array.apply(null, Array(100)).map((_, i) => ({
      id: i,
      userId: 1,
      title: 'ut quo aut ducimus alias',
      body: 'quam occaecati qui deleniti consectetur',
    }))
  })

  describe('Default pagination', () => {
    it('should return 10 items', () => {
      const results = paginate(collection)
      expect(results.data.length).toEqual(10)
    })

    it('should return current page as 1', () => {
      const results = paginate(collection)
      expect(results.currentPage).toEqual(1)
    })

    it('should throw error if not array', () => {
      expect(paginate.bind(null, 'string')).toThrow(/Expect array and got string/)
    })

    it('should return the correct default values', () => {
      const results = paginate(collection)
      expect(results.currentPage).toEqual(1)
      expect(results.perPage).toEqual(10)
      expect(results.total).toEqual(100)
      expect(results.totalPages).toEqual(10)
      expect(results.data).toEqual(collection.slice(0, 10))
    })
  })

  it('should return 15 items', () => {
    const results = paginate(collection, 1, 15)
    expect(results.currentPage).toEqual(1)
    expect(results.data.length).toEqual(15)
    expect(results.perPage).toEqual(15)
    expect(results.totalPages).toEqual(7)
  })
})
