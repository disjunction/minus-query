/* eslint-env: jasmine */
const minusQuery = require('./../index')

describe('decode', () => {
  it('decodes trivial case', () => {
    const input = {'eq-abc': 7, 'lte-my-field': 'ok'}
    const result = minusQuery.decode(input)
    expect(result.abc).toEqual({$eq: 7});
    expect(result['my-field']).toEqual({$lte: 'ok'});
  })

  it('decodes with not', () => {
    const input = {'not-eq-abc': 7, 'not-lte-my-field': 'ok', 'not-in-list': '5,3,9'}
    const result = minusQuery.decode(input)
    expect(result.abc).toEqual({$ne: 7});
    expect(result['my-field']).toEqual({$not: {$lte: 'ok'}});
    expect(result.list).toEqual({$nin: ['5', '3', '9']});
  })
})
