# numtel:publicsources

By default, Meteor does not perform any special handling on files placed inside the `public` directory of your application.

With this package, you can place a `publicsources.json` file in your application directory with a description of bundles of source files to process for client-side lazy-loading.

Source files will be transpiled and collected into a single `.js` and `.css` file for each bundle.

See [a full application example](https://github.com/numtel/meteor-component-example)...

## Installation

```
meteor add numtel:publicsources
```

## Bundle Description Syntax

Inside of a `publicsources.json` file in the root of your application, you may describe bundles of source files to serve to the client.

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

* Filenames presented are relative to the `public` directory. Files may also be loaded from the `private` directory (e.g. `../private/somefile.js`)
* Bundle names may contain slashes to simulate a directory path
* `.html` files are automatically sorted to the beginning of a bundle but other template filetypes are not. Be sure to include template files like `.jade` first in the bundle so that subsequent scripts will have access to apply helpers, events and handlers.

## Usage

Combine with a library loader integrated into `iron:router` for the full experience:

* [miro:preloader](https://github.com/MiroHibler/meteor-preloader) - Library for loading `.js` and `.css` files when browsing to a route
* [manuelschoebel:wait-on-lib](https://github.com/DerMambo/wait-on-lib) - Simple library for loading `.js` files on browsing to a route

## Notes

* If adding a new source handler package (e.g. `mquandalle:jade`), you must restart Meteor for this package to recognize the change.

## License

MIT

Portions copyright Maxime Quandalle @mquandalle
