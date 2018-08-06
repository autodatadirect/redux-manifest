# Redux Manifest
A paginated table implementation using Redux and React

## API

### Components

#### `<Manifest /> : Component`
The `Manifest` component is the primary component for using
##### Props
**`name : String [required]`**
The `name` prop is used by Redux Manifest to refer to the specific manifest when dispatching actions and updating the state.

**`loading : Boolean [required]`**
Whether data is currently loading for the manifest.  While loading, the manifest is placed in "loading" mode and has an obvious style.
![screenshot of Manifest Component Loading prop example](/docs/manifest-component-loading-example.gif?raw=true "Manifest Component Loading prop")

**`error : String [required]`**
An error message to be displayed to the user.

**`definition : Array[ col1 : Object, col2 : Object, ...] [required`]**
The definiton prop is an array of `columnDefinition` objects which define the layout and appearance of the `Manifest`.  Each `columnDefinition` has the following props:
* `id : String [required]`
* `label : String [optional]`
Text to be shown in the column header
* `sortable : Boolean [optional; default = false]`
Whether this column can be used to sort the table rows.
* `headerComponent : Component [optional; default = SimpleHeader]`
Pass a `headerComponent` in the `columnDefinition` to override the default `SimpleHeader`.
* `cellComponent : Component [optional; default = Cell]`
Pass a `cellComponent` in the `columnDefinition` to override the default `Cell`.

**`onRowClick : Function [optional]`**

##### Example
```javascript
import { Manifest, CellEpochDate } from 'redux-manifest'

const def = [
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

const Layout = props =>
  <div>
    <Manifest
      name='customer-manifest'
      loading={false}
      error=''
      definition ={def}
    />
  </div>
}
```
![screenshot of Manifest Component example](/docs/manifest-component-example.png?raw=true "Manifest Component")

#### `<Headers /> : Component`
#### `<Pager /> : Component`
#### `<PageSizer /> : Component`
#### `<Rows /> : Component`
#### `<Status /> : Component`
#### `<CellEpochDate /> : Component`

### Action Creators

#### `setPage : Function()`
#### `setError : Function()`
#### `setCount : Function()`
#### `refreshData : Function()`
#### `updateFilter : Function()`

### `actionTypes : Object`

### `reducer : Function()`

## Demos
### Basic Redux Manifest Example

To run the **Basic Redux Manifest Example**, run the following command in the terminal:
```bash
npm run example
```
This will serve the application on `localhost:8081`.  Navigate to that page in your browser to see the Basic Redux Manifest Example.

![screenshot of Basic Redux Manifest example](/docs/basic-redux-manifest-example.png?raw=true "Basic Redux Manifest Example")

### Storybook

To run [Storybook](https://github.com/storybooks/storybook) to test and debug individual React Components, run the following command in the terminal:
```bash
npm run demo
```
This will serve **Redux Manifest Storybook** on `localhost:9001`.  Navigate to that page in your browser to see Storybook.

![screenshot of Redux Manifest Storybook](/docs/redux-manifest-storybook.png?raw=true "Redux Manifest Storybook")
