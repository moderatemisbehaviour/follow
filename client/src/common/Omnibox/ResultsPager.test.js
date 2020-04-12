import { shallow } from 'enzyme'
import React from 'react'
import ResultsPager from './ResultsPager'

describe('page buttons', () => {
  it('displays one button for one page of results', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={1}
        resultsPerPage={5}
        searchResultsCount={5}
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
        resultsPerPage={5}
        searchResultsCount={10}
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
        resultsPerPage={5}
        searchResultsCount={15}
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
        resultsPerPage={5}
        searchResultsCount={1}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1'])
  })

  it('displays 2 buttons for one full page and one partial page', () => {
    const wrapper = shallow(
      <ResultsPager
        currentPage={1}
        resultsPerPage={5}
        searchResultsCount={8}
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
        resultsPerPage={5}
        searchResultsCount={5}
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
        resultsPerPage={5}
        searchResultsCount={10}
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
        resultsPerPage={5}
        searchResultsCount={15}
        onNavigation={() => null}
      />
    )
    const navigationButtons = wrapper.find('button')
    expect(navigationButtons.at(2).hasClass('current-page')).toBeTruthy()
  })
})
