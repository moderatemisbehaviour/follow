import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

function useSearchParamAsQuery(setInputValue, setQuery) {
  const location = useLocation()

  useLayoutEffect(() => {
    const queryFromParam = location.search.split('?')[1] || ''
    setInputValue(queryFromParam)
    setQuery(queryFromParam)
    // We also depend on location key so that even if the same query is pushed twice it will still trigger the effect.
  }, [location.key, location.search])
}

export default useSearchParamAsQuery
