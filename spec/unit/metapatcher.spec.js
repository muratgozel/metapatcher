const metapatcher = require('../../dist/browser/cjs')

describe('Metapatcher.', function() {

  it('Initiation and settings.', function() {
    metapatcher.configure({
      structuredData: {enabled: false}
    })
    expect(metapatcher.settings.structuredData.enabled).toBe(false)
    expect(metapatcher.settings.msTags.enabled).toBe(true)
  })

  it('Finding mime type from file path.', function() {
    expect(metapatcher.findMimeType('/asd/test.ico')).toBe('image/x-icon')
    expect(metapatcher.findMimeType('/asd')).toBeUndefined()
  })

  it('Patching custom meta and link tags.', function() {
    const elem = metapatcher.set('meta', 'name', {name: 'number', content: 'One'})
    expect(elem).toEqual(document.querySelector('meta[name="number"]'))
    expect(elem.getAttribute('content')).toEqual('One')

    const elem2 = metapatcher.set('meta', undefined, {name: 'names', content: 'One'})
    const elem3 = metapatcher.set('meta', undefined, {name: 'names', content: 'Two'})
    const arr = document.querySelectorAll('meta[name="names"]')
    expect(arr.length).toBe(2)
    expect(arr[0]).toEqual(elem2)
    expect(arr[1]).toEqual(elem3)
  })

  it('Patching favicon.', function() {
    const elem = metapatcher.setFavicon('/favicon.ico')
    expect(elem).toEqual(document.querySelector('link[rel="shortcut icon"]'))
    expect(elem.getAttribute('rel')).toEqual('shortcut icon')
    expect(elem.getAttribute('href')).toEqual('/favicon.ico')
    expect(elem.getAttribute('type')).toEqual('image/x-icon')
  })

  it('Patching various tags with setProjectMeta method.', function() {
    metapatcher.setProjectMeta({
      name: 'Sample App',
      url: 'https://frondjs.org',
      logo: '/path/logo.png',
      primaryColor: '#333333',
      backgroundColor: '#ffffff'
    })
    expect(document.querySelector('meta[name="application-name"]')).toBeTruthy()
    expect(document.querySelector('meta[property="og:site_name"]')).toBeTruthy()
    expect(document.querySelector('meta[name="msapplication-starturl"]')).toBeTruthy()
    expect(document.querySelector('meta[name="msapplication-TileColor"]')).toBeTruthy()
    expect(document.querySelector('meta[name="theme-color"]')).toBeTruthy()
  })

  it('Patching robots tag.', function() {
    metapatcher.robots('noindex')
    const elem = document.querySelector('meta[name="robots"]')
    expect(elem).toBeTruthy()
    expect(elem.getAttribute('content')).toBe('noindex')
  })

  it('Patching prioritization tags.', function() {
    metapatcher.prioritize('https://frondjs.org', 'preconnect')
    metapatcher.prioritize('https://frondjs.org', 'invalidmethod')
    const elem = document.querySelector('meta[name="preconnect"]')
    const elem2 = document.querySelector('meta[name="invalidmethod"]')
    expect(elem).toBeTruthy()
    expect(elem2).toBeNull()

    metapatcher.removeAllPrioritizations()
    const elem3 = document.querySelector('meta[name="preconnect"]')
    expect(elem3).toBeNull()
  })

  it('Patching icons across browsers and devices.', function() {
    const icons = [
      '/path/icon-70x70.png',
      '/path/icon-72x72.png',
      '/path/icon-96x96.png',
      '/path/icon-97x97.png',
      '/path/icon-120x120.png',
      '/path/icon-128x128.png',
      '/path/icon-144x144.png',
      '/path/icon-150x150.png',
      '/path/icon-1024x1024.png'
    ]
    metapatcher.setIcons(icons)
    setTimeout(function() {
      const androidIcons = document.querySelectorAll('link[rel="icon"]')
      expect(androidIcons.length).toBe(4)
      const appleIcons = document.querySelectorAll('link[rel="apple-touch-icon"]')
      expect(appleIcons.length).toBe(2)
      const msIcon = document.querySelector('meta[name="msapplication-square70x70logo"]')
      expect(msIcon).toBeTruthy()
    }, 300)
  })
})
