import Profile from './Profile'
import ReactTestUtils from 'react-dom/test-utils'

describe('when the URL is empty', () => {
  it('should display the placeholder profile icon', () => {
    const profile = Profile({ id: '1' })
    const profileRendered = ReactTestUtils.renderIntoDocument(profile)
    const placeholderIcons = profileRendered.getElementsByClassName(
      'placeholder'
    )
    expect(placeholderIcons).toHaveLength(1)
  })
})

describe('when the URL has only one character', () => {
  it('should provide feedback to the user typing by displaying an unknown platform icon', () => {
    // At this pint the user has entered an invalid URL so you could argue we should not show an unknown platform icon
    // because it is not a platform at all but we will catch that with validation on save instead.
    const profile = Profile({ id: '1', url: 'h' })
    const profileRendered = ReactTestUtils.renderIntoDocument(profile)
    const placeholderIcons = profileRendered.getElementsByClassName(
      'unknown invalid'
    )
    expect(placeholderIcons).toHaveLength(1)
  })
})

describe('when the URL has a few characters', () => {
  it('should provide feedback to the user typing by displaying an unknown platform icon', () => {
    const profile = Profile({ id: '1', url: 'sdfi' })
    const profileRendered = ReactTestUtils.renderIntoDocument(profile)
    const placeholderIcons = profileRendered.getElementsByClassName(
      'unknown invalid'
    )
    expect(placeholderIcons).toHaveLength(1)
  })
})

describe('when the URL has only a protocol', () => {
  it('should provide feedback to the user typing by displaying an unknown platform icon', () => {
    const profile = Profile({ id: '1', url: 'http://' })
    const profileRendered = ReactTestUtils.renderIntoDocument(profile)
    const placeholderIcons = profileRendered.getElementsByClassName(
      'unknown invalid'
    )
    expect(placeholderIcons).toHaveLength(1)
  })
})

describe('when the URL has a protocol', () => {
  describe('when the URL is for an unknown platform', () => {
    it('should display the unknown platform icon', () => {
      const profile = Profile({ id: '1', url: 'http://www.example.com' })
      const profileRendered = ReactTestUtils.renderIntoDocument(profile)
      const placeholderIcons = profileRendered.getElementsByClassName('unknown')
      expect(placeholderIcons).toHaveLength(1)
    })
  })

  describe('when the URL is for a known platform', () => {
    it('should display the unknown platform icon', () => {
      const profile = Profile({ id: '1', url: 'http://www.twitter.com' })
      const profileRendered = ReactTestUtils.renderIntoDocument(profile)
      const placeholderIcons = profileRendered.getElementsByClassName('known')
      expect(placeholderIcons).toHaveLength(1)
    })
  })
})

// TODO: Support URLs with no protocol.
describe('when the URL does not have a protocol', () => {
  it('should display the unknown platform icon', () => {
    const profile = Profile({ id: '1', url: 'www.example.com' })
    const profileRendered = ReactTestUtils.renderIntoDocument(profile)
    const placeholderIcons = profileRendered.getElementsByClassName('unknown')
    expect(placeholderIcons).toHaveLength(1)
  })
})
