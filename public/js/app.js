/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _system__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./system */ "./resources/js/system.js");

window.sys = _system__WEBPACK_IMPORTED_MODULE_0__["default"];

window.onload = function () {
  _system__WEBPACK_IMPORTED_MODULE_0__["default"].app_loaded();
};

window.app = {
  test: function test() {
    var req = {
      action: 'get_test'
    };
    _system__WEBPACK_IMPORTED_MODULE_0__["default"].post(RS + 'ajax', req, 'json').then(function (x) {
      console.log(x);
    });
  }
};

/***/ }),

/***/ "./resources/js/system.js":
/*!********************************!*\
  !*** ./resources/js/system.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  image_preview: function image_preview(e, container, self) {
    var container = container || {};
    var e = e || {};

    if (e && container) {
      for (var i = 0; i < e.srcElement.files.length; i++) {
        var file = e.srcElement.files[i];
        var reader = new FileReader();
        var img = $(container).find('img')[0];

        reader.onloadend = function () {
          return img.src = reader.result;
        };

        reader.readAsDataURL(file);
      }
    }
  },
  get_uploaded_name: function get_uploaded_name(self, target, mult) {
    var mult = mult || false;

    if (mult) {
      var file = "";
      var files_arr = $(self).prop("files");

      for (var i in files_arr) {
        var name = files_arr[i].name;

        if (typeof name == "undefined") {
          break;
        }

        file += name + "<br />";
      }
    } else {
      var file = self.value;
      file = file.replace(/\\/g, '/').split('/').pop();
    }

    var el = "";

    if (typeof target == "string") {
      el = $('.' + target);
    } else {
      el = $(target);
    }

    if ($(el).prop("tagName").toLowerCase() == 'input') {
      $(el).val(file.replace(/<br \/>/g, '; '));
    } else {
      $(el).html(file);
    }
  },
  post: function post(path, params, type, files) {
    var _this = this;

    return new Promise(function (resolve) {
      var ct = files ? false : "application/x-www-form-urlencoded; charset=UTF-8";
      var sys = _this;
      $.ajax({
        url: path,
        type: 'post',
        data: params,
        contentType: ct,
        processData: files ? false : true,
        headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
        },
        dataType: type,
        success: function success(response, status) {
          if (status == "success") {
            if (response.reason == "token_timeout") {
              var new_token = response.new_token;
              $('meta[name="csrf-token"]').attr('content', new_token);
              sys.post(path, params, type, files);
            } else if (response.reason == "session_timeout") {
              console.log(response.message);
            } else {
              resolve(response);
            }
          } else {
            resolve(response);
          }
        },
        error: function error() {
          resolve({
            reason: 'AJAX request error'
          });
        }
      });
    });
  },
  loading: {
    start: function start(type) {
      $('body').addClass('loading_cursor');
    },
    stop: function stop(type) {
      $('body').removeClass('loading_cursor');
    }
  },
  q: function q(alias, method, post_data, files) {
    var post_data = post_data || {};
    var alias = alias || "";
    var method = method || "";
    post_data.action = "q";
    post_data.alias = alias;
    post_data.method = method;
    return new Promise(function (resolve) {
      sys.post(RS + 'ajax', post_data, "json", files).then(function (r) {
        resolve(r);
      });
    });
  },
  send_form: function send_form(self, cb) {
    var _this2 = this;

    this.loading.start();
    var self = self || {};
    var form = $(self).closest('form');
    var form_values = form.serializeArray();
    var post = new FormData();
    var alias = "";
    var method = "";

    for (var i in form_values) {
      if (form_values[i].name == 'alias') alias = form_values[i].value;
      if (form_values[i].name == 'method') method = form_values[i].value;
    }

    if (!alias || !method) {
      this.loading.stop();
      return;
    }

    ;

    for (var i in form_values) {
      post.append(form_values[i].name, form_values[i].value);
    }

    var file_inputs = form.find('input[type="file"]');
    $.each(file_inputs, function (i, el) {
      var f = el.files;

      if (f.length > 1) {
        for (var i in f) {
          post.append(el.name + "[]", f[i]);
        }
      } else {
        post.append(el.name, f[0]);
      }
    });
    this.post(RS + 'ajax', post, "json", true).then(function (response) {
      if (cb) {
        cb(response);
        return;
      }

      console.log(response);

      if (response.status == "success") {
        if (response.refresh) {
          setTimeout(function () {
            document.location.reload();
          }, 2000);
        }
      } else {}

      _this2.loading.stop();
    });
  },
  reinit_select2: function reinit_select2() {
    $('.js_select2').each(function () {
      var dropdownParent = $(this).closest('.mw').length ? $(this).closest('.mw').find('.mct') : $(document.body);
      $(this).select2({
        minimumResultsForSearch: 999,
        dropdownParent: dropdownParent
      });
    });
  },
  app_loaded: function app_loaded() {},
  translit: function translit(str, target) {
    var target = target || {};
    str = str.toLowerCase();
    str = str.replace(/а/g, 'a');
    str = str.replace(/б/g, 'b');
    str = str.replace(/в/g, 'v');
    str = str.replace(/г/g, 'g');
    str = str.replace(/д/g, 'd');
    str = str.replace(/е/g, 'e');
    str = str.replace(/ё/g, 'yo');
    str = str.replace(/ж/g, 'zh');
    str = str.replace(/з/g, 'z');
    str = str.replace(/и/g, 'i');
    str = str.replace(/й/g, 'y');
    str = str.replace(/к/g, 'k');
    str = str.replace(/л/g, 'l');
    str = str.replace(/м/g, 'm');
    str = str.replace(/н/g, 'n');
    str = str.replace(/о/g, 'o');
    str = str.replace(/п/g, 'p');
    str = str.replace(/р/g, 'r');
    str = str.replace(/с/g, 's');
    str = str.replace(/т/g, 't');
    str = str.replace(/у/g, 'u');
    str = str.replace(/х/g, 'h');
    str = str.replace(/ф/g, 'f');
    str = str.replace(/ц/g, 'c');
    str = str.replace(/ч/g, 'ch');
    str = str.replace(/ш/g, 'sh');
    str = str.replace(/щ/g, 'shс');
    str = str.replace(/ъ/g, '');
    str = str.replace(/ы/g, 'u');
    str = str.replace(/ь/g, '');
    str = str.replace(/э/g, 'e');
    str = str.replace(/ю/g, 'yu');
    str = str.replace(/я/g, 'ya');
    str = str.replace(/[^a-z,\d,-]/g, '-');
    str = str.replace(/\,/g, '-');
    str = str.replace(/-+/g, '-');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');

    if (target) {
      var el = "";

      if (typeof target == "string") {
        el = $(target);
      } else {
        el = $(target);
      }

      if ($(el).prop("tagName").toLowerCase() == 'input') {
        $(el).val(str.replace(/<br \/>/g, '; '));
      } else {
        $(el).html(str);
      }
    } else {
      return str;
    }
  },
  switch_all_siblings: function switch_all_siblings(self) {
    var self = self || {};
    var container = $(self).closest('.widget_wrapper');

    if ($(self).is(':checked')) {
      container.find('input[type="checkbox"]').prop('checked', true);
    } else {
      container.find('input[type="checkbox"]').prop('checked', false);
    }
  },
  validate_email: function validate_email(self) {
    var email_val = self.value;
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var valid = re.test(email_val);

    if (valid || !email_val) {
      $(self).removeClass('red_border');
    } else {
      $(self).addClass('red_border');
    }
  },
  validate_max: function validate_max(self) {
    var self = self || {};
    var max_value = Number($(self).attr('max'));
    var curr_value = Number(self.value);

    if (curr_value > max_value) {
      $(self).addClass('red_border');
    } else {
      $(self).removeClass('red_border');
    }
  },
  round: function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  },
  prepare_form_data: function prepare_form_data(form) {
    var form_data = form.serializeArray();
    var post_data = {};
    $.map(form_data, function (n, i) {
      post_data[n['name']] = n['value'];
    });
    return post_data;
  }
});

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\server\OSPanel\domains\localhost\kassa\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\server\OSPanel\domains\localhost\kassa\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });