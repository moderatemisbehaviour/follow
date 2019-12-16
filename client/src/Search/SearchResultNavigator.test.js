import { shallow } from 'enzyme'
import React from 'react'
import SearchResultsNavigator from './SearchResultsNavigator'

describe('page buttons', () => {
  it('displays one button for one page of results', () => {
    const wrapper = shallow(
      <SearchResultsNavigator
        currentPage={1}
        numberOfResults={5}
        onNavigation={() => null}
        resultsPerPage={5}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1', 'more'])
  })

  it('displays two buttons for two pages of results', () => {
    const wrapper = shallow(
      <SearchResultsNavigator
        currentPage={1}
        numberOfResults={10}
        onNavigation={() => null}
        resultsPerPage={5}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1', '2', 'more'])
  })

  it('displays three buttons for three pages of results', () => {
    const wrapper = shallow(
      <SearchResultsNavigator
        currentPage={1}
        numberOfResults={15}
        onNavigation={() => null}
        resultsPerPage={5}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1', '2', '3', 'more'])
  })

  it('displays one button for one partial page', () => {
    const wrapper = shallow(
      <SearchResultsNavigator
        currentPage={1}
        numberOfResults={1}
        onNavigation={() => null}
        resultsPerPage={5}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1', 'more'])
  })

  it('displays 2 buttons for one full page and one partial page', () => {
    const wrapper = shallow(
      <SearchResultsNavigator
        currentPage={1}
        numberOfResults={8}
        onNavigation={() => null}
        resultsPerPage={5}
      />
    )
    const navigationButtons = wrapper.find('button')

    expect(
      navigationButtons.map(navigationButton => navigationButton.text())
    ).toEqual(['1', '2', 'more'])
  })
})

describe('highlighting the current page', () => {
  it('sets the current-page class on the first button', () => {
    const wrapper = shallow(
      <SearchResultsNavigator
        currentPage={1}
        numberOfResults={5}
        onNavigation={() => null}
        resultsPerPage={5}
      />
    )
    const navigationButtons = wrapper.find('button')
    expect(navigationButtons.at(0).hasClass('current-page')).toBeTruthy()
  })

  it('sets the current-page class on the second button', () => {
    const wrapper = shallow(
      <SearchResultsNavigator
        currentPage={2}
        numberOfResults={10}
        onNavigation={() => null}
        resultsPerPage={5}
      />
    )
    const navigationButtons = wrapper.find('button')
    expect(navigationButtons.at(1).hasClass('current-page')).toBeTruthy()
  })

  it('sets the current-page class on the third button', () => {
    const wrapper = shallow(
      <SearchResultsNavigator
        currentPage={3}
        numberOfResults={15}
        onNavigation={() => null}
        resultsPerPage={5}
      />
    )
    const navigationButtons = wrapper.find('button')
    expect(navigationButtons.at(2).hasClass('current-page')).toBeTruthy()
  })
})
