// This is your plugin object. It can be exported to be used anywhere.

const Logger = {
  install (Vue, options) {
    /* CSS styles for logging */
    var splitter = options.separator || ':'
    var levels = ['debug', 'info', 'warn', 'error', 'fatal']
    var infoCss = ['background: #00b7ea',
      'color: white',
      'display: inline-block',
      'font-size:10px',
      'font-weight: bold',
      'text-align:center',
      'border-radius:2px',
      'margin-right:2px'
    ].join(';')
    var warnCss = ['background: #ffa51e',
      'color: white',
      'display: inline-block',
      'font-size:10px',
      'font-weight: bold',
      'text-align:center',
      'border-radius:2px',
      'margin-right:2px'
    ].join(';')
    var errorCss = ['background: #ff3f3f',
      'color: white',
      'display: inline-block',
      'font-size:10px',
      'font-weight: bold',
      'text-align:center',
      'border-radius:2px',
      'margin-right:2px'
    ].join(';')
    var fatalCss = ['background: #ff3f3f',
      'color: white',
      'display: inline-block',
      'font-size:10px',
      'font-weight: bold',
      'text-align:center',
      'border-radius:2px',
      'margin-right:2px'
    ].join(';')
    var debugCss = ['background: #c2bfbf',
      'color: white',
      'display: inline-block',
      'font-size:10px',
      'font-weight: bold',
      'text-align:center',
      'border-radius:2px',
      'margin-right:2px'
    ].join(';')

    var jsonStyle = {
      'info': infoCss,
      'error': errorCss,
      'fatal': fatalCss,
      'warn': warnCss,
      'debug': debugCss

    }
    /*********************************************************/

    const LogMessage = function (str = 'info', obj) {
      if (options.isEnabled && levels.indexOf(str) >= levels.indexOf(options.logLevel)) {
        if (obj instanceof Error && typeof obj.message !== 'undefined') {
          console.log('%c%s%s%c%s%o', jsonStyle[str], str, splitter, 'color:grey', obj)
        } else if (obj && typeof obj === 'object') {
          console.log('%c%s%c%s%c%s%o', jsonStyle[str] || infoCss, str, '', splitter, 'color:grey', (typeof obj) + ':', JSON.parse(JSON.stringify(obj)))
        } else if (typeof obj === 'string') {
          console.log('%c%s%c%s%c%s%s', jsonStyle[str], str, '', splitter, 'color:grey', (typeof obj) + ':', obj)
        }
      }
    }

    /*********************************************************/

    Vue.info = function (obj) {
      LogMessage('info', obj)
    }

    /*********************************************************/

    Vue.error = function (obj) {
      LogMessage('error', obj)
    }

    /*********************************************************/

    Vue.warn = function (obj) {
      LogMessage('warn', obj)
    }

    /*********************************************************/

    Vue.debug = function (obj) {
      LogMessage('debug', obj)
    }
    /*********************************************************/
    Vue.fatal = function (obj) {
      LogMessage('fatal', obj)
    }
  }
}

export default Logger
