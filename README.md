# numtel:publicsources

By default, Meteor does not perform any special handling on files placed inside the `public` directory of your application.

With this package, you can place a `publicsources.json` file in your application directory with a description of bundles of resources to build for client-side lazy-loading.

Source files will be transpiled and collected into a single `.js` and `.css` file for each bundle.

## Installation

```
meteor add numtel:publicsources
```

## Example

The following example will serve `admin.js`, `admin.js.map`, `admin.css`, and `admin.css.map`:

```javascript
{
  "admin": [ 
    "admin/templates.html",
    "admin/styles.less",
    "admin/main.coffee"
  ]
}

```

Or, see [a full application example](https://github.com/numtel/meteor-component-example)...

## Usage

Combine with a library loader for `iron:router` for the full experience:

* [miro:preloader](https://github.com/MiroHibler/meteor-preloader) - Library for loading `.js` and `.css` files when browsing to a route
* [manuelschoebel:wait-on-lib](https://github.com/DerMambo/wait-on-lib) - Simple library for loading `.js` files on browsing to a route

## License

MIT

Portions copyright Maxime Quandalle @mquandalle
