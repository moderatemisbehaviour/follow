import React from 'react'
import ReactDOM from 'react-dom'
import Profile from './Profile'

describe('when the URL is empty', () => {
  it('should display the unknown platform icon', () => {
    // TODO: This resulted in default props not being applied!
    // const profile = Profile({ id: '1' })

    const profile = <Profile url={''} />
    // TODO: This didn't work because it renders the component into a div that is not appended to the document and then
    // attempts to return a reference to the rendered component.
    // However it is not possible to return a reference to a function component
    // as it just fires and forgets, updating the DOM and returning null, see https://jaketrent.com/post/react-stateless-components-missing/
    // const profileRendered = ReactTestUtils.renderIntoDocument(profile)

    const domContainer = document.createElement('div')
    ReactDOM.render(profile, domContainer)
    const unknownPlatformIcon = domContainer.querySelector('svg')
    expect(unknownPlatformIcon.textContent).toEqual('?')
  })
})

describe('when the URL has only one character', () => {
  it('should provide feedback to the user typing by displaying an unknown platform icon', () => {
    const profile = <Profile url={'s'} />
    const domContainer = document.createElement('div')
    ReactDOM.render(profile, domContainer)
    const unknownPlatformIcon = domContainer.querySelector('svg')
    expect(unknownPlatformIcon.textContent).toEqual('?')
  })
})

describe('when the URL has a few characters', () => {
  it('should provide feedback to the user typing by displaying an unknown platform icon', () => {
    const profile = <Profile url={'sdfi'} />
    const domContainer = document.createElement('div')
    ReactDOM.render(profile, domContainer)
    const unknownPlatformIcon = domContainer.querySelector('svg')
    expect(unknownPlatformIcon.textContent).toEqual('?')
  })
})

describe('when the URL has only a protocol', () => {
  it('should provide feedback to the user typing by displaying an unknown platform icon', () => {
    const profile = <Profile url={'http://'} />
    const domContainer = document.createElement('div')
    ReactDOM.render(profile, domContainer)
    const unknownPlatformIcon = domContainer.querySelector('svg')
    expect(unknownPlatformIcon.textContent).toEqual('?')
  })
})

describe('when the URL has a protocol', () => {
  describe('when the URL is for an unknown platform', () => {
    it('should display the unknown platform icon', () => {
      const profile = <Profile url={'http://example.com'} />
      const domContainer = document.createElement('div')
      ReactDOM.render(profile, domContainer)
      const unknownPlatformIcon = domContainer.querySelector('svg')
      expect(unknownPlatformIcon.textContent).toEqual('e')
    })
  })

  describe('when the URL is for a known platform', () => {
    it('should display the appropriate platform icon', () => {
      const profile = <Profile url={'http://twitter.com'} />
      const domContainer = document.createElement('div')
      ReactDOM.render(profile, domContainer)
      const unknownPlatformIcon = domContainer.querySelector('img')
      expect(unknownPlatformIcon.getAttribute('src')).toContain('twitter')
    })
  })
})

describe('when the URL does not have a protocol', () => {
  it.skip('should display the unknown platform icon', () => {
    const profile = <Profile url={'www.example.com'} />
    const domContainer = document.createElement('div')
    ReactDOM.render(profile, domContainer)
    const unknownPlatformIcon = domContainer.querySelector('svg')
    expect(unknownPlatformIcon.textContent).toEqual('e')
  })
})
