
export default (body, initialState) => (
  `
  <!DOCTYPE html>
  <html>
    <head>
    <meta charset="UTF-8"/>
    <title>Dervos</title>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab' rel='stylesheet' type='text/css'>
    <style>
      html { -webkit-text-size-adjust: 100% }
      body {
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.5;
        margin: 0;
      }
      .Button:hover {
        box-shadow: inset 0 0 0 999px rgba(0, 0, 0, .25);
      }
      .Input input:focus {
        outline: none;
        box-shadow: 0 0 0 2px #00749d;
      }
    </style>
    </head>
    <body>
      <div id="root">${body}</div>
      <script type="text/javascript" charset="utf-8">
        window.__INITIAL_STATE__ = ${initialState};
      </script>
      <script src="/static/bundle.js"></script>
    </body>
  </html>
  `
)
