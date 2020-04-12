import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function useSearchParamAsQueryOnLoad (setInputValue, setQuery) {
  const location = useLocation()
  useLayoutEffect(() => {
    const queryFromParam = location.search.split('?')[1] || ''
    setInputValue(queryFromParam)
    setQuery(queryFromParam)
    // eslint-disable-next-line
  }, [location.pathname])
}

export default useSearchParamAsQueryOnLoad
