import { metapatcher } from "../build/index.js";

describe('Metapatcher node env', function() {

  it('Patching custom meta and link tags.', function() {
    const html1 = metapatcher.set('meta', 'name', {name: 'number', content: 'One'})
    expect(html1).toEqual('<meta name="number" content="One">')

    const html2 = metapatcher.set('meta', undefined, {name: 'names', content: 'One'})
    const html3 = metapatcher.set('meta', undefined, {name: 'names', content: 'Two'})
    expect(html2).toEqual('<meta name="names" content="One">')
    expect(html3).toEqual('<meta name="names" content="Two">')
    expect(metapatcher.dump()).toEqual(`<meta name="msapplication-config" content="none">
<meta name="number" content="One">
<meta name="names" content="One">
<meta name="names" content="Two">`)

    metapatcher.setFavicon('/favicon.ico')
    expect(metapatcher.dump()).toEqual(`<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">`)
  })
})
