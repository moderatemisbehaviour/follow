import React from 'react'

import Input from '../common/Input'

function EditorInput (props) {
  return <Input onChange={props.onChange} prompt={props.prompt} value={props.value}/>
}

export default EditorInput
