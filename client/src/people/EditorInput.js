import React from 'react'

import Input from '../common/Input'

function EditorInput (props) {
  return <Input onChange={props.onChange} prompt="Enter the person's name"/>
}

export default EditorInput
