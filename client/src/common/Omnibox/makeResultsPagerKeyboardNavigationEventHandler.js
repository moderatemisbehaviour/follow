function useResultsPagerKeyboardNavigation(
  pageNumber,
  setPageNumber,
  numberOfPages
) {
  function onKeyUp(event) {
    if (event.key === 'ArrowLeft') {
      setPageNumber(Math.max(pageNumber - 1, 1))
    } else if (event.key === 'ArrowRight') {
      setPageNumber(Math.min(pageNumber + 1, numberOfPages))
    }
  }

  return onKeyUp
}

export default useResultsPagerKeyboardNavigation
