# numtel:privatesources

## Notice

**:new: This package has been made obsolete by the new [`numtel:lazy-bundles` package](https://github.com/numtel/meteor-lazy-bundles).**

By default, Meteor does not perform any special handling on files placed inside the `private` directory of your application.

With this package, you can place a `privatesources.json` file in your application directory with a description of bundles of source files to process for client-side lazy-loading.

Source files will be transpiled and collected into a single `.js` and `.css` file for each bundle.

## Installation

The [`iron:router` package](https://github.com/EventedMind/iron-router) is required for this package.

```
meteor add iron:router numtel:privatesources
```

## Bundle Description Syntax

Inside of a `custom.privatesources.json` file in the root of your application, you may describe bundles of source files to serve to the client. The filename may be different than `custom.privatesources.json` as long as it includes the extension `.privatesources.json`. (e.g. `myapp.privatesources.json` is also valid)

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

* Filenames presented are relative to the `private` directory.
* Bundle names may contain slashes to simulate a directory path
* `.html` files are automatically sorted to the beginning of a bundle but other template filetypes are not. Be sure to include template files like `.jade` first in the bundle so that subsequent scripts will have access to apply helpers, events and handlers.

To obtain asset data directly from your application's server code, you may use the built-in method, `Assets.getText()`. Otherwise, load the files using the provided `iron:router` plugin described below.

## `iron:router` Plugin Initialization

In order to load the assets on the client side, a proxy route is configured using `iron:router`:

```javascript
// Initialize iron:router Plugin on server-side
Router.plugin('privateSources', {
  // Optional: Route path (without leading slash), Default '_loadSource'
  route: {String}, 
  // Optional: Determine if a route should serve the file requested.
  //           If not specified, all requests will be granted.
  //           ALL requests granted means that your private directory would
  //            not be private any more!
  //   @context - Same as Router.route context
  //   @param {string} path - Filename requested
  //   @return boolean - true to serve file, false to serve nothing
  allow: function(path){ 
    return false;
  }
});
```
If the specified `allow()` function permits the request and the default `route` is used, the above example will provide the following assets:

* `/_loadSource?f=admin.js` - Concatenated file containing processed versions of `private/admin/templates.html` and `private/admin/main.coffee`
* `/_loadSource?f=admin.css` - File containing processed version of `private/admin/styles.less`

Patterns for `allow()` functions may include checking a token on `this.params.query` or other strategies for determining the client's authenticity.

## Usage

Combine with a library loader integrated into `iron:router` for the full experience:

* [miro:preloader](https://github.com/MiroHibler/meteor-preloader) - Library for loading `.js` and `.css` files when browsing to a route
* [manuelschoebel:wait-on-lib](https://github.com/DerMambo/wait-on-lib) - Simple library for loading `.js` files on browsing to a route

## Notes

* If adding a new source handler package (e.g. `mquandalle:jade`), you must restart Meteor for this package to recognize the change.

## Related Resources

* [numtel:publicsources](https://github.com/numtel/meteor-publicsources) - Same package except without authentication
* [Full application example of numtel:publicsources](https://github.com/numtel/meteor-component-example)...


## License

MIT

Portions copyright Maxime Quandalle @mquandalle
