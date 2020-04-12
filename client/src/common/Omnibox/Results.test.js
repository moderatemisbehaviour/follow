import { shallow } from 'enzyme'
import React from 'react'
import SearchResult from './Result'
import Results from './Results'

const validSearchResults = [
  {
    id: 'a1',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 'a2',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 'a3',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 'a4',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 'a5',
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  }
]

it('renders an li element for each result', () => {
  const wrapper = shallow(
    <Results
      resultsPerPage={5}
      searchResults={validSearchResults}
      searchResultsCount={5}
    />
  )
  expect(wrapper.find(SearchResult)).toHaveLength(5)
})
