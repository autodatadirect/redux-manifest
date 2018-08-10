# Redux Manifest

Redux Manifest is a paginated table built for react and redux designed to be backed by an asynchronous service.
To make this work in a generic fashion, it dispatches two actions to obtain the data to display: `@@redux-manifest/REFRESH_DATA` and `@@redux-manifest/REFRESH_COUNT`.
It is up to the system implementing the manifest to handle these actions, if they are left unhandled the manifest will not load.

The `@@redux-manifest/REFRESH_DATA` action is handled by dispatching a `@@redux-manifest/SET_DATA` action and the `@@redux-manifest/REFRESH_COUNT` action is handled by dispatching a `@@redux-manifest/SET_COUNT`. If there is an error retrieving the data for either of these actions a `@@redux-manifest/SET_ERROR` action should be dispatched.

The data is expected to be returned as an array of entry objects on the `@@redux-manifest/SET_DATA` action.
The manifest uses a definition object, a required manifest prop, to transform the entry objects into the columns of a row in the manifest table.


# Getting Started

__Create the manifest definition.__

```javascript
const definition = [
  {
    id: 'customer-name',
    label: 'Name',
    sortable: true
  }. {
    id: 'start_date',
    label: 'Start Date',
    cellComponent: CellEpochDate
  }
]
```

__Add the `Manifest` component and give it a name and the definition.__

```javascript
import { Manifest } from 'redux-manifest'

<Manifest name='testManifest' definition={definition} />
```

__Add the Redux Manifest reducer to your application's reducer__

```javascript
import manifestReducer from 'redux-manifest/reducer'

const rootReducer = combineReducers({
  ...
  manifest: manifestReducer
})
```

__Write the code to handle the actions, this example is using [sagas](https://github.com/redux-saga/redux-saga).__
This code will look different in every system and is here as an example only.


```javascript
import { setPage, setError, setCount, actionTypes as types } from 'redux-manifest'

function * sagaRefresh () {
  yield takeLatest(types.REFRESH_DATA, sagaDataService)
}

function * sagaRefreshCount (action) {
  yield takeEvery(types.REFRESH_COUNT, sagaCountService)
}

function * sagaDataService (action) {
  try {
    const data = yield service.getData(action.filter)
    yield put(setPage(action.manifestName, data.data))
  } catch (err) {
    yield put(setError(action.manifestName, err.message))
  }
}

function * sagaCountService (action) {
  try {
    const count = yield service.getCount(action.filter)
    yield put(setCount(action.manifestName, count))
  } catch (err) {
    yield put(setError(action.manifestName, err.message))
  }
}
```

# API

## Manifest Component

The `Manifest` component is the primary component for using

| Prop | Required | Type | Description |
| --- | :---: | --- | --- |
| _name_ | * | string | used by Redux Manifest to refer to the specific manifest when dispatching actions and updating the state |
| _definition_ | * | array | an array of objects which define the layout and appearance of the manifest |
| _autoLoad_ |  | boolean | instructs the manifest to request data on mount, defaults to `true` |
| _data_ |  | array | an array of entry objects that represent the complete dataset for this manifest, using this prop creates an in memory manifest so that responding to the `REFRESH_DATA` and `REFRESH_COUNT` actions is no longer required |


## Manifest Definition

The manifest definition is an array of column definition objects which define the layout and appearance of the manifest.
Each column definition object has at least two fields, `id` and `label`.
The manifest definition is a required prop for the manifest component.

__Example Manifest Definition__

```javascript
[{
  id: 'name',
  label: 'Customer Name'
}, {
  id: 'phone',
  label: 'Phone Number',
  sortable: true,
}, {
  id: 'date',
  label: 'Creation Date',
  sortable: true,
  cellComponent: CustomDateCellComponent,
  headerComponent: CustomDateHeaderComponent
}]
```

__Manifest Definition Fields__

| Column Field | Required | Type | Description |
| --- | :---: | --- | --- |
| _id_ | * | string | key used to pull data from the row's entry object |
| _label_ | * | string | text to be shown in the column header |
| _sortable_ |  | boolean  | determines if the column can be sorted |
| _cellComponent_ |  | Component | override the default cell component |
| _headerComponent_ |  | Component | override the default header component |

## Actions

| Action Type | Creator | Fields | Description |
| --- | --- | --- | --- |
| _@@redux-manifest/REFRESH_DATA_ | refreshData | `manifestName`<br>`countNeeded`<br>`filter`<br> | dispatched by the manifest when new data is required |
| _@@redux-manifest/REFRESH_COUNT_ | refreshCount | `manifestName`<br>`filter` | dispatched by the manifest when the count needs to be updated |
| _@@redux-manifest/UPDATE_FILTER_ | updateFilter | `manifestName`<br>`filter` | dispatched by implementor to change the filter the manifest is using, this will cause `REFRESH_DATA` and `REFRESH_COUNT` to be dispatched |
| _@@redux-manifest/SET_DATA_ | setPage | `manifestName`<br>``data``<br>`count` | dispatched by the implementor in response to a `REFRESH_DATA` action with the requested data |
| _@@redux-manifest/SET_COUNT_ | setCount | `manifestName`<br>`count` | dispatched by the implementor in response to a `REFRESH_COUNT` action with the requested count |
| _@@redux-manifest/SET_ERROR_ | setError | `manifestName`<br>`message` | dispatched by implementor to inform the manifest that processing a `REFRESH_DATA` or `REFRESH_COUNT` action failed |
| _@@redux-manifest/FOCUS_ROW_ | focusRow | `manifestName`<br>`id` | can be dispatched by the manifest or implementor to set the focused row |
| _@@redux-manifest/SET_IN_MEMORY_DATA_ | setInMemoryData | `manifestName`<br>`data` | dispatched by the manifest when the `data` is set on the manifest component |
| _@@redux-manifest/DESTROY_ | destroy | `manifestName` | dispatched by the manifest when the component is unmounted and is responsible for cleaning up the store when manifest information is no longer needed |

| Action Field | Type | Description |
| --- | --- | --- |
| `manifestName` | string | unique name given to identify a manifest in the app |
| `countNeeded` | boolean | `true` when the count needs to be update, a `REFRESH_COUNT` action is also dispatched |
| `filter` | object | an object containing all the information needed to determine the rows on the current page and total count |
| `data` | array | an array of objects where every object is used to create a row in the current page of the table for the current filter |
| `count` | number | the total row count for the current filter |
| `message` | string | used on the `SET_ERROR` action to hold the error message |
| `id` | string | the row id |

## Filter Object

```javascript
filter: {
  page: 0,
  pageSize: 10,
  sorts: []
}
```

# Example

To run the **Basic Redux Manifest Example**, run the following command in the terminal:
```bash
npm install
npm run example
```

This will serve the application on [http://localhost:8081]().  Navigate to that page in your browser to see the Basic Redux Manifest Example.
