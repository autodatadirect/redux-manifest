import React from 'react'
import { Manifest, CellEpochDate } from 'redux-manifest'

const definition = [{
  id: 'id',
  label: 'ID',
  sortable: true
}, {
  id: 'date',
  label: 'Date',
  sortable: true,
  cellComponent: CellEpochDate
}, {
  id: 'firstName',
  label: 'First Name',
  sortable: true
}, {
  id: 'lastName',
  label: 'Last Name',
  sortable: true
}, {
  id: 'age',
  label: 'Age',
  sortable: true
}, {
  id: 'phone',
  label: 'Phone'
}, {
  id: 'address',
  label: 'Address'
}]

export default class ManifestWrapper extends React.Component {
  constructor (props) {
    super(props)
    this.state = {visible: true}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (row) {
    this.setState(prevState => ({
      visible: !prevState.visible
    }))
  }

  render () {
    if (this.state.visible) return <Manifest name='testManifest' definition={definition} onRowClick={this.handleClick} />
    return <div onClick={this.handleClick} > CLICK ME </div>
  }
}
