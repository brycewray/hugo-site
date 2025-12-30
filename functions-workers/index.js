var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// _middleware.js
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
__name(dec2hex, "dec2hex");
function generateNonce() {
  const arr = new Uint8Array(12);
  crypto.getRandomValues(arr);
  const values = Array.from(arr, dec2hex);
  return [
    btoa(values.slice(0, 5).join("")).substr(0, 14),
    btoa(values.slice(5).join(""))
  ].join("/");
}
__name(generateNonce, "generateNonce");
async function onRequest(context) {
  const nonce = generateNonce();
  try {
    let imageResponse = await context.next();
    let type = imageResponse.headers.get("Content-Type") || "";
    if (!type.startsWith("text/")) {
      let newHeaders2 = new Headers(imageResponse.headers);
      newHeaders2.set("Cache-Control", "public, max-age=15768000, immutable");
      newHeaders2.set("x-Non-Text-Item", "Non-text item - headers successfully edited");
      newHeaders2.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
      newHeaders2.set("X-Frame-Options", "SAMEORIGIN");
      newHeaders2.set("X-Content-Type-Options", "nosniff");
      newHeaders2.set("Referrer-Policy", "no-referrer, strict-origin-when-cross-origin");
      return new Response(imageResponse.body, {
        status: imageResponse.status,
        statusText: imageResponse.statusText,
        headers: newHeaders2
      });
    }
    let response = await context.next();
		const html = (await response.text());
		/*
    const html = (await response.text()).replace(/DhcnhD3khTMePgXw/gi, nonce).replace(
      'src="https://ajax.cloudflare.com',
      `nonce="${nonce}" src="https://ajax.cloudflare.com`
    ).replace(
      // single opening quotation mark
      `src='https://static.cloudflareinsights.com`,
      `nonce="${nonce}" src='https://static.cloudflareinsights.com`
    ).replace(
      // double opening quotation mark
      `src="https://static.cloudflareinsights.com`,
      `nonce="${nonce}" src="https://static.cloudflareinsights.com`
    ).replace(
      // if using CF's addy obfuscation
      'cloudflare-static/email-decode.min.js"',
      `cloudflare-static/email-decode.min.js" nonce="${nonce}"`
    ).replace(
      'rel="stylesheet"',
      `rel="stylesheet" nonce="${nonce}"`
    ).replace(/<link rel="preload"/g, `<link nonce="${nonce}" rel="preload"`).replace(
      'cdn.usefathom.com/script.js"',
      `cdn.usefathom.com/script.js" nonce="${nonce}"`
    ).replace(
      'src="/assets/js/lite-yt-embed_',
      `nonce="${nonce}" src="/assets/js/lite-yt-embed_`
    ).replace(/<style/g, `<style nonce="${nonce}"`);
		*/
    let ttl;
    let url = new URL(context.request.url);
    const filesRegex = /(.*\.(ac3|avi|bmp|br|bz2|css|cue|dat|doc|docx|dts|eot|exe|flv|gif|gz|ico|img|iso|jpeg|jpg|js|json|map|mkv|mp3|mp4|mpeg|mpg|ogg|pdf|png|ppt|pptx|qt|rar|rm|svg|swf|tar|tgz|ttf|txt|wav|webp|webm|webmanifest|woff|woff2|xls|xlsx|xml|zip))$/;
    if (url.pathname.match(filesRegex)) {
      ttl = 31536e3;
    }
    let newHeaders = new Headers(response.headers);
    newHeaders.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
    newHeaders.set("X-Frame-Options", "SAMEORIGIN");
    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("Referrer-Policy", "no-referrer, strict-origin-when-cross-origin");
    if (ttl) {
      newHeaders.set("Cache-Control", "public, max-age=" + ttl + ", immutable");
    } else {
      newHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");
      // newHeaders.set("Content-Security-Policy", `base-uri 'self' https://*.brycewray.com; connect-src 'self' https://*.brycewray.com https://*.cloudinary.com https://*.cloudflareinsights.com https://cloudflareinsights.com https://*.ytimg.com https://*.youtube-nocookie.com https://*.mastodon.social https://cdn.masto.host https://*.zachleat.com https://*.usefathom.com https://*.bsky.app; default-src 'self'; frame-ancestors 'self' https://*.brycewray.com https://*.youtube-nocookie.com; font-src 'self' https://*.brycewray.com data: https://giscus.app https://fonts.gstatic.com https://*.bsky.app; form-action 'self' mailto: https://*.duckduckgo.com https://duckduckgo.com; frame-src 'self' https://*.brycewray.com https://*.youtube-nocookie.com https://giscus.app https://*.bsky.app; img-src 'self' https://*.brycewray.com https://*.usefathom.com https://*.cloudinary.com https://*.ytimg.com https://*.youtube-nocookie.com https://*.twimg.com https://*.mastodon.social https://*.fosstodon.org https://*.hachyderm.io https://cdn.masto.host https://*.zachleat.com https://*.google.com https://translate.googleapis.com https://*.bsky.app data:; media-src 'self' https://*.brycewray.com https://*.cloudinary.com https://*.ytimg.com https://*.youtube-nocookie.com https://*.twimg.com https://*.mastodon.social https://*.fosstodon.org https://*.hachyderm.io https://cdn.masto.host https://*.zachleat.com https://*.bsky.app data:; object-src 'none'; script-src 'self' 'nonce-${nonce}' https://giscus.app https://*.bsky.app 'unsafe-inline' 'unsafe-eval'; script-src-elem 'self' 'nonce-${nonce}' https://giscus.app https://*.bsky.app; style-src 'self' 'unsafe-inline' https://*.brycewray.com https://*.youtube-nocookie.com data: https://*.google.com https://translate.googleapis.com https://giscus.app https://*.bsky.app https://fonts.googleapis.com;`);
      newHeaders.set("X-XSS-Protection", "1");
      newHeaders.set("Permissions-Policy", "fullscreen=*, picture-in-picture=*, xr-spatial-tracking=*");
    }
    newHeaders.set("CF-nonce-generator", "HIT");
    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  } catch (error) {
    console.log(error);
  }
}
__name(onRequest, "onRequest");

// ../.wrangler/tmp/pages-rh7jtz/functionsRoutes-0.23751799621620773.mjs
var routes = [
  {
    routePath: "/",
    mountPath: "/",
    method: "",
    middlewares: [onRequest],
    modules: []
  }
];

// ../../.npm/_npx/32026684e21afda6/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
export {
  pages_template_worker_default as default
};
