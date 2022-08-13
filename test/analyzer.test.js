import { should } from 'chai'
import { describe, it } from 'mocha'
import Analyzer from '../src/map/analyzer.js'

describe('analyzer', () => {
  it('fetch all data', () => {
    const analyzer = new Analyzer()
    analyzer.fetchAll()

    should.exist(analyzer.airports)
    should.exist(analyzer.airlines)
    should.exist(analyzer.routes)
  })
})
