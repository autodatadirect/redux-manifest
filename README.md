# Redux Manifest
A paginated table implementation using Redux and React

## API

### `<Manifest />`

#### Props
**`name : String [required]`**

**`loading : Boolean [required]`**

**`error : String [required]`**

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

## Demos
### Basic Redux Manifest Example

To run the **Basic Redux Manifest Example**, run the following command in the terminal:
```bash
npm run example
```
This will serve the application on `localhost:8081`.  Navigate to that page in your browser to see the Basic Redux Manifest Example.

![Alt text](/docs/basic-redux-manifest-example.png?raw=true "Optional Title")

### Storybook

To run [Storybook](https://github.com/storybooks/storybook) to test and debug individual React Components, run the following command in the terminal:
```bash
npm run demo
```
This will serve **Redux-Manifest** Storybook on `localhost:9001`.  Navigate to that page in your browser to see Storybook.

![Alt text](/docs/redux-manifest-storybook.png?raw=true "Optional Title")
