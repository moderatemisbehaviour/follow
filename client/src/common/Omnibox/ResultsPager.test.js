import { shallow } from 'enzyme'
import React from 'react'
import ResultsPager from './ResultsPager'

describe('page buttons', () => {
  it('displays one button for one page of results', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={1}
        numberOfPages={1}
        resultsCount={5}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1'])
  })

  it('displays two buttons for two pages of results', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={1}
        numberOfPages={2}
        resultsCount={10}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1', '2'])
  })

  it('displays three buttons for three pages of results', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={1}
        numberOfPages={3}
        resultsCount={15}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1', '2', '3'])
  })

  it('displays one button for one partial page', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={1}
        numberOfPages={1}
        resultsCount={1}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1'])
  })

  it('displays two buttons for one full page and one partial page', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={1}
        numberOfPages={2}
        resultsCount={8}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1', '2'])
  })
})

describe('highlighting the current page', () => {
  it('sets the current-page class on the first button', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={1}
        numberOfPages={5}
        resultsCount={5}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')
    expect(navigationButtons.at(0).hasClass('current-page')).toBeTruthy()
  })

  it('sets the current-page class on the second button', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={2}
        numberOfPages={5}
        resultsCount={10}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')
    expect(navigationButtons.at(1).hasClass('current-page')).toBeTruthy()
  })

  it('sets the current-page class on the third button', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={3}
        numberOfPages={5}
        resultsCount={15}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')
    expect(navigationButtons.at(2).hasClass('current-page')).toBeTruthy()
  })
})
