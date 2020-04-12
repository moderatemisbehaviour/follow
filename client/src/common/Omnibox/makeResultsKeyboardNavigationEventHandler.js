function useResultsKeyboardNavigation(
  resultRefs,
  onSelect,
  firstResultOnKeyUp,
  currentlySelectedIndex,
  setCurrentlySelectedIndex
) {
  function onKeyUp(event) {
    event.stopPropagation()

    if (event.key === 'ArrowUp') {
      if (currentlySelectedIndex === 0) {
        firstResultOnKeyUp()
      } else {
        setCurrentlySelectedIndex(currentlySelectedIndex - 1)
      }
    } else if (event.key === 'ArrowDown') {
      const lastResultIndex = resultRefs.length - 1
      setCurrentlySelectedIndex(
        Math.min(currentlySelectedIndex + 1, lastResultIndex)
      )
    } else if (event.key === 'Enter') {
      onSelect(event.target.dataset.id)
    }
  }

  return onKeyUp
}

export default useResultsKeyboardNavigation
