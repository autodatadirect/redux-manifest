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

  handleClick (ev) {
    this.setState(prevState => ({
      visible: !prevState.visible
    }))
  }

  onRowClick (row) {
    console.log('You clicked the following row: ', row)
  }

  renderButton () {
    return <button onClick={this.handleClick}>Click to mount/unmount</button>
  }

  render () {
    if (this.state.visible) {
      return <div>
        <Manifest name='testManifest' definition={definition} onRowClick={this.onRowClick} />
        {this.renderButton()}
      </div>
    }
    return this.renderButton()
  }
}
