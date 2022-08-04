const metapatcher = require('../dist/browser/cjs')

describe('Metapatcher node env', function() {

  it('Patching custom meta and link tags.', function() {
    const html1 = metapatcher.set('meta', 'name', {name: 'number', content: 'One'})
    expect(html1).toEqual('<meta id="name" name="number" content="One">')

    const html2 = metapatcher.set('meta', undefined, {name: 'names', content: 'One'})
    const html3 = metapatcher.set('meta', undefined, {name: 'names', content: 'Two'})
    expect(html2).toEqual('<meta name="names" content="One">')
    expect(html3).toEqual('<meta name="names" content="Two">')
    expect(metapatcher.dump()).toEqual(`<meta id="name" name="msapplication-config" content="none">
<meta id="name" name="number" content="One">
<meta name="names" content="One">
<meta name="names" content="Two">`)
  })

  it('Patching favicon.', function() {
    const elem = metapatcher.setFavicon('/favicon.ico')
    expect(elem).toEqual(document.querySelector('link[rel="shortcut icon"]'))
    expect(elem.getAttribute('rel')).toEqual('shortcut icon')
    expect(elem.getAttribute('href')).toEqual('/favicon.ico')
    expect(elem.getAttribute('type')).toEqual('image/x-icon')
  })
})
