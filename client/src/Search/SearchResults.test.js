import React from 'react'
import { shallow } from 'enzyme'
import SearchResults from './SearchResults'

const validSearchResults = [
  {
    id: 1,
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 2,
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 3,
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 4,
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  },
  {
    id: 5,
    name: 'Siobhan Wilson',
    image:
      'https://pbs.twimg.com/profile_images/1155313320339103747/MrTMPR_o_400x400.jpg'
  }
]

it('shows a create person button using the query', () => {
  const searchResults = shallow(
    <SearchResults query="Siob" searchResults={validSearchResults} />
  )
})
