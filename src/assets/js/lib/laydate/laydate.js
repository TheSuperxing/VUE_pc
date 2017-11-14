/*! laydate-v5.0.3 日期与时间组件 MIT License  http://www.layui.com/laydate/  By 贤心 */ ;

require('./theme/default/laydate.css')
! function() {
	"use strict";
	var e = window.layui && layui.define,
		t = {
			getPath: function() {
				var e = document.scripts,
					t = e[e.length - 1],
					n = t.src;
				if(!t.getAttribute("merge")) return n.substring(0, n.lastIndexOf("/") + 1)
			}(),
			getStyle: function(e, t) {
				var n = e.currentStyle ? e.currentStyle : window.getComputedStyle(e, null);
				return n[n.getPropertyValue ? "getPropertyValue" : "getAttribute"](t)
			},
			link: function(e, a, i) {
				if(n.path) {
					var r = document.getElementsByTagName("head")[0],
						o = document.createElement("link");
					"string" == typeof a && (i = a);
					var s = (i || e).replace(/\.|\//g, ""),
						l = "layuicss-" + s,
						d = 0;
					o.rel = "stylesheet", o.href = n.path + e, o.id = l, document.getElementById(l) || r.appendChild(o), "function" == typeof a && ! function c() {
						return ++d > 80 ? window.console && console.error("laydate.css: Invalid") : void(1989 === parseInt(t.getStyle(document.getElementById(l), "width")) ? a() : setTimeout(c, 100))
					}()
				}
			}
		},
		n = {
			v: "5.0.3",
			config: {},
			index: window.laydate && window.laydate.v ? 1e5 : 0,
			path: t.getPath,
			set: function(e) {
				var n = this;
				return n.config = t.extend({}, n.config, e), n
			},
			ready: function(a) {
				var i = "laydate",
					r = "",
					o = (e ? "modules/laydate/" : "theme/") + "default/laydate.css?v=" + n.v + r;
				return e ? layui.addcss(o, a, i) : t.link(o, a, i), this
			}
		},
		a = function() {
			var e = this;
			return {
				hint: function(t) {
					e.hint.call(e, t)
				},
				config: e.config
			}
		},
		i = "laydate",
		r = ".layui-laydate",
		o = "layui-this",
		s = "laydate-disabled",
		l = "开始日期超出了结束日期<br>建议重新选择",
		d = [100, 2e5],
		c = "layui-laydate-list",
		m = "laydate-selected",
		u = "layui-laydate-hint",
		h = "laydate-day-prev",
		y = "laydate-day-next",
		f = "layui-laydate-footer",
		p = ".laydate-btns-confirm",
		g = "laydate-time-text",
		v = ".laydate-btns-time",
		D = function(e) {
			var t = this;
			t.index = ++n.index, t.config = T.extend({}, t.config, n.config, e), n.ready(function() {
				t.init()
			})
		},
		T = function(e) {
			return new w(e)
		},
		w = function(e) {
			for(var t = 0, n = "object" == typeof e ? [e] : (this.selector = e, document.querySelectorAll(e || null)); t < n.length; t++) this.push(n[t])
		};
	w.prototype = [], w.prototype.constructor = w, T.extend = function() {
		var e = 1,
			t = arguments,
			n = function(e, t) {
				e = e || (t.constructor === Array ? [] : {});
				for(var a in t) e[a] = t[a] && t[a].constructor === Object ? n(e[a], t[a]) : t[a];
				return e
			};
		for(t[0] = "object" == typeof t[0] ? t[0] : {}; e < t.length; e++) "object" == typeof t[e] && n(t[0], t[e]);
		return t[0]
	}, T.ie = function() {
		var e = navigator.userAgent.toLowerCase();
		return !!(window.ActiveXObject || "ActiveXObject" in window) && ((e.match(/msie\s(\d+)/) || [])[1] || "11")
	}(), T.stope = function(e) {
		e = e || win.event, e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
	}, T.each = function(e, t) {
		var n, a = this;
		if("function" != typeof t) return a;
		if(e = e || [], e.constructor === Object) {
			for(n in e)
				if(t.call(e[n], n, e[n])) break
		} else
			for(n = 0; n < e.length && !t.call(e[n], n, e[n]); n++);
		return a
	}, T.digit = function(e, t, n) {
		var a = "";
		e = String(e), t = t || 2;
		for(var i = e.length; i < t; i++) a += "0";
		return e < Math.pow(10, t) ? a + (0 | e) : e
	}, T.elem = function(e, t) {
		var n = document.createElement(e);
		return T.each(t || {}, function(e, t) {
			n.setAttribute(e, t)
		}), n
	}, w.addStr = function(e, t) {
		return e = e.replace(/\s+/, " "), t = t.replace(/\s+/, " ").split(" "), T.each(t, function(t, n) {
			new RegExp("\\b" + n + "\\b").test(e) || (e = e + " " + n)
		}), e.replace(/^\s|\s$/, "")
	}, w.removeStr = function(e, t) {
		return e = e.replace(/\s+/, " "), t = t.replace(/\s+/, " ").split(" "), T.each(t, function(t, n) {
			var a = new RegExp("\\b" + n + "\\b");
			a.test(e) && (e = e.replace(a, ""))
		}), e.replace(/\s+/, " ").replace(/^\s|\s$/, "")
	}, w.prototype.find = function(e) {
		var t = this,
			n = 0,
			a = [],
			i = "object" == typeof e;
		return this.each(function(r, o) {
			for(var s = i ? [e] : o.querySelectorAll(e || null); n < s.length; n++) a.push(s[n]);
			t.shift()
		}), i || (t.selector = (t.selector ? t.selector + " " : "") + e), T.each(a, function(e, n) {
			t.push(n)
		}), t
	}, w.prototype.each = function(e) {
		return T.each.call(this, this, e)
	}, w.prototype.addClass = function(e, t) {
		return this.each(function(n, a) {
			a.className = w[t ? "removeStr" : "addStr"](a.className, e)
		})
	}, w.prototype.removeClass = function(e) {
		return this.addClass(e, !0)
	}, w.prototype.hasClass = function(e) {
		var t = !1;
		return this.each(function(n, a) {
			new RegExp("\\b" + e + "\\b").test(a.className) && (t = !0)
		}), t
	}, w.prototype.attr = function(e, t) {
		var n = this;
		return void 0 === t ? function() {
			if(n.length > 0) return n[0].getAttribute(e)
		}() : n.each(function(n, a) {
			a.setAttribute(e, t)
		})
	}, w.prototype.removeAttr = function(e) {
		return this.each(function(t, n) {
			n.removeAttribute(e)
		})
	}, w.prototype.html = function(e) {
		return this.each(function(t, n) {
			n.innerHTML = e
		})
	}, w.prototype.val = function(e) {
		return this.each(function(t, n) {
			n.value = e
		})
	}, w.prototype.append = function(e) {
		return this.each(function(t, n) {
			"object" == typeof e ? n.appendChild(e) : n.innerHTML = n.innerHTML + e
		})
	}, w.prototype.remove = function(e) {
		return this.each(function(t, n) {
			e ? n.removeChild(e) : n.parentNode.removeChild(n)
		})
	}, w.prototype.on = function(e, t) {
		return this.each(function(n, a) {
			a.attachEvent ? a.attachEvent("on" + e, function(e) {
				e.target = e.srcElement, t.call(a, e)
			}) : a.addEventListener(e, t, !1)
		})
	}, w.prototype.off = function(e, t) {
		return this.each(function(n, a) {
			a.detachEvent ? a.detachEvent("on" + e, t) : a.removeEventListener(e, t, !1)
		})
	}, D.isLeapYear = function(e) {
		return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
	}, D.prototype.config = {
		type: "date",
		range: !1,
		format: "yyyy-MM-dd",
		value: null,
		min: "1900-1-1",
		max: "2099-12-31",
		trigger: "focus",
		show: !1,
		showBottom: !0,
		btns: ["clear", "now", "confirm"],
		lang: "cn",
		theme: "default",
		position: null,
		calendar: !1,
		mark: {},
		zIndex: null,
		done: null,
		change: null
	}, D.prototype.lang = function() {
		var e = this,
			t = e.config,
			n = {
				cn: {
					weeks: ["日", "一", "二", "三", "四", "五", "六"],
					time: ["时", "分", "秒"],
					timeTips: "选择时间",
					startTime: "开始时间",
					endTime: "结束时间",
					dateTips: "返回日期",
					month: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
					tools: {
						confirm: "确定",
						clear: "清空",
						now: "现在"
					}
				},
				en: {
					weeks: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					time: ["Hours", "Minutes", "Seconds"],
					timeTips: "Select Time",
					startTime: "Start Time",
					endTime: "End Time",
					dateTips: "Select Date",
					month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
					tools: {
						confirm: "Confirm",
						clear: "Clear",
						now: "Now"
					}
				}
			};
		return n[t.lang] || n.cn
	}, D.prototype.init = function() {
		var e = this,
			t = e.config,
			n = "yyyy|y|MM|M|dd|d|HH|H|mm|m|ss|s",
			a = "static" === t.position,
			i = {
				year: "yyyy",
				month: "yyyy-MM",
				date: "yyyy-MM-dd",
				time: "HH:mm:ss",
				datetime: "yyyy-MM-dd HH:mm:ss"
			};
		t.elem = T(t.elem), t.eventElem = T(t.eventElem), t.elem[0] && (t.range === !0 && (t.range = "-"), t.format === i.date && (t.format = i[t.type]), e.format = t.format.match(new RegExp(n + "|.", "g")) || [], e.EXP_IF = "", e.EXP_SPLIT = "", T.each(e.format, function(t, a) {
			var i = new RegExp(n).test(a) ? "\\b\\d{1," + function() {
				return /yyyy/.test(a) ? 4 : /y/.test(a) ? 308 : 2
			}() + "}\\b" : "\\" + a;
			e.EXP_IF = e.EXP_IF + i, e.EXP_SPLIT = e.EXP_SPLIT + (e.EXP_SPLIT ? "|" : "") + "(" + i + ")"
		}), e.EXP_IF = new RegExp("^" + (t.range ? e.EXP_IF + "\\s\\" + t.range + "\\s" + e.EXP_IF : e.EXP_IF) + "$"), e.EXP_SPLIT = new RegExp(e.EXP_SPLIT, "g"), e.isInput(t.elem[0]) || "focus" === t.trigger && (t.trigger = "click"), t.elem.attr("lay-key") || (t.elem.attr("lay-key", e.index), t.eventElem.attr("lay-key", e.index)), t.mark = T.extend({}, t.calendar && "cn" === t.lang ? {
			"0-1-1": "元旦",
			"0-2-14": "情人",
			"0-3-8": "妇女",
			"0-3-12": "植树",
			"0-4-1": "愚人",
			"0-5-1": "劳动",
			"0-5-4": "青年",
			"0-6-1": "儿童",
			"0-9-10": "教师",
			"0-9-18": "国耻",
			"0-10-1": "国庆",
			"0-12-25": "圣诞"
		} : {}, t.mark), T.each(["min", "max"], function(e, n) {
			var a = [],
				i = [];
			if("number" == typeof t[n]) {
				var r = t[n],
					o = (new Date).getTime(),
					s = 864e5,
					l = new Date(r ? r < s ? o + r * s : r : o);
				a = [l.getFullYear(), l.getMonth() + 1, l.getDate()], r < s || (i = [l.getHours(), l.getMinutes(), l.getSeconds()])
			} else a = (t[n].match(/\d+-\d+-\d+/) || [""])[0].split("-"), i = (t[n].match(/\d+:\d+:\d+/) || [""])[0].split(":");
			t[n] = {
				year: 0 | a[0] || (new Date).getFullYear(),
				month: a[1] ? (0 | a[1]) - 1 : (new Date).getMonth(),
				date: 0 | a[2] || (new Date).getDate(),
				hours: 0 | i[0],
				minutes: 0 | i[1],
				seconds: 0 | i[2]
			}
		}), e.elemID = "layui-laydate" + t.elem.attr("lay-key"), (t.show || a) && e.render(), a || e.events())
	}, D.prototype.render = function() {
		var e = this,
			t = e.config,
			n = e.lang(),
			a = "static" === t.position,
			i = e.elem = T.elem("div", {
				id: e.elemID,
				"class": ["layui-laydate", t.range ? " layui-laydate-range" : "", a ? " layui-laydate-static" : "", t.theme && "default" !== t.theme && !/^#/.test(t.theme) ? " laydate-theme-" + t.theme : ""].join("")
			}),
			r = e.elemMain = [],
			o = e.elemHeader = [],
			s = e.elemCont = [],
			l = e.table = [],
			d = e.footer = T.elem("div", {
				"class": f
			});
		if(t.zIndex && (i.style.zIndex = t.zIndex), T.each(new Array(2), function(e) {
				if(!t.range && e > 0) return !0;
				var a = T.elem("div", {
						"class": "layui-laydate-header"
					}),
					i = [function() {
						var e = T.elem("i", {
							"class": "layui-icon laydate-icon laydate-prev-y"
						});
						return e.innerHTML = "&#xe65a;", e
					}(), function() {
						var e = T.elem("i", {
							"class": "layui-icon laydate-icon laydate-prev-m"
						});
						return e.innerHTML = "&#xe603;", e
					}(), function() {
						var e = T.elem("div", {
								"class": "laydate-set-ym"
							}),
							t = T.elem("span"),
							n = T.elem("span");
						return e.appendChild(t), e.appendChild(n), e
					}(), function() {
						var e = T.elem("i", {
							"class": "layui-icon laydate-icon laydate-next-m"
						});
						return e.innerHTML = "&#xe602;", e
					}(), function() {
						var e = T.elem("i", {
							"class": "layui-icon laydate-icon laydate-next-y"
						});
						return e.innerHTML = "&#xe65b;", e
					}()],
					d = T.elem("div", {
						"class": "layui-laydate-content"
					}),
					c = T.elem("table"),
					m = T.elem("thead"),
					u = T.elem("tr");
				T.each(i, function(e, t) {
					a.appendChild(t)
				}), m.appendChild(u), T.each(new Array(6), function(e) {
					var t = c.insertRow(0);
					T.each(new Array(7), function(a) {
						if(0 === e) {
							var i = T.elem("th");
							i.innerHTML = n.weeks[a], u.appendChild(i)
						}
						t.insertCell(a)
					})
				}), c.insertBefore(m, c.children[0]), d.appendChild(c), r[e] = T.elem("div", {
					"class": "layui-laydate-main laydate-main-list-" + e
				}), r[e].appendChild(a), r[e].appendChild(d), o.push(i), s.push(d), l.push(c)
			}), T(d).html(function() {
				var e = [],
					i = [];
				return "datetime" === t.type && e.push('<span lay-type="datetime" class="laydate-btns-time">' + n.timeTips + "</span>"), T.each(t.btns, function(e, r) {
					var o = n.tools[r] || "btn";
					t.range && "now" === r || (a && "clear" === r && (o = "cn" === t.lang ? "重置" : "Reset"), i.push('<span lay-type="' + r + '" class="laydate-btns-' + r + '">' + o + "</span>"))
				}), e.push('<div class="laydate-footer-btns">' + i.join("") + "</div>"), e.join("")
			}()), T.each(r, function(e, t) {
				i.appendChild(t)
			}), t.showBottom && i.appendChild(d), /^#/.test(t.theme)) {
			var c = T.elem("style"),
				m = ["#{{id}} .layui-laydate-header{background-color:{{theme}};}", "#{{id}} .layui-this{background-color:{{theme}} !important;}"].join("").replace(/{{id}}/g, e.elemID).replace(/{{theme}}/g, t.theme);
			"styleSheet" in c ? (c.setAttribute("type", "text/css"), c.styleSheet.cssText = m) : c.innerHTML = m, T(i).addClass("laydate-theme-molv"), i.appendChild(c)
		}
		e.remove(), a ? t.elem.append(i) : (document.body.appendChild(i), e.position()), e.checkDate().calendar(), e.changeEvent(), D.thisElem = e.elemID, "function" == typeof t.ready && t.ready(T.extend({}, t.dateTime, {
			month: t.dateTime.month + 1
		}))
	}, D.prototype.remove = function() {
		var e = this,
			t = e.config,
			n = T("#" + e.elemID);
		return n[0] && "static" !== t.position && e.checkDate(function() {
			n.remove()
		}), e
	}, D.prototype.position = function() {
		var e = this,
			t = e.config,
			n = e.bindElem || t.elem[0],
			a = n.getBoundingClientRect(),
			i = e.elem.offsetWidth,
			r = e.elem.offsetHeight,
			o = function(e) {
				return e = e ? "scrollLeft" : "scrollTop", document.body[e] | document.documentElement[e]
			},
			s = function(e) {
				return document.documentElement[e ? "clientWidth" : "clientHeight"]
			},
			l = 5,
			d = a.left,
			c = a.bottom;
		d + i + l > s("width") && (d = s("width") - i - l), c + r + l > s() && (c = a.top > r ? a.top - r : s() - r, c -= 2 * l), t.position && (e.elem.style.position = t.position), e.elem.style.left = d + ("fixed" === t.position ? 0 : o(1)) + "px", e.elem.style.top = c + ("fixed" === t.position ? 0 : o()) + "px"
	}, D.prototype.hint = function(e) {
		var t = this,
			n = (t.config, T.elem("div", {
				"class": u
			}));
		n.innerHTML = e || "", T(t.elem).find("." + u).remove(), t.elem.appendChild(n), clearTimeout(t.hinTimer), t.hinTimer = setTimeout(function() {
			T(t.elem).find("." + u).remove()
		}, 3e3)
	}, D.prototype.getAsYM = function(e, t, n) {
		return n ? t-- : t++, t < 0 && (t = 11, e--), t > 11 && (t = 0, e++), [e, t]
	}, D.prototype.systemDate = function(e) {
		var t = e || new Date;
		return {
			year: t.getFullYear(),
			month: t.getMonth(),
			date: t.getDate(),
			hours: e ? e.getHours() : 0,
			minutes: e ? e.getMinutes() : 0,
			seconds: e ? e.getSeconds() : 0
		}
	}, D.prototype.checkDate = function(e) {
		var t, a, i = this,
			r = (new Date, i.config),
			o = r.dateTime = r.dateTime || i.systemDate(),
			s = i.bindElem || r.elem[0],
			l = (i.isInput(s) ? "val" : "html", i.isInput(s) ? s.value : "static" === r.position ? "" : s.innerHTML),
			c = function(e) {
				e.year > d[1] && (e.year = d[1], a = !0), e.month > 11 && (e.month = 11, a = !0), e.hours > 23 && (e.hours = 0, a = !0), e.minutes > 59 && (e.minutes = 0, e.hours++, a = !0), e.seconds > 59 && (e.seconds = 0, e.minutes++, a = !0), t = n.getEndDate(e.month + 1, e.year), e.date > t && (e.date = t, a = !0)
			},
			m = function(e, t, n) {
				var o = ["startTime", "endTime"];
				t = t.match(i.EXP_SPLIT), n = n || 0, r.range && (i[o[n]] = i[o[n]] || {}), T.each(i.format, function(s, l) {
					var c = parseFloat(t[s]);
					t[s].length < l.length && (a = !0), /yyyy|y/.test(l) ? (c < d[0] && (c = d[0], a = !0), e.year = c) : /MM|M/.test(l) ? (c < 1 && (c = 1, a = !0), e.month = c - 1) : /dd|d/.test(l) ? (c < 1 && (c = 1, a = !0), e.date = c) : /HH|H/.test(l) ? (c < 1 && (c = 0, a = !0), e.hours = c, r.range && (i[o[n]].hours = c)) : /mm|m/.test(l) ? (c < 1 && (c = 0, a = !0), e.minutes = c, r.range && (i[o[n]].minutes = c)) : /ss|s/.test(l) && (c < 1 && (c = 0, a = !0), e.seconds = c, r.range && (i[o[n]].seconds = c))
				}), c(e)
			};
		return "limit" === e ? (c(o), i) : (l = l || r.value, "string" == typeof l && (l = l.replace(/\s+/g, " ").replace(/^\s|\s$/g, "")), i.startState && !i.endState && (delete i.startState, i.endState = !0), "string" == typeof l && l ? i.EXP_IF.test(l) ? r.range ? (l = l.split(" " + r.range + " "), i.startDate = i.startDate || i.systemDate(), i.endDate = i.endDate || i.systemDate(), r.dateTime = T.extend({}, i.startDate), T.each([i.startDate, i.endDate], function(e, t) {
			m(t, l[e], e)
		})) : m(o, l) : (i.hint("日期格式不合法<br>必须遵循下述格式：<br>" + (r.range ? r.format + " " + r.range + " " + r.format : r.format) + "<br>已为你重置"), a = !0) : l && l.constructor === Date ? r.dateTime = i.systemDate(l) : (r.dateTime = i.systemDate(), delete i.startState, delete i.endState, delete i.startDate, delete i.endDate, delete i.startTime, delete i.endTime), c(o), a && l && i.setValue(r.range ? i.endDate ? i.parse() : "" : i.parse()), e && e(), i)
	}, D.prototype.mark = function(e, t) {
		var n, a = this,
			i = a.config;
		return T.each(i.mark, function(e, a) {
			var i = e.split("-");
			i[0] != t[0] && 0 != i[0] || i[1] != t[1] || i[2] != t[2] || (n = a || t[2])
		}), n && e.html('<span class="laydate-day-mark">' + n + "</span>"), a
	}, D.prototype.limit = function(e, t, n, a) {
		var i, r = this,
			o = r.config,
			l = {},
			d = o[n > 41 ? "endDate" : "dateTime"],
			c = T.extend({}, d, t || {});
		return T.each({
			now: c,
			min: o.min,
			max: o.max
		}, function(e, t) {
			l[e] = r.newDate(T.extend({
				year: t.year,
				month: t.month,
				date: t.date
			}, function() {
				var e = {};
				return T.each(a, function(n, a) {
					e[a] = t[a]
				}), e
			}())).getTime()
		}), i = l.now < l.min || l.now > l.max, e && e[i ? "addClass" : "removeClass"](s), i
	}, D.prototype.calendar = function(e) {
		var t, a, i, r = this,
			s = r.config,
			l = e || s.dateTime,
			c = new Date,
			m = r.lang(),
			u = "date" !== s.type && "datetime" !== s.type,
			h = e ? 1 : 0,
			y = T(r.table[h]).find("td"),
			f = T(r.elemHeader[h][2]).find("span");
		if(l.year < d[0] && (l.year = d[0], r.hint("最低只能支持到公元" + d[0] + "年")), l.year > d[1] && (l.year = d[1], r.hint("最高只能支持到公元" + d[1] + "年")), r.firstDate || (r.firstDate = T.extend({}, l)), c.setFullYear(l.year, l.month, 1), t = c.getDay(), a = n.getEndDate(l.month, l.year), i = n.getEndDate(l.month + 1, l.year), T.each(y, function(e, n) {
				var d = [l.year, l.month],
					c = 0;
				n = T(n), n.removeAttr("class"), e < t ? (c = a - t + e, n.addClass("laydate-day-prev"), d = r.getAsYM(l.year, l.month, "sub")) : e >= t && e < i + t ? (c = e - t, s.range || c + 1 === l.date && n.addClass(o)) : (c = e - i - t, n.addClass("laydate-day-next"), d = r.getAsYM(l.year, l.month)), d[1]++, d[2] = c + 1, n.attr("lay-ymd", d.join("-")).html(d[2]), r.mark(n, d).limit(n, {
					year: d[0],
					month: d[1] - 1,
					date: d[2]
				}, e)
			}), T(f[0]).attr("lay-ym", l.year + "-" + (l.month + 1)), T(f[1]).attr("lay-ym", l.year + "-" + (l.month + 1)), "cn" === s.lang ? (T(f[0]).attr("lay-type", "year").html(l.year + "年"), T(f[1]).attr("lay-type", "month").html(l.month + 1 + "月")) : (T(f[0]).attr("lay-type", "month").html(m.month[l.month]), T(f[1]).attr("lay-type", "year").html(l.year)), u && (s.range && (e ? r.endDate = r.endDate || {
				year: l.year + ("year" === s.type ? 1 : 0),
				month: l.month + ("month" === s.type ? 0 : -1)
			} : r.startDate = r.startDate || {
				year: l.year,
				month: l.month
			}, e && (r.listYM = [
				[r.startDate.year, r.startDate.month + 1],
				[r.endDate.year, r.endDate.month + 1]
			], r.list(s.type, 0).list(s.type, 1), "time" === s.type ? r.setBtnStatus("时间", T.extend({}, r.systemDate(), r.startTime), T.extend({}, r.systemDate(), r.endTime)) : r.setBtnStatus(!0))), s.range || (r.listYM = [
				[l.year, l.month + 1]
			], r.list(s.type, 0))), s.range && !e) {
			var g = r.getAsYM(l.year, l.month);
			r.calendar(T.extend({}, l, {
				year: g[0],
				month: g[1]
			}))
		}
		return s.range || r.limit(T(r.footer).find(p), null, 0, ["hours", "minutes", "seconds"]), s.range && e && !u && r.stampRange(), r
	}, D.prototype.list = function(e, t) {
		var n = this,
			a = n.config,
			i = a.dateTime,
			r = n.lang(),
			l = a.range && "date" !== a.type && "datetime" !== a.type,
			d = T.elem("ul", {
				"class": c + " " + {
					year: "laydate-year-list",
					month: "laydate-month-list",
					time: "laydate-time-list"
				}[e]
			}),
			m = n.elemHeader[t],
			u = T(m[2]).find("span"),
			h = n.elemCont[t || 0],
			y = T(h).find("." + c)[0],
			f = "cn" === a.lang,
			D = f ? "年" : "",
			w = n.listYM[t] || {},
			x = ["hours", "minutes", "seconds"],
			C = ["startTime", "endTime"][t];
		if(w[0] < 1 && (w[0] = 1), "year" === e) {
			var M, b = M = w[0] - 7;
			b < 1 && (b = M = 1), T.each(new Array(15), function(e) {
				var i = T.elem("li", {
						"lay-ym": M
					}),
					r = {
						year: M
					};
				M == w[0] && T(i).addClass(o), i.innerHTML = M + D, d.appendChild(i), M < n.firstDate.year ? (r.month = a.min.month, r.date = a.min.date) : M > n.firstDate.year && (r.month = a.max.month, r.date = a.max.date), n.limit(T(i), r, t), M++
			}), T(u[f ? 0 : 1]).attr("lay-ym", M - 8 + "-" + w[1]).html(b + D + " - " + (M - 1 + D))
		} else if("month" === e) T.each(new Array(12), function(e) {
			var i = T.elem("li", {
					"lay-ym": e
				}),
				s = {
					year: w[0],
					month: e
				};
			e + 1 == w[1] && T(i).addClass(o), i.innerHTML = r.month[e] + (f ? "月" : ""), d.appendChild(i), w[0] < n.firstDate.year ? s.date = a.min.date : w[0] > n.firstDate.year && (s.date = a.max.date), n.limit(T(i), s, t)
		}), T(u[f ? 0 : 1]).attr("lay-ym", w[0] + "-" + w[1]).html(w[0] + D);
		else if("time" === e) {
			var E = function() {
				T(d).find("ol").each(function(e, a) {
					T(a).find("li").each(function(a, i) {
						n.limit(T(i), [{
							hours: a
						}, {
							hours: n[C].hours,
							minutes: a
						}, {
							hours: n[C].hours,
							minutes: n[C].minutes,
							seconds: a
						}][e], t, [
							["hours"],
							["hours", "minutes"],
							["hours", "minutes", "seconds"]
						][e])
					})
				}), a.range || n.limit(T(n.footer).find(p), n[C], 0, ["hours", "minutes", "seconds"])
			};
			a.range ? n[C] || (n[C] = {
				hours: 0,
				minutes: 0,
				seconds: 0
			}) : n[C] = i, T.each([24, 60, 60], function(e, t) {
				var a = T.elem("li"),
					i = ["<p>" + r.time[e] + "</p><ol>"];
				T.each(new Array(t), function(t) {
					i.push("<li" + (n[C][x[e]] === t ? ' class="' + o + '"' : "") + ">" + T.digit(t, 2) + "</li>")
				}), a.innerHTML = i.join("") + "</ol>", d.appendChild(a)
			}), E()
		}
		if(y && h.removeChild(y), h.appendChild(d), "year" === e || "month" === e) T(n.elemMain[t]).addClass("laydate-ym-show"), T(d).find("li").on("click", function() {
			var r = 0 | T(this).attr("lay-ym");
			if(!T(this).hasClass(s)) {
				if(0 === t) i[e] = r, l && (n.startDate[e] = r);
				else if(l) n.endDate[e] = r;
				else {
					var c = "year" === e ? n.getAsYM(r, w[1] - 1, "sub") : n.getAsYM(w[0], r, "sub");
					T.extend(i, {
						year: c[0],
						month: c[1]
					})
				}
				"year" === a.type || "month" === a.type ? (T(d).find("." + o).removeClass(o), T(this).addClass(o), "month" === a.type && "year" === e && (n.listYM[t][0] = r, l && (n[["startDate", "endDate"][t]].year = r), n.list("month", t))) : (n.checkDate("limit").calendar(), n.closeList()), n.setBtnStatus(), a.range || n.done(null, "change"), T(n.footer).find(v).removeClass(s)
			}
		});
		else {
			var S = T.elem("span", {
					"class": g
				}),
				k = function() {
					T(d).find("ol").each(function(e) {
						var t = this,
							a = T(t).find("li");
						t.scrollTop = 30 * (n[C][x[e]] - 2), t.scrollTop <= 0 && a.each(function(e, n) {
							if(!T(this).hasClass(s)) return t.scrollTop = 30 * (e - 2), !0
						})
					})
				},
				H = T(m[2]).find("." + g);
			k(), S.innerHTML = a.range ? [r.startTime, r.endTime][t] : r.timeTips, T(n.elemMain[t]).addClass("laydate-time-show"), H[0] && H.remove(), m[2].appendChild(S), T(d).find("ol").each(function(e) {
				var t = this;
				T(t).find("li").on("click", function() {
					var r = 0 | this.innerHTML;
					T(this).hasClass(s) || (a.range ? n[C][x[e]] = r : i[x[e]] = r, T(t).find("." + o).removeClass(o), T(this).addClass(o), n.setBtnStatus(null, T.extend({}, n.systemDate(), n.startTime), T.extend({}, n.systemDate(), n.endTime)), E(), k(), (n.endDate || "time" === a.type) && n.done(null, "change"))
				})
			})
		}
		return n
	}, D.prototype.listYM = [], D.prototype.closeList = function() {
		var e = this;
		e.config;
		T.each(e.elemCont, function(t, n) {
			T(this).find("." + c).remove(), T(e.elemMain[t]).removeClass("laydate-ym-show laydate-time-show")
		}), T(e.elem).find("." + g).remove()
	}, D.prototype.setBtnStatus = function(e, t, n) {
		var a, i = this,
			r = i.config,
			o = T(i.footer).find(p),
			d = r.range && "date" !== r.type && "datetime" !== r.type;
		d && (t = t || i.startDate, n = n || i.endDate, a = i.newDate(t).getTime() > i.newDate(n).getTime(), i.limit(null, t) || i.limit(null, n) ? o.addClass(s) : o[a ? "addClass" : "removeClass"](s), e && a && i.hint("string" == typeof e ? l.replace(/日期/g, e) : l))
	}, D.prototype.parse = function(e) {
		var t = this,
			n = t.config,
			a = e ? T.extend({}, t.endDate, t.endTime) : n.range ? T.extend({}, t.startDate, t.startTime) : n.dateTime,
			i = t.format.concat();
		return T.each(i, function(e, t) {
			/yyyy|y/.test(t) ? i[e] = T.digit(a.year, t.length) : /MM|M/.test(t) ? i[e] = T.digit(a.month + 1, t.length) : /dd|d/.test(t) ? i[e] = T.digit(a.date, t.length) : /HH|H/.test(t) ? i[e] = T.digit(a.hours, t.length) : /mm|m/.test(t) ? i[e] = T.digit(a.minutes, t.length) : /ss|s/.test(t) && (i[e] = T.digit(a.seconds, t.length))
		}), n.range && !e ? i.join("") + " " + n.range + " " + t.parse(1) : i.join("")
	}, D.prototype.newDate = function(e) {
		return new Date(e.year || 1, e.month || 0, e.date || 1, e.hours || 0, e.minutes || 0, e.seconds || 0)
	}, D.prototype.setValue = function(e) {
		var t = this,
			n = t.config,
			a = t.bindElem || n.elem[0],
			i = t.isInput(a) ? "val" : "html";
		return "static" === n.position || T(a)[i](e || ""), this
	}, D.prototype.stampRange = function() {
		var e, t, n = this,
			a = n.config,
			i = T(n.elem).find("td");
		if(a.range && !n.endDate && T(n.footer).find(p).addClass(s), n.endDate) return e = n.newDate({
			year: n.startDate.year,
			month: n.startDate.month,
			date: n.startDate.date
		}).getTime(), t = n.newDate({
			year: n.endDate.year,
			month: n.endDate.month,
			date: n.endDate.date
		}).getTime(), e > t ? n.hint(l) : void T.each(i, function(a, i) {
			var r = T(i).attr("lay-ymd").split("-"),
				s = n.newDate({
					year: r[0],
					month: r[1] - 1,
					date: r[2]
				}).getTime();
			T(i).removeClass(m + " " + o), s !== e && s !== t || T(i).addClass(T(i).hasClass(h) || T(i).hasClass(y) ? m : o), s > e && s < t && T(i).addClass(m)
		})
	}, D.prototype.done = function(e, t) {
		var n = this,
			a = n.config,
			i = T.extend({}, n.startDate ? T.extend(n.startDate, n.startTime) : a.dateTime),
			r = T.extend({}, T.extend(n.endDate, n.endTime));
		return T.each([i, r], function(e, t) {
			"month" in t && T.extend(t, {
				month: t.month + 1
			})
		}), e = e || [n.parse(), i, r], "function" == typeof a[t || "done"] && a[t || "done"].apply(a, e), n
	}, D.prototype.choose = function(e) {
		var t = this,
			n = t.config,
			a = n.dateTime,
			i = T(t.elem).find("td"),
			r = e.attr("lay-ymd").split("-"),
			l = function(e) {
				new Date;
				e && T.extend(a, r), n.range && (t.startDate ? T.extend(t.startDate, r) : t.startDate = T.extend({}, r, t.startTime), t.startYMD = r)
			};
		if(r = {
				year: 0 | r[0],
				month: (0 | r[1]) - 1,
				date: 0 | r[2]
			}, !e.hasClass(s))
			if(n.range) {
				if(T.each(["startTime", "endTime"], function(e, n) {
						t[n] = t[n] || {
							hours: 0,
							minutes: 0,
							seconds: 0
						}
					}), t.endState) l(), delete t.endState, delete t.endDate, t.startState = !0, i.removeClass(o + " " + m), e.addClass(o);
				else if(t.startState) {
					if(e.addClass(o), t.endDate ? T.extend(t.endDate, r) : t.endDate = T.extend({}, r, t.endTime), t.newDate(r).getTime() < t.newDate(t.startYMD).getTime()) {
						var d = T.extend({}, t.endDate, {
							hours: t.startDate.hours,
							minutes: t.startDate.minutes,
							seconds: t.startDate.seconds
						});
						T.extend(t.endDate, t.startDate, {
							hours: t.endDate.hours,
							minutes: t.endDate.minutes,
							seconds: t.endDate.seconds
						}), t.startDate = d
					}
					n.showBottom || t.done(), t.stampRange(), t.endState = !0, t.done(null, "change")
				} else e.addClass(o), l(), t.startState = !0;
				T(t.footer).find(p)[t.endDate ? "removeClass" : "addClass"](s)
			} else "static" === n.position ? (l(!0), t.calendar().done().done(null, "change")) : "date" === n.type ? (l(!0), t.setValue(t.parse()).remove().done()) : "datetime" === n.type && (l(!0), t.calendar().done(null, "change"))
	}, D.prototype.tool = function(e, t) {
		var n = this,
			a = n.config,
			i = a.dateTime,
			r = "static" === a.position,
			o = {
				datetime: function() {
					T(e).hasClass(s) || (n.list("time", 0), a.range && n.list("time", 1), T(e).attr("lay-type", "date").html(n.lang().dateTips))
				},
				date: function() {
					n.closeList(), T(e).attr("lay-type", "datetime").html(n.lang().timeTips)
				},
				clear: function() {
					n.setValue("").remove(), r && (T.extend(i, n.firstDate), n.calendar()), a.range && (delete n.startState, delete n.endState, delete n.endDate, delete n.startTime, delete n.endTime), n.done(["", {}, {}])
				},
				now: function() {
					var e = new Date;
					T.extend(i, n.systemDate(), {
						hours: e.getHours(),
						minutes: e.getMinutes(),
						seconds: e.getSeconds()
					}), n.setValue(n.parse()).remove(), r && n.calendar(), n.done()
				},
				confirm: function() {
					if(a.range) {
						if(!n.endDate) return n.hint("请先选择日期范围");
						if(T(e).hasClass(s)) return n.hint("time" === a.type ? l.replace(/日期/g, "时间") : l)
					} else if(T(e).hasClass(s)) return n.hint("不在有效日期或时间范围内");
					n.done(), n.setValue(n.parse()).remove()
				}
			};
		o[t] && o[t]()
	}, D.prototype.change = function(e) {
		var t = this,
			n = t.config,
			a = n.dateTime,
			i = n.range && ("year" === n.type || "month" === n.type),
			r = t.elemCont[e || 0],
			o = t.listYM[e],
			s = function(s) {
				var l = ["startDate", "endDate"][e],
					d = T(r).find(".laydate-year-list")[0],
					c = T(r).find(".laydate-month-list")[0];
				return d && (o[0] = s ? o[0] - 15 : o[0] + 15, t.list("year", e)), c && (s ? o[0]-- : o[0]++, t.list("month", e)), (d || c) && (T.extend(a, {
					year: o[0]
				}), i && (t[l].year = o[0]), n.range || t.done(null, "change"), t.setBtnStatus(), n.range || t.limit(T(t.footer).find(p), {
					year: o[0]
				})), d || c
			};
		return {
			prevYear: function() {
				s("sub") || (a.year--, t.checkDate("limit").calendar(), n.range || t.done(null, "change"))
			},
			prevMonth: function() {
				var e = t.getAsYM(a.year, a.month, "sub");
				T.extend(a, {
					year: e[0],
					month: e[1]
				}), t.checkDate("limit").calendar(), n.range || t.done(null, "change")
			},
			nextMonth: function() {
				var e = t.getAsYM(a.year, a.month);
				T.extend(a, {
					year: e[0],
					month: e[1]
				}), t.checkDate("limit").calendar(), n.range || t.done(null, "change")
			},
			nextYear: function() {
				s() || (a.year++, t.checkDate("limit").calendar(), n.range || t.done(null, "change"))
			}
		}
	}, D.prototype.changeEvent = function() {
		var e = this;
		e.config;
		T(e.elem).on("click", function(e) {
			T.stope(e)
		}), T.each(e.elemHeader, function(t, n) {
			T(n[0]).on("click", function(n) {
				e.change(t).prevYear()
			}), T(n[1]).on("click", function(n) {
				e.change(t).prevMonth()
			}), T(n[2]).find("span").on("click", function(n) {
				var a = T(this),
					i = a.attr("lay-ym"),
					r = a.attr("lay-type");
				i && (i = i.split("-"), e.listYM[t] = [0 | i[0], 0 | i[1]], e.list(r, t), T(e.footer).find(v).addClass(s))
			}), T(n[3]).on("click", function(n) {
				e.change(t).nextMonth()
			}), T(n[4]).on("click", function(n) {
				e.change(t).nextYear()
			})
		}), T.each(e.table, function(t, n) {
			var a = T(n).find("td");
			a.on("click", function() {
				e.choose(T(this))
			})
		}), T(e.footer).find("span").on("click", function() {
			var t = T(this).attr("lay-type");
			e.tool(this, t)
		})
	}, D.prototype.isInput = function(e) {
		return /input|textarea/.test(e.tagName.toLocaleLowerCase())
	}, D.prototype.events = function() {
		var e = this,
			t = e.config,
			n = function(n, a) {
				n.on(t.trigger, function() {
					a && (e.bindElem = this), e.render()
				})
			};
		t.elem[0] && !t.elem[0].eventHandler && (n(t.elem, "bind"), n(t.eventElem), T(document).on("click", function(n) {
			n.target !== t.elem[0] && n.target !== t.eventElem[0] && n.target !== T(t.closeStop)[0] && e.remove()
		}).on("keydown", function(t) {
			13 === t.keyCode && T("#" + e.elemID)[0] && e.elemID === D.thisElem && (t.preventDefault(), T(e.footer).find(p)[0].click())
		}), T(window).on("resize", function() {
			return !(!e.elem || !T(r)[0]) && void e.position()
		}), t.elem[0].eventHandler = !0)
	}, n.render = function(e) {
		var t = new D(e);
		return a.call(t)
	}, n.getEndDate = function(e, t) {
		var n = new Date;
		return n.setFullYear(t || n.getFullYear(), e || n.getMonth() + 1, 1), new Date(n.getTime() - 864e5).getDate()
	}, window.lay = window.lay || T, e ? (n.ready(), layui.define(function(e) {
		n.path = layui.cache.dir, e(i, n)
	})) : "function" == typeof define && define.amd ? define(function() {
		return n
	}) : function() {
		n.ready(), window.laydate = n
	}()
}();
