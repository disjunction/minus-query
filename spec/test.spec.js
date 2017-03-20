/* eslint-env: jasmine */
const minusQuery = require('./../index')

describe('decode', () => {
  it('decodes', () => {
    const input = {'eq-abc': 7, 'lte-my-field': 'ok'}
    const result = minusQuery.decode(input)
    expect(result.abc).toEqual({$eq: 7});
    expect(result['my-field']).toEqual({$lte: 'ok'});
  })
})
