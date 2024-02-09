var tamtam;
(() => {
    var t = {
            550: function (t, i, e) {
                !(function (t, i) {
                    "use strict";
                    function n(t, i) {
                        if (!t) throw new Error(i || "Assertion failed");
                    }
                    function r(t, i) {
                        t.super_ = i;
                        var e = function () {};
                        (e.prototype = i.prototype), (t.prototype = new e()), (t.prototype.constructor = t);
                    }
                    function o(t, i, e) {
                        if (o.isBN(t)) return t;
                        (this.negative = 0), (this.words = null), (this.length = 0), (this.red = null), null !== t && (("le" !== i && "be" !== i) || ((e = i), (i = 10)), this._init(t || 0, i || 10, e || "be"));
                    }
                    var s;
                    "object" == typeof t ? (t.exports = o) : (i.BN = o), (o.BN = o), (o.wordSize = 26);
                    try {
                        s = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : e(601).Buffer;
                    } catch (t) {}
                    function h(t, i) {
                        var e = t.charCodeAt(i);
                        return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : void n(!1, "Invalid character in " + t);
                    }
                    function u(t, i, e) {
                        var n = h(t, e);
                        return e - 1 >= i && (n |= h(t, e - 1) << 4), n;
                    }
                    function a(t, i, e, r) {
                        for (var o = 0, s = 0, h = Math.min(t.length, e), u = i; u < h; u++) {
                            var a = t.charCodeAt(u) - 48;
                            (o *= r), (s = a >= 49 ? a - 49 + 10 : a >= 17 ? a - 17 + 10 : a), n(a >= 0 && s < r, "Invalid character"), (o += s);
                        }
                        return o;
                    }
                    function l(t, i) {
                        (t.words = i.words), (t.length = i.length), (t.negative = i.negative), (t.red = i.red);
                    }
                    if (
                        ((o.isBN = function (t) {
                            return t instanceof o || (null !== t && "object" == typeof t && t.constructor.wordSize === o.wordSize && Array.isArray(t.words));
                        }),
                        (o.max = function (t, i) {
                            return t.cmp(i) > 0 ? t : i;
                        }),
                        (o.min = function (t, i) {
                            return t.cmp(i) < 0 ? t : i;
                        }),
                        (o.prototype._init = function (t, i, e) {
                            if ("number" == typeof t) return this._initNumber(t, i, e);
                            if ("object" == typeof t) return this._initArray(t, i, e);
                            "hex" === i && (i = 16), n(i === (0 | i) && i >= 2 && i <= 36);
                            var r = 0;
                            "-" === (t = t.toString().replace(/\s+/g, ""))[0] && (r++, (this.negative = 1)), r < t.length && (16 === i ? this._parseHex(t, r, e) : (this._parseBase(t, i, r), "le" === e && this._initArray(this.toArray(), i, e)));
                        }),
                        (o.prototype._initNumber = function (t, i, e) {
                            t < 0 && ((this.negative = 1), (t = -t)),
                                t < 67108864 ? ((this.words = [67108863 & t]), (this.length = 1)) : t < 4503599627370496 ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]), (this.length = 2)) : (n(t < 9007199254740992), (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]), (this.length = 3)),
                                "le" === e && this._initArray(this.toArray(), i, e);
                        }),
                        (o.prototype._initArray = function (t, i, e) {
                            if ((n("number" == typeof t.length), t.length <= 0)) return (this.words = [0]), (this.length = 1), this;
                            (this.length = Math.ceil(t.length / 3)), (this.words = new Array(this.length));
                            for (var r = 0; r < this.length; r++) this.words[r] = 0;
                            var o,
                                s,
                                h = 0;
                            if ("be" === e) for (r = t.length - 1, o = 0; r >= 0; r -= 3) (s = t[r] | (t[r - 1] << 8) | (t[r - 2] << 16)), (this.words[o] |= (s << h) & 67108863), (this.words[o + 1] = (s >>> (26 - h)) & 67108863), (h += 24) >= 26 && ((h -= 26), o++);
                            else if ("le" === e) for (r = 0, o = 0; r < t.length; r += 3) (s = t[r] | (t[r + 1] << 8) | (t[r + 2] << 16)), (this.words[o] |= (s << h) & 67108863), (this.words[o + 1] = (s >>> (26 - h)) & 67108863), (h += 24) >= 26 && ((h -= 26), o++);
                            return this._strip();
                        }),
                        (o.prototype._parseHex = function (t, i, e) {
                            (this.length = Math.ceil((t.length - i) / 6)), (this.words = new Array(this.length));
                            for (var n = 0; n < this.length; n++) this.words[n] = 0;
                            var r,
                                o = 0,
                                s = 0;
                            if ("be" === e) for (n = t.length - 1; n >= i; n -= 2) (r = u(t, i, n) << o), (this.words[s] |= 67108863 & r), o >= 18 ? ((o -= 18), (s += 1), (this.words[s] |= r >>> 26)) : (o += 8);
                            else for (n = (t.length - i) % 2 == 0 ? i + 1 : i; n < t.length; n += 2) (r = u(t, i, n) << o), (this.words[s] |= 67108863 & r), o >= 18 ? ((o -= 18), (s += 1), (this.words[s] |= r >>> 26)) : (o += 8);
                            this._strip();
                        }),
                        (o.prototype._parseBase = function (t, i, e) {
                            (this.words = [0]), (this.length = 1);
                            for (var n = 0, r = 1; r <= 67108863; r *= i) n++;
                            n--, (r = (r / i) | 0);
                            for (var o = t.length - e, s = o % n, h = Math.min(o, o - s) + e, u = 0, l = e; l < h; l += n) (u = a(t, l, l + n, i)), this.imuln(r), this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
                            if (0 !== s) {
                                var m = 1;
                                for (u = a(t, l, t.length, i), l = 0; l < s; l++) m *= i;
                                this.imuln(m), this.words[0] + u < 67108864 ? (this.words[0] += u) : this._iaddn(u);
                            }
                            this._strip();
                        }),
                        (o.prototype.copy = function (t) {
                            t.words = new Array(this.length);
                            for (var i = 0; i < this.length; i++) t.words[i] = this.words[i];
                            (t.length = this.length), (t.negative = this.negative), (t.red = this.red);
                        }),
                        (o.prototype._move = function (t) {
                            l(t, this);
                        }),
                        (o.prototype.clone = function () {
                            var t = new o(null);
                            return this.copy(t), t;
                        }),
                        (o.prototype._expand = function (t) {
                            for (; this.length < t; ) this.words[this.length++] = 0;
                            return this;
                        }),
                        (o.prototype._strip = function () {
                            for (; this.length > 1 && 0 === this.words[this.length - 1]; ) this.length--;
                            return this._normSign();
                        }),
                        (o.prototype._normSign = function () {
                            return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this;
                        }),
                        "undefined" != typeof Symbol && "function" == typeof Symbol.for)
                    )
                        try {
                            o.prototype[Symbol.for("nodejs.util.inspect.custom")] = m;
                        } catch (t) {
                            o.prototype.inspect = m;
                        }
                    else o.prototype.inspect = m;
                    function m() {
                        return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
                    }
                    var p = [
                            "",
                            "0",
                            "00",
                            "000",
                            "0000",
                            "00000",
                            "000000",
                            "0000000",
                            "00000000",
                            "000000000",
                            "0000000000",
                            "00000000000",
                            "000000000000",
                            "0000000000000",
                            "00000000000000",
                            "000000000000000",
                            "0000000000000000",
                            "00000000000000000",
                            "000000000000000000",
                            "0000000000000000000",
                            "00000000000000000000",
                            "000000000000000000000",
                            "0000000000000000000000",
                            "00000000000000000000000",
                            "000000000000000000000000",
                            "0000000000000000000000000",
                        ],
                        f = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                        d = [
                            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151,
                            33554432, 39135393, 45435424, 52521875, 60466176,
                        ];
                    function c(t, i, e) {
                        e.negative = i.negative ^ t.negative;
                        var n = (t.length + i.length) | 0;
                        (e.length = n), (n = (n - 1) | 0);
                        var r = 0 | t.words[0],
                            o = 0 | i.words[0],
                            s = r * o,
                            h = 67108863 & s,
                            u = (s / 67108864) | 0;
                        e.words[0] = h;
                        for (var a = 1; a < n; a++) {
                            for (var l = u >>> 26, m = 67108863 & u, p = Math.min(a, i.length - 1), f = Math.max(0, a - t.length + 1); f <= p; f++) {
                                var d = (a - f) | 0;
                                (l += ((s = (r = 0 | t.words[d]) * (o = 0 | i.words[f]) + m) / 67108864) | 0), (m = 67108863 & s);
                            }
                            (e.words[a] = 0 | m), (u = 0 | l);
                        }
                        return 0 !== u ? (e.words[a] = 0 | u) : e.length--, e._strip();
                    }
                    (o.prototype.toString = function (t, i) {
                        var e;
                        if (((i = 0 | i || 1), 16 === (t = t || 10) || "hex" === t)) {
                            e = "";
                            for (var r = 0, o = 0, s = 0; s < this.length; s++) {
                                var h = this.words[s],
                                    u = (16777215 & ((h << r) | o)).toString(16);
                                (e = 0 != (o = (h >>> (24 - r)) & 16777215) || s !== this.length - 1 ? p[6 - u.length] + u + e : u + e), (r += 2) >= 26 && ((r -= 26), s--);
                            }
                            for (0 !== o && (e = o.toString(16) + e); e.length % i != 0; ) e = "0" + e;
                            return 0 !== this.negative && (e = "-" + e), e;
                        }
                        if (t === (0 | t) && t >= 2 && t <= 36) {
                            var a = f[t],
                                l = d[t];
                            e = "";
                            var m = this.clone();
                            for (m.negative = 0; !m.isZero(); ) {
                                var c = m.modrn(l).toString(t);
                                e = (m = m.idivn(l)).isZero() ? c + e : p[a - c.length] + c + e;
                            }
                            for (this.isZero() && (e = "0" + e); e.length % i != 0; ) e = "0" + e;
                            return 0 !== this.negative && (e = "-" + e), e;
                        }
                        n(!1, "Base should be between 2 and 36");
                    }),
                        (o.prototype.toNumber = function () {
                            var t = this.words[0];
                            return 2 === this.length ? (t += 67108864 * this.words[1]) : 3 === this.length && 1 === this.words[2] ? (t += 4503599627370496 + 67108864 * this.words[1]) : this.length > 2 && n(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -t : t;
                        }),
                        (o.prototype.toJSON = function () {
                            return this.toString(16, 2);
                        }),
                        s &&
                            (o.prototype.toBuffer = function (t, i) {
                                return this.toArrayLike(s, t, i);
                            }),
                        (o.prototype.toArray = function (t, i) {
                            return this.toArrayLike(Array, t, i);
                        }),
                        (o.prototype.toArrayLike = function (t, i, e) {
                            this._strip();
                            var r = this.byteLength(),
                                o = e || Math.max(1, r);
                            n(r <= o, "byte array longer than desired length"), n(o > 0, "Requested array length <= 0");
                            var s = (function (t, i) {
                                return t.allocUnsafe ? t.allocUnsafe(i) : new t(i);
                            })(t, o);
                            return this["_toArrayLike" + ("le" === i ? "LE" : "BE")](s, r), s;
                        }),
                        (o.prototype._toArrayLikeLE = function (t, i) {
                            for (var e = 0, n = 0, r = 0, o = 0; r < this.length; r++) {
                                var s = (this.words[r] << o) | n;
                                (t[e++] = 255 & s), e < t.length && (t[e++] = (s >> 8) & 255), e < t.length && (t[e++] = (s >> 16) & 255), 6 === o ? (e < t.length && (t[e++] = (s >> 24) & 255), (n = 0), (o = 0)) : ((n = s >>> 24), (o += 2));
                            }
                            if (e < t.length) for (t[e++] = n; e < t.length; ) t[e++] = 0;
                        }),
                        (o.prototype._toArrayLikeBE = function (t, i) {
                            for (var e = t.length - 1, n = 0, r = 0, o = 0; r < this.length; r++) {
                                var s = (this.words[r] << o) | n;
                                (t[e--] = 255 & s), e >= 0 && (t[e--] = (s >> 8) & 255), e >= 0 && (t[e--] = (s >> 16) & 255), 6 === o ? (e >= 0 && (t[e--] = (s >> 24) & 255), (n = 0), (o = 0)) : ((n = s >>> 24), (o += 2));
                            }
                            if (e >= 0) for (t[e--] = n; e >= 0; ) t[e--] = 0;
                        }),
                        Math.clz32
                            ? (o.prototype._countBits = function (t) {
                                  return 32 - Math.clz32(t);
                              })
                            : (o.prototype._countBits = function (t) {
                                  var i = t,
                                      e = 0;
                                  return i >= 4096 && ((e += 13), (i >>>= 13)), i >= 64 && ((e += 7), (i >>>= 7)), i >= 8 && ((e += 4), (i >>>= 4)), i >= 2 && ((e += 2), (i >>>= 2)), e + i;
                              }),
                        (o.prototype._zeroBits = function (t) {
                            if (0 === t) return 26;
                            var i = t,
                                e = 0;
                            return 0 == (8191 & i) && ((e += 13), (i >>>= 13)), 0 == (127 & i) && ((e += 7), (i >>>= 7)), 0 == (15 & i) && ((e += 4), (i >>>= 4)), 0 == (3 & i) && ((e += 2), (i >>>= 2)), 0 == (1 & i) && e++, e;
                        }),
                        (o.prototype.bitLength = function () {
                            var t = this.words[this.length - 1],
                                i = this._countBits(t);
                            return 26 * (this.length - 1) + i;
                        }),
                        (o.prototype.zeroBits = function () {
                            if (this.isZero()) return 0;
                            for (var t = 0, i = 0; i < this.length; i++) {
                                var e = this._zeroBits(this.words[i]);
                                if (((t += e), 26 !== e)) break;
                            }
                            return t;
                        }),
                        (o.prototype.byteLength = function () {
                            return Math.ceil(this.bitLength() / 8);
                        }),
                        (o.prototype.toTwos = function (t) {
                            return 0 !== this.negative ? this.abs().inotn(t).iaddn(1) : this.clone();
                        }),
                        (o.prototype.fromTwos = function (t) {
                            return this.testn(t - 1) ? this.notn(t).iaddn(1).ineg() : this.clone();
                        }),
                        (o.prototype.isNeg = function () {
                            return 0 !== this.negative;
                        }),
                        (o.prototype.neg = function () {
                            return this.clone().ineg();
                        }),
                        (o.prototype.ineg = function () {
                            return this.isZero() || (this.negative ^= 1), this;
                        }),
                        (o.prototype.iuor = function (t) {
                            for (; this.length < t.length; ) this.words[this.length++] = 0;
                            for (var i = 0; i < t.length; i++) this.words[i] = this.words[i] | t.words[i];
                            return this._strip();
                        }),
                        (o.prototype.ior = function (t) {
                            return n(0 == (this.negative | t.negative)), this.iuor(t);
                        }),
                        (o.prototype.or = function (t) {
                            return this.length > t.length ? this.clone().ior(t) : t.clone().ior(this);
                        }),
                        (o.prototype.uor = function (t) {
                            return this.length > t.length ? this.clone().iuor(t) : t.clone().iuor(this);
                        }),
                        (o.prototype.iuand = function (t) {
                            var i;
                            i = this.length > t.length ? t : this;
                            for (var e = 0; e < i.length; e++) this.words[e] = this.words[e] & t.words[e];
                            return (this.length = i.length), this._strip();
                        }),
                        (o.prototype.iand = function (t) {
                            return n(0 == (this.negative | t.negative)), this.iuand(t);
                        }),
                        (o.prototype.and = function (t) {
                            return this.length > t.length ? this.clone().iand(t) : t.clone().iand(this);
                        }),
                        (o.prototype.uand = function (t) {
                            return this.length > t.length ? this.clone().iuand(t) : t.clone().iuand(this);
                        }),
                        (o.prototype.iuxor = function (t) {
                            var i, e;
                            this.length > t.length ? ((i = this), (e = t)) : ((i = t), (e = this));
                            for (var n = 0; n < e.length; n++) this.words[n] = i.words[n] ^ e.words[n];
                            if (this !== i) for (; n < i.length; n++) this.words[n] = i.words[n];
                            return (this.length = i.length), this._strip();
                        }),
                        (o.prototype.ixor = function (t) {
                            return n(0 == (this.negative | t.negative)), this.iuxor(t);
                        }),
                        (o.prototype.xor = function (t) {
                            return this.length > t.length ? this.clone().ixor(t) : t.clone().ixor(this);
                        }),
                        (o.prototype.uxor = function (t) {
                            return this.length > t.length ? this.clone().iuxor(t) : t.clone().iuxor(this);
                        }),
                        (o.prototype.inotn = function (t) {
                            n("number" == typeof t && t >= 0);
                            var i = 0 | Math.ceil(t / 26),
                                e = t % 26;
                            this._expand(i), e > 0 && i--;
                            for (var r = 0; r < i; r++) this.words[r] = 67108863 & ~this.words[r];
                            return e > 0 && (this.words[r] = ~this.words[r] & (67108863 >> (26 - e))), this._strip();
                        }),
                        (o.prototype.notn = function (t) {
                            return this.clone().inotn(t);
                        }),
                        (o.prototype.setn = function (t, i) {
                            n("number" == typeof t && t >= 0);
                            var e = (t / 26) | 0,
                                r = t % 26;
                            return this._expand(e + 1), (this.words[e] = i ? this.words[e] | (1 << r) : this.words[e] & ~(1 << r)), this._strip();
                        }),
                        (o.prototype.iadd = function (t) {
                            var i, e, n;
                            if (0 !== this.negative && 0 === t.negative) return (this.negative = 0), (i = this.isub(t)), (this.negative ^= 1), this._normSign();
                            if (0 === this.negative && 0 !== t.negative) return (t.negative = 0), (i = this.isub(t)), (t.negative = 1), i._normSign();
                            this.length > t.length ? ((e = this), (n = t)) : ((e = t), (n = this));
                            for (var r = 0, o = 0; o < n.length; o++) (i = (0 | e.words[o]) + (0 | n.words[o]) + r), (this.words[o] = 67108863 & i), (r = i >>> 26);
                            for (; 0 !== r && o < e.length; o++) (i = (0 | e.words[o]) + r), (this.words[o] = 67108863 & i), (r = i >>> 26);
                            if (((this.length = e.length), 0 !== r)) (this.words[this.length] = r), this.length++;
                            else if (e !== this) for (; o < e.length; o++) this.words[o] = e.words[o];
                            return this;
                        }),
                        (o.prototype.add = function (t) {
                            var i;
                            return 0 !== t.negative && 0 === this.negative ? ((t.negative = 0), (i = this.sub(t)), (t.negative ^= 1), i) : 0 === t.negative && 0 !== this.negative ? ((this.negative = 0), (i = t.sub(this)), (this.negative = 1), i) : this.length > t.length ? this.clone().iadd(t) : t.clone().iadd(this);
                        }),
                        (o.prototype.isub = function (t) {
                            if (0 !== t.negative) {
                                t.negative = 0;
                                var i = this.iadd(t);
                                return (t.negative = 1), i._normSign();
                            }
                            if (0 !== this.negative) return (this.negative = 0), this.iadd(t), (this.negative = 1), this._normSign();
                            var e,
                                n,
                                r = this.cmp(t);
                            if (0 === r) return (this.negative = 0), (this.length = 1), (this.words[0] = 0), this;
                            r > 0 ? ((e = this), (n = t)) : ((e = t), (n = this));
                            for (var o = 0, s = 0; s < n.length; s++) (o = (i = (0 | e.words[s]) - (0 | n.words[s]) + o) >> 26), (this.words[s] = 67108863 & i);
                            for (; 0 !== o && s < e.length; s++) (o = (i = (0 | e.words[s]) + o) >> 26), (this.words[s] = 67108863 & i);
                            if (0 === o && s < e.length && e !== this) for (; s < e.length; s++) this.words[s] = e.words[s];
                            return (this.length = Math.max(this.length, s)), e !== this && (this.negative = 1), this._strip();
                        }),
                        (o.prototype.sub = function (t) {
                            return this.clone().isub(t);
                        });
                    var y = function (t, i, e) {
                        var n,
                            r,
                            o,
                            s = t.words,
                            h = i.words,
                            u = e.words,
                            a = 0,
                            l = 0 | s[0],
                            m = 8191 & l,
                            p = l >>> 13,
                            f = 0 | s[1],
                            d = 8191 & f,
                            c = f >>> 13,
                            y = 0 | s[2],
                            v = 8191 & y,
                            M = y >>> 13,
                            g = 0 | s[3],
                            w = 8191 & g,
                            b = g >>> 13,
                            _ = 0 | s[4],
                            T = 8191 & _,
                            k = _ >>> 13,
                            S = 0 | s[5],
                            x = 8191 & S,
                            A = S >>> 13,
                            I = 0 | s[6],
                            F = 8191 & I,
                            N = I >>> 13,
                            O = 0 | s[7],
                            R = 8191 & O,
                            B = O >>> 13,
                            q = 0 | s[8],
                            Z = 8191 & q,
                            L = q >>> 13,
                            E = 0 | s[9],
                            j = 8191 & E,
                            P = E >>> 13,
                            z = 0 | h[0],
                            C = 8191 & z,
                            K = z >>> 13,
                            U = 0 | h[1],
                            D = 8191 & U,
                            H = U >>> 13,
                            J = 0 | h[2],
                            G = 8191 & J,
                            V = J >>> 13,
                            Q = 0 | h[3],
                            W = 8191 & Q,
                            X = Q >>> 13,
                            Y = 0 | h[4],
                            $ = 8191 & Y,
                            tt = Y >>> 13,
                            it = 0 | h[5],
                            et = 8191 & it,
                            nt = it >>> 13,
                            rt = 0 | h[6],
                            ot = 8191 & rt,
                            st = rt >>> 13,
                            ht = 0 | h[7],
                            ut = 8191 & ht,
                            at = ht >>> 13,
                            lt = 0 | h[8],
                            mt = 8191 & lt,
                            pt = lt >>> 13,
                            ft = 0 | h[9],
                            dt = 8191 & ft,
                            ct = ft >>> 13;
                        (e.negative = t.negative ^ i.negative), (e.length = 19);
                        var yt = (((a + (n = Math.imul(m, C))) | 0) + ((8191 & (r = ((r = Math.imul(m, K)) + Math.imul(p, C)) | 0)) << 13)) | 0;
                        (a = ((((o = Math.imul(p, K)) + (r >>> 13)) | 0) + (yt >>> 26)) | 0), (yt &= 67108863), (n = Math.imul(d, C)), (r = ((r = Math.imul(d, K)) + Math.imul(c, C)) | 0), (o = Math.imul(c, K));
                        var vt = (((a + (n = (n + Math.imul(m, D)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, H)) | 0) + Math.imul(p, D)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, H)) | 0) + (r >>> 13)) | 0) + (vt >>> 26)) | 0),
                            (vt &= 67108863),
                            (n = Math.imul(v, C)),
                            (r = ((r = Math.imul(v, K)) + Math.imul(M, C)) | 0),
                            (o = Math.imul(M, K)),
                            (n = (n + Math.imul(d, D)) | 0),
                            (r = ((r = (r + Math.imul(d, H)) | 0) + Math.imul(c, D)) | 0),
                            (o = (o + Math.imul(c, H)) | 0);
                        var Mt = (((a + (n = (n + Math.imul(m, G)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, V)) | 0) + Math.imul(p, G)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, V)) | 0) + (r >>> 13)) | 0) + (Mt >>> 26)) | 0),
                            (Mt &= 67108863),
                            (n = Math.imul(w, C)),
                            (r = ((r = Math.imul(w, K)) + Math.imul(b, C)) | 0),
                            (o = Math.imul(b, K)),
                            (n = (n + Math.imul(v, D)) | 0),
                            (r = ((r = (r + Math.imul(v, H)) | 0) + Math.imul(M, D)) | 0),
                            (o = (o + Math.imul(M, H)) | 0),
                            (n = (n + Math.imul(d, G)) | 0),
                            (r = ((r = (r + Math.imul(d, V)) | 0) + Math.imul(c, G)) | 0),
                            (o = (o + Math.imul(c, V)) | 0);
                        var gt = (((a + (n = (n + Math.imul(m, W)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, X)) | 0) + Math.imul(p, W)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, X)) | 0) + (r >>> 13)) | 0) + (gt >>> 26)) | 0),
                            (gt &= 67108863),
                            (n = Math.imul(T, C)),
                            (r = ((r = Math.imul(T, K)) + Math.imul(k, C)) | 0),
                            (o = Math.imul(k, K)),
                            (n = (n + Math.imul(w, D)) | 0),
                            (r = ((r = (r + Math.imul(w, H)) | 0) + Math.imul(b, D)) | 0),
                            (o = (o + Math.imul(b, H)) | 0),
                            (n = (n + Math.imul(v, G)) | 0),
                            (r = ((r = (r + Math.imul(v, V)) | 0) + Math.imul(M, G)) | 0),
                            (o = (o + Math.imul(M, V)) | 0),
                            (n = (n + Math.imul(d, W)) | 0),
                            (r = ((r = (r + Math.imul(d, X)) | 0) + Math.imul(c, W)) | 0),
                            (o = (o + Math.imul(c, X)) | 0);
                        var wt = (((a + (n = (n + Math.imul(m, $)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, tt)) | 0) + Math.imul(p, $)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, tt)) | 0) + (r >>> 13)) | 0) + (wt >>> 26)) | 0),
                            (wt &= 67108863),
                            (n = Math.imul(x, C)),
                            (r = ((r = Math.imul(x, K)) + Math.imul(A, C)) | 0),
                            (o = Math.imul(A, K)),
                            (n = (n + Math.imul(T, D)) | 0),
                            (r = ((r = (r + Math.imul(T, H)) | 0) + Math.imul(k, D)) | 0),
                            (o = (o + Math.imul(k, H)) | 0),
                            (n = (n + Math.imul(w, G)) | 0),
                            (r = ((r = (r + Math.imul(w, V)) | 0) + Math.imul(b, G)) | 0),
                            (o = (o + Math.imul(b, V)) | 0),
                            (n = (n + Math.imul(v, W)) | 0),
                            (r = ((r = (r + Math.imul(v, X)) | 0) + Math.imul(M, W)) | 0),
                            (o = (o + Math.imul(M, X)) | 0),
                            (n = (n + Math.imul(d, $)) | 0),
                            (r = ((r = (r + Math.imul(d, tt)) | 0) + Math.imul(c, $)) | 0),
                            (o = (o + Math.imul(c, tt)) | 0);
                        var bt = (((a + (n = (n + Math.imul(m, et)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, nt)) | 0) + Math.imul(p, et)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, nt)) | 0) + (r >>> 13)) | 0) + (bt >>> 26)) | 0),
                            (bt &= 67108863),
                            (n = Math.imul(F, C)),
                            (r = ((r = Math.imul(F, K)) + Math.imul(N, C)) | 0),
                            (o = Math.imul(N, K)),
                            (n = (n + Math.imul(x, D)) | 0),
                            (r = ((r = (r + Math.imul(x, H)) | 0) + Math.imul(A, D)) | 0),
                            (o = (o + Math.imul(A, H)) | 0),
                            (n = (n + Math.imul(T, G)) | 0),
                            (r = ((r = (r + Math.imul(T, V)) | 0) + Math.imul(k, G)) | 0),
                            (o = (o + Math.imul(k, V)) | 0),
                            (n = (n + Math.imul(w, W)) | 0),
                            (r = ((r = (r + Math.imul(w, X)) | 0) + Math.imul(b, W)) | 0),
                            (o = (o + Math.imul(b, X)) | 0),
                            (n = (n + Math.imul(v, $)) | 0),
                            (r = ((r = (r + Math.imul(v, tt)) | 0) + Math.imul(M, $)) | 0),
                            (o = (o + Math.imul(M, tt)) | 0),
                            (n = (n + Math.imul(d, et)) | 0),
                            (r = ((r = (r + Math.imul(d, nt)) | 0) + Math.imul(c, et)) | 0),
                            (o = (o + Math.imul(c, nt)) | 0);
                        var _t = (((a + (n = (n + Math.imul(m, ot)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, st)) | 0) + Math.imul(p, ot)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, st)) | 0) + (r >>> 13)) | 0) + (_t >>> 26)) | 0),
                            (_t &= 67108863),
                            (n = Math.imul(R, C)),
                            (r = ((r = Math.imul(R, K)) + Math.imul(B, C)) | 0),
                            (o = Math.imul(B, K)),
                            (n = (n + Math.imul(F, D)) | 0),
                            (r = ((r = (r + Math.imul(F, H)) | 0) + Math.imul(N, D)) | 0),
                            (o = (o + Math.imul(N, H)) | 0),
                            (n = (n + Math.imul(x, G)) | 0),
                            (r = ((r = (r + Math.imul(x, V)) | 0) + Math.imul(A, G)) | 0),
                            (o = (o + Math.imul(A, V)) | 0),
                            (n = (n + Math.imul(T, W)) | 0),
                            (r = ((r = (r + Math.imul(T, X)) | 0) + Math.imul(k, W)) | 0),
                            (o = (o + Math.imul(k, X)) | 0),
                            (n = (n + Math.imul(w, $)) | 0),
                            (r = ((r = (r + Math.imul(w, tt)) | 0) + Math.imul(b, $)) | 0),
                            (o = (o + Math.imul(b, tt)) | 0),
                            (n = (n + Math.imul(v, et)) | 0),
                            (r = ((r = (r + Math.imul(v, nt)) | 0) + Math.imul(M, et)) | 0),
                            (o = (o + Math.imul(M, nt)) | 0),
                            (n = (n + Math.imul(d, ot)) | 0),
                            (r = ((r = (r + Math.imul(d, st)) | 0) + Math.imul(c, ot)) | 0),
                            (o = (o + Math.imul(c, st)) | 0);
                        var Tt = (((a + (n = (n + Math.imul(m, ut)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, at)) | 0) + Math.imul(p, ut)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, at)) | 0) + (r >>> 13)) | 0) + (Tt >>> 26)) | 0),
                            (Tt &= 67108863),
                            (n = Math.imul(Z, C)),
                            (r = ((r = Math.imul(Z, K)) + Math.imul(L, C)) | 0),
                            (o = Math.imul(L, K)),
                            (n = (n + Math.imul(R, D)) | 0),
                            (r = ((r = (r + Math.imul(R, H)) | 0) + Math.imul(B, D)) | 0),
                            (o = (o + Math.imul(B, H)) | 0),
                            (n = (n + Math.imul(F, G)) | 0),
                            (r = ((r = (r + Math.imul(F, V)) | 0) + Math.imul(N, G)) | 0),
                            (o = (o + Math.imul(N, V)) | 0),
                            (n = (n + Math.imul(x, W)) | 0),
                            (r = ((r = (r + Math.imul(x, X)) | 0) + Math.imul(A, W)) | 0),
                            (o = (o + Math.imul(A, X)) | 0),
                            (n = (n + Math.imul(T, $)) | 0),
                            (r = ((r = (r + Math.imul(T, tt)) | 0) + Math.imul(k, $)) | 0),
                            (o = (o + Math.imul(k, tt)) | 0),
                            (n = (n + Math.imul(w, et)) | 0),
                            (r = ((r = (r + Math.imul(w, nt)) | 0) + Math.imul(b, et)) | 0),
                            (o = (o + Math.imul(b, nt)) | 0),
                            (n = (n + Math.imul(v, ot)) | 0),
                            (r = ((r = (r + Math.imul(v, st)) | 0) + Math.imul(M, ot)) | 0),
                            (o = (o + Math.imul(M, st)) | 0),
                            (n = (n + Math.imul(d, ut)) | 0),
                            (r = ((r = (r + Math.imul(d, at)) | 0) + Math.imul(c, ut)) | 0),
                            (o = (o + Math.imul(c, at)) | 0);
                        var kt = (((a + (n = (n + Math.imul(m, mt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, pt)) | 0) + Math.imul(p, mt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, pt)) | 0) + (r >>> 13)) | 0) + (kt >>> 26)) | 0),
                            (kt &= 67108863),
                            (n = Math.imul(j, C)),
                            (r = ((r = Math.imul(j, K)) + Math.imul(P, C)) | 0),
                            (o = Math.imul(P, K)),
                            (n = (n + Math.imul(Z, D)) | 0),
                            (r = ((r = (r + Math.imul(Z, H)) | 0) + Math.imul(L, D)) | 0),
                            (o = (o + Math.imul(L, H)) | 0),
                            (n = (n + Math.imul(R, G)) | 0),
                            (r = ((r = (r + Math.imul(R, V)) | 0) + Math.imul(B, G)) | 0),
                            (o = (o + Math.imul(B, V)) | 0),
                            (n = (n + Math.imul(F, W)) | 0),
                            (r = ((r = (r + Math.imul(F, X)) | 0) + Math.imul(N, W)) | 0),
                            (o = (o + Math.imul(N, X)) | 0),
                            (n = (n + Math.imul(x, $)) | 0),
                            (r = ((r = (r + Math.imul(x, tt)) | 0) + Math.imul(A, $)) | 0),
                            (o = (o + Math.imul(A, tt)) | 0),
                            (n = (n + Math.imul(T, et)) | 0),
                            (r = ((r = (r + Math.imul(T, nt)) | 0) + Math.imul(k, et)) | 0),
                            (o = (o + Math.imul(k, nt)) | 0),
                            (n = (n + Math.imul(w, ot)) | 0),
                            (r = ((r = (r + Math.imul(w, st)) | 0) + Math.imul(b, ot)) | 0),
                            (o = (o + Math.imul(b, st)) | 0),
                            (n = (n + Math.imul(v, ut)) | 0),
                            (r = ((r = (r + Math.imul(v, at)) | 0) + Math.imul(M, ut)) | 0),
                            (o = (o + Math.imul(M, at)) | 0),
                            (n = (n + Math.imul(d, mt)) | 0),
                            (r = ((r = (r + Math.imul(d, pt)) | 0) + Math.imul(c, mt)) | 0),
                            (o = (o + Math.imul(c, pt)) | 0);
                        var St = (((a + (n = (n + Math.imul(m, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(m, ct)) | 0) + Math.imul(p, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(p, ct)) | 0) + (r >>> 13)) | 0) + (St >>> 26)) | 0),
                            (St &= 67108863),
                            (n = Math.imul(j, D)),
                            (r = ((r = Math.imul(j, H)) + Math.imul(P, D)) | 0),
                            (o = Math.imul(P, H)),
                            (n = (n + Math.imul(Z, G)) | 0),
                            (r = ((r = (r + Math.imul(Z, V)) | 0) + Math.imul(L, G)) | 0),
                            (o = (o + Math.imul(L, V)) | 0),
                            (n = (n + Math.imul(R, W)) | 0),
                            (r = ((r = (r + Math.imul(R, X)) | 0) + Math.imul(B, W)) | 0),
                            (o = (o + Math.imul(B, X)) | 0),
                            (n = (n + Math.imul(F, $)) | 0),
                            (r = ((r = (r + Math.imul(F, tt)) | 0) + Math.imul(N, $)) | 0),
                            (o = (o + Math.imul(N, tt)) | 0),
                            (n = (n + Math.imul(x, et)) | 0),
                            (r = ((r = (r + Math.imul(x, nt)) | 0) + Math.imul(A, et)) | 0),
                            (o = (o + Math.imul(A, nt)) | 0),
                            (n = (n + Math.imul(T, ot)) | 0),
                            (r = ((r = (r + Math.imul(T, st)) | 0) + Math.imul(k, ot)) | 0),
                            (o = (o + Math.imul(k, st)) | 0),
                            (n = (n + Math.imul(w, ut)) | 0),
                            (r = ((r = (r + Math.imul(w, at)) | 0) + Math.imul(b, ut)) | 0),
                            (o = (o + Math.imul(b, at)) | 0),
                            (n = (n + Math.imul(v, mt)) | 0),
                            (r = ((r = (r + Math.imul(v, pt)) | 0) + Math.imul(M, mt)) | 0),
                            (o = (o + Math.imul(M, pt)) | 0);
                        var xt = (((a + (n = (n + Math.imul(d, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(d, ct)) | 0) + Math.imul(c, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(c, ct)) | 0) + (r >>> 13)) | 0) + (xt >>> 26)) | 0),
                            (xt &= 67108863),
                            (n = Math.imul(j, G)),
                            (r = ((r = Math.imul(j, V)) + Math.imul(P, G)) | 0),
                            (o = Math.imul(P, V)),
                            (n = (n + Math.imul(Z, W)) | 0),
                            (r = ((r = (r + Math.imul(Z, X)) | 0) + Math.imul(L, W)) | 0),
                            (o = (o + Math.imul(L, X)) | 0),
                            (n = (n + Math.imul(R, $)) | 0),
                            (r = ((r = (r + Math.imul(R, tt)) | 0) + Math.imul(B, $)) | 0),
                            (o = (o + Math.imul(B, tt)) | 0),
                            (n = (n + Math.imul(F, et)) | 0),
                            (r = ((r = (r + Math.imul(F, nt)) | 0) + Math.imul(N, et)) | 0),
                            (o = (o + Math.imul(N, nt)) | 0),
                            (n = (n + Math.imul(x, ot)) | 0),
                            (r = ((r = (r + Math.imul(x, st)) | 0) + Math.imul(A, ot)) | 0),
                            (o = (o + Math.imul(A, st)) | 0),
                            (n = (n + Math.imul(T, ut)) | 0),
                            (r = ((r = (r + Math.imul(T, at)) | 0) + Math.imul(k, ut)) | 0),
                            (o = (o + Math.imul(k, at)) | 0),
                            (n = (n + Math.imul(w, mt)) | 0),
                            (r = ((r = (r + Math.imul(w, pt)) | 0) + Math.imul(b, mt)) | 0),
                            (o = (o + Math.imul(b, pt)) | 0);
                        var At = (((a + (n = (n + Math.imul(v, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(v, ct)) | 0) + Math.imul(M, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(M, ct)) | 0) + (r >>> 13)) | 0) + (At >>> 26)) | 0),
                            (At &= 67108863),
                            (n = Math.imul(j, W)),
                            (r = ((r = Math.imul(j, X)) + Math.imul(P, W)) | 0),
                            (o = Math.imul(P, X)),
                            (n = (n + Math.imul(Z, $)) | 0),
                            (r = ((r = (r + Math.imul(Z, tt)) | 0) + Math.imul(L, $)) | 0),
                            (o = (o + Math.imul(L, tt)) | 0),
                            (n = (n + Math.imul(R, et)) | 0),
                            (r = ((r = (r + Math.imul(R, nt)) | 0) + Math.imul(B, et)) | 0),
                            (o = (o + Math.imul(B, nt)) | 0),
                            (n = (n + Math.imul(F, ot)) | 0),
                            (r = ((r = (r + Math.imul(F, st)) | 0) + Math.imul(N, ot)) | 0),
                            (o = (o + Math.imul(N, st)) | 0),
                            (n = (n + Math.imul(x, ut)) | 0),
                            (r = ((r = (r + Math.imul(x, at)) | 0) + Math.imul(A, ut)) | 0),
                            (o = (o + Math.imul(A, at)) | 0),
                            (n = (n + Math.imul(T, mt)) | 0),
                            (r = ((r = (r + Math.imul(T, pt)) | 0) + Math.imul(k, mt)) | 0),
                            (o = (o + Math.imul(k, pt)) | 0);
                        var It = (((a + (n = (n + Math.imul(w, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(w, ct)) | 0) + Math.imul(b, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(b, ct)) | 0) + (r >>> 13)) | 0) + (It >>> 26)) | 0),
                            (It &= 67108863),
                            (n = Math.imul(j, $)),
                            (r = ((r = Math.imul(j, tt)) + Math.imul(P, $)) | 0),
                            (o = Math.imul(P, tt)),
                            (n = (n + Math.imul(Z, et)) | 0),
                            (r = ((r = (r + Math.imul(Z, nt)) | 0) + Math.imul(L, et)) | 0),
                            (o = (o + Math.imul(L, nt)) | 0),
                            (n = (n + Math.imul(R, ot)) | 0),
                            (r = ((r = (r + Math.imul(R, st)) | 0) + Math.imul(B, ot)) | 0),
                            (o = (o + Math.imul(B, st)) | 0),
                            (n = (n + Math.imul(F, ut)) | 0),
                            (r = ((r = (r + Math.imul(F, at)) | 0) + Math.imul(N, ut)) | 0),
                            (o = (o + Math.imul(N, at)) | 0),
                            (n = (n + Math.imul(x, mt)) | 0),
                            (r = ((r = (r + Math.imul(x, pt)) | 0) + Math.imul(A, mt)) | 0),
                            (o = (o + Math.imul(A, pt)) | 0);
                        var Ft = (((a + (n = (n + Math.imul(T, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(T, ct)) | 0) + Math.imul(k, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(k, ct)) | 0) + (r >>> 13)) | 0) + (Ft >>> 26)) | 0),
                            (Ft &= 67108863),
                            (n = Math.imul(j, et)),
                            (r = ((r = Math.imul(j, nt)) + Math.imul(P, et)) | 0),
                            (o = Math.imul(P, nt)),
                            (n = (n + Math.imul(Z, ot)) | 0),
                            (r = ((r = (r + Math.imul(Z, st)) | 0) + Math.imul(L, ot)) | 0),
                            (o = (o + Math.imul(L, st)) | 0),
                            (n = (n + Math.imul(R, ut)) | 0),
                            (r = ((r = (r + Math.imul(R, at)) | 0) + Math.imul(B, ut)) | 0),
                            (o = (o + Math.imul(B, at)) | 0),
                            (n = (n + Math.imul(F, mt)) | 0),
                            (r = ((r = (r + Math.imul(F, pt)) | 0) + Math.imul(N, mt)) | 0),
                            (o = (o + Math.imul(N, pt)) | 0);
                        var Nt = (((a + (n = (n + Math.imul(x, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(x, ct)) | 0) + Math.imul(A, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(A, ct)) | 0) + (r >>> 13)) | 0) + (Nt >>> 26)) | 0),
                            (Nt &= 67108863),
                            (n = Math.imul(j, ot)),
                            (r = ((r = Math.imul(j, st)) + Math.imul(P, ot)) | 0),
                            (o = Math.imul(P, st)),
                            (n = (n + Math.imul(Z, ut)) | 0),
                            (r = ((r = (r + Math.imul(Z, at)) | 0) + Math.imul(L, ut)) | 0),
                            (o = (o + Math.imul(L, at)) | 0),
                            (n = (n + Math.imul(R, mt)) | 0),
                            (r = ((r = (r + Math.imul(R, pt)) | 0) + Math.imul(B, mt)) | 0),
                            (o = (o + Math.imul(B, pt)) | 0);
                        var Ot = (((a + (n = (n + Math.imul(F, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(F, ct)) | 0) + Math.imul(N, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(N, ct)) | 0) + (r >>> 13)) | 0) + (Ot >>> 26)) | 0),
                            (Ot &= 67108863),
                            (n = Math.imul(j, ut)),
                            (r = ((r = Math.imul(j, at)) + Math.imul(P, ut)) | 0),
                            (o = Math.imul(P, at)),
                            (n = (n + Math.imul(Z, mt)) | 0),
                            (r = ((r = (r + Math.imul(Z, pt)) | 0) + Math.imul(L, mt)) | 0),
                            (o = (o + Math.imul(L, pt)) | 0);
                        var Rt = (((a + (n = (n + Math.imul(R, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(R, ct)) | 0) + Math.imul(B, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(B, ct)) | 0) + (r >>> 13)) | 0) + (Rt >>> 26)) | 0), (Rt &= 67108863), (n = Math.imul(j, mt)), (r = ((r = Math.imul(j, pt)) + Math.imul(P, mt)) | 0), (o = Math.imul(P, pt));
                        var Bt = (((a + (n = (n + Math.imul(Z, dt)) | 0)) | 0) + ((8191 & (r = ((r = (r + Math.imul(Z, ct)) | 0) + Math.imul(L, dt)) | 0)) << 13)) | 0;
                        (a = ((((o = (o + Math.imul(L, ct)) | 0) + (r >>> 13)) | 0) + (Bt >>> 26)) | 0), (Bt &= 67108863);
                        var qt = (((a + (n = Math.imul(j, dt))) | 0) + ((8191 & (r = ((r = Math.imul(j, ct)) + Math.imul(P, dt)) | 0)) << 13)) | 0;
                        return (
                            (a = ((((o = Math.imul(P, ct)) + (r >>> 13)) | 0) + (qt >>> 26)) | 0),
                            (qt &= 67108863),
                            (u[0] = yt),
                            (u[1] = vt),
                            (u[2] = Mt),
                            (u[3] = gt),
                            (u[4] = wt),
                            (u[5] = bt),
                            (u[6] = _t),
                            (u[7] = Tt),
                            (u[8] = kt),
                            (u[9] = St),
                            (u[10] = xt),
                            (u[11] = At),
                            (u[12] = It),
                            (u[13] = Ft),
                            (u[14] = Nt),
                            (u[15] = Ot),
                            (u[16] = Rt),
                            (u[17] = Bt),
                            (u[18] = qt),
                            0 !== a && ((u[19] = a), e.length++),
                            e
                        );
                    };
                    function v(t, i, e) {
                        (e.negative = i.negative ^ t.negative), (e.length = t.length + i.length);
                        for (var n = 0, r = 0, o = 0; o < e.length - 1; o++) {
                            var s = r;
                            r = 0;
                            for (var h = 67108863 & n, u = Math.min(o, i.length - 1), a = Math.max(0, o - t.length + 1); a <= u; a++) {
                                var l = o - a,
                                    m = (0 | t.words[l]) * (0 | i.words[a]),
                                    p = 67108863 & m;
                                (h = 67108863 & (p = (p + h) | 0)), (r += (s = ((s = (s + ((m / 67108864) | 0)) | 0) + (p >>> 26)) | 0) >>> 26), (s &= 67108863);
                            }
                            (e.words[o] = h), (n = s), (s = r);
                        }
                        return 0 !== n ? (e.words[o] = n) : e.length--, e._strip();
                    }
                    function M(t, i, e) {
                        return v(t, i, e);
                    }
                    function g(t, i) {
                        (this.x = t), (this.y = i);
                    }
                    Math.imul || (y = c),
                        (o.prototype.mulTo = function (t, i) {
                            var e = this.length + t.length;
                            return 10 === this.length && 10 === t.length ? y(this, t, i) : e < 63 ? c(this, t, i) : e < 1024 ? v(this, t, i) : M(this, t, i);
                        }),
                        (g.prototype.makeRBT = function (t) {
                            for (var i = new Array(t), e = o.prototype._countBits(t) - 1, n = 0; n < t; n++) i[n] = this.revBin(n, e, t);
                            return i;
                        }),
                        (g.prototype.revBin = function (t, i, e) {
                            if (0 === t || t === e - 1) return t;
                            for (var n = 0, r = 0; r < i; r++) (n |= (1 & t) << (i - r - 1)), (t >>= 1);
                            return n;
                        }),
                        (g.prototype.permute = function (t, i, e, n, r, o) {
                            for (var s = 0; s < o; s++) (n[s] = i[t[s]]), (r[s] = e[t[s]]);
                        }),
                        (g.prototype.transform = function (t, i, e, n, r, o) {
                            this.permute(o, t, i, e, n, r);
                            for (var s = 1; s < r; s <<= 1)
                                for (var h = s << 1, u = Math.cos((2 * Math.PI) / h), a = Math.sin((2 * Math.PI) / h), l = 0; l < r; l += h)
                                    for (var m = u, p = a, f = 0; f < s; f++) {
                                        var d = e[l + f],
                                            c = n[l + f],
                                            y = e[l + f + s],
                                            v = n[l + f + s],
                                            M = m * y - p * v;
                                        (v = m * v + p * y), (y = M), (e[l + f] = d + y), (n[l + f] = c + v), (e[l + f + s] = d - y), (n[l + f + s] = c - v), f !== h && ((M = u * m - a * p), (p = u * p + a * m), (m = M));
                                    }
                        }),
                        (g.prototype.guessLen13b = function (t, i) {
                            var e = 1 | Math.max(i, t),
                                n = 1 & e,
                                r = 0;
                            for (e = (e / 2) | 0; e; e >>>= 1) r++;
                            return 1 << (r + 1 + n);
                        }),
                        (g.prototype.conjugate = function (t, i, e) {
                            if (!(e <= 1))
                                for (var n = 0; n < e / 2; n++) {
                                    var r = t[n];
                                    (t[n] = t[e - n - 1]), (t[e - n - 1] = r), (r = i[n]), (i[n] = -i[e - n - 1]), (i[e - n - 1] = -r);
                                }
                        }),
                        (g.prototype.normalize13b = function (t, i) {
                            for (var e = 0, n = 0; n < i / 2; n++) {
                                var r = 8192 * Math.round(t[2 * n + 1] / i) + Math.round(t[2 * n] / i) + e;
                                (t[n] = 67108863 & r), (e = r < 67108864 ? 0 : (r / 67108864) | 0);
                            }
                            return t;
                        }),
                        (g.prototype.convert13b = function (t, i, e, r) {
                            for (var o = 0, s = 0; s < i; s++) (o += 0 | t[s]), (e[2 * s] = 8191 & o), (o >>>= 13), (e[2 * s + 1] = 8191 & o), (o >>>= 13);
                            for (s = 2 * i; s < r; ++s) e[s] = 0;
                            n(0 === o), n(0 == (-8192 & o));
                        }),
                        (g.prototype.stub = function (t) {
                            for (var i = new Array(t), e = 0; e < t; e++) i[e] = 0;
                            return i;
                        }),
                        (g.prototype.mulp = function (t, i, e) {
                            var n = 2 * this.guessLen13b(t.length, i.length),
                                r = this.makeRBT(n),
                                o = this.stub(n),
                                s = new Array(n),
                                h = new Array(n),
                                u = new Array(n),
                                a = new Array(n),
                                l = new Array(n),
                                m = new Array(n),
                                p = e.words;
                            (p.length = n), this.convert13b(t.words, t.length, s, n), this.convert13b(i.words, i.length, a, n), this.transform(s, o, h, u, n, r), this.transform(a, o, l, m, n, r);
                            for (var f = 0; f < n; f++) {
                                var d = h[f] * l[f] - u[f] * m[f];
                                (u[f] = h[f] * m[f] + u[f] * l[f]), (h[f] = d);
                            }
                            return this.conjugate(h, u, n), this.transform(h, u, p, o, n, r), this.conjugate(p, o, n), this.normalize13b(p, n), (e.negative = t.negative ^ i.negative), (e.length = t.length + i.length), e._strip();
                        }),
                        (o.prototype.mul = function (t) {
                            var i = new o(null);
                            return (i.words = new Array(this.length + t.length)), this.mulTo(t, i);
                        }),
                        (o.prototype.mulf = function (t) {
                            var i = new o(null);
                            return (i.words = new Array(this.length + t.length)), M(this, t, i);
                        }),
                        (o.prototype.imul = function (t) {
                            return this.clone().mulTo(t, this);
                        }),
                        (o.prototype.imuln = function (t) {
                            var i = t < 0;
                            i && (t = -t), n("number" == typeof t), n(t < 67108864);
                            for (var e = 0, r = 0; r < this.length; r++) {
                                var o = (0 | this.words[r]) * t,
                                    s = (67108863 & o) + (67108863 & e);
                                (e >>= 26), (e += (o / 67108864) | 0), (e += s >>> 26), (this.words[r] = 67108863 & s);
                            }
                            return 0 !== e && ((this.words[r] = e), this.length++), i ? this.ineg() : this;
                        }),
                        (o.prototype.muln = function (t) {
                            return this.clone().imuln(t);
                        }),
                        (o.prototype.sqr = function () {
                            return this.mul(this);
                        }),
                        (o.prototype.isqr = function () {
                            return this.imul(this.clone());
                        }),
                        (o.prototype.pow = function (t) {
                            var i = (function (t) {
                                for (var i = new Array(t.bitLength()), e = 0; e < i.length; e++) {
                                    var n = (e / 26) | 0,
                                        r = e % 26;
                                    i[e] = (t.words[n] >>> r) & 1;
                                }
                                return i;
                            })(t);
                            if (0 === i.length) return new o(1);
                            for (var e = this, n = 0; n < i.length && 0 === i[n]; n++, e = e.sqr());
                            if (++n < i.length) for (var r = e.sqr(); n < i.length; n++, r = r.sqr()) 0 !== i[n] && (e = e.mul(r));
                            return e;
                        }),
                        (o.prototype.iushln = function (t) {
                            n("number" == typeof t && t >= 0);
                            var i,
                                e = t % 26,
                                r = (t - e) / 26,
                                o = (67108863 >>> (26 - e)) << (26 - e);
                            if (0 !== e) {
                                var s = 0;
                                for (i = 0; i < this.length; i++) {
                                    var h = this.words[i] & o,
                                        u = ((0 | this.words[i]) - h) << e;
                                    (this.words[i] = u | s), (s = h >>> (26 - e));
                                }
                                s && ((this.words[i] = s), this.length++);
                            }
                            if (0 !== r) {
                                for (i = this.length - 1; i >= 0; i--) this.words[i + r] = this.words[i];
                                for (i = 0; i < r; i++) this.words[i] = 0;
                                this.length += r;
                            }
                            return this._strip();
                        }),
                        (o.prototype.ishln = function (t) {
                            return n(0 === this.negative), this.iushln(t);
                        }),
                        (o.prototype.iushrn = function (t, i, e) {
                            var r;
                            n("number" == typeof t && t >= 0), (r = i ? (i - (i % 26)) / 26 : 0);
                            var o = t % 26,
                                s = Math.min((t - o) / 26, this.length),
                                h = 67108863 ^ ((67108863 >>> o) << o),
                                u = e;
                            if (((r -= s), (r = Math.max(0, r)), u)) {
                                for (var a = 0; a < s; a++) u.words[a] = this.words[a];
                                u.length = s;
                            }
                            if (0 === s);
                            else if (this.length > s) for (this.length -= s, a = 0; a < this.length; a++) this.words[a] = this.words[a + s];
                            else (this.words[0] = 0), (this.length = 1);
                            var l = 0;
                            for (a = this.length - 1; a >= 0 && (0 !== l || a >= r); a--) {
                                var m = 0 | this.words[a];
                                (this.words[a] = (l << (26 - o)) | (m >>> o)), (l = m & h);
                            }
                            return u && 0 !== l && (u.words[u.length++] = l), 0 === this.length && ((this.words[0] = 0), (this.length = 1)), this._strip();
                        }),
                        (o.prototype.ishrn = function (t, i, e) {
                            return n(0 === this.negative), this.iushrn(t, i, e);
                        }),
                        (o.prototype.shln = function (t) {
                            return this.clone().ishln(t);
                        }),
                        (o.prototype.ushln = function (t) {
                            return this.clone().iushln(t);
                        }),
                        (o.prototype.shrn = function (t) {
                            return this.clone().ishrn(t);
                        }),
                        (o.prototype.ushrn = function (t) {
                            return this.clone().iushrn(t);
                        }),
                        (o.prototype.testn = function (t) {
                            n("number" == typeof t && t >= 0);
                            var i = t % 26,
                                e = (t - i) / 26,
                                r = 1 << i;
                            return !(this.length <= e || !(this.words[e] & r));
                        }),
                        (o.prototype.imaskn = function (t) {
                            n("number" == typeof t && t >= 0);
                            var i = t % 26,
                                e = (t - i) / 26;
                            if ((n(0 === this.negative, "imaskn works only with positive numbers"), this.length <= e)) return this;
                            if ((0 !== i && e++, (this.length = Math.min(e, this.length)), 0 !== i)) {
                                var r = 67108863 ^ ((67108863 >>> i) << i);
                                this.words[this.length - 1] &= r;
                            }
                            return this._strip();
                        }),
                        (o.prototype.maskn = function (t) {
                            return this.clone().imaskn(t);
                        }),
                        (o.prototype.iaddn = function (t) {
                            return (
                                n("number" == typeof t),
                                n(t < 67108864),
                                t < 0 ? this.isubn(-t) : 0 !== this.negative ? (1 === this.length && (0 | this.words[0]) <= t ? ((this.words[0] = t - (0 | this.words[0])), (this.negative = 0), this) : ((this.negative = 0), this.isubn(t), (this.negative = 1), this)) : this._iaddn(t)
                            );
                        }),
                        (o.prototype._iaddn = function (t) {
                            this.words[0] += t;
                            for (var i = 0; i < this.length && this.words[i] >= 67108864; i++) (this.words[i] -= 67108864), i === this.length - 1 ? (this.words[i + 1] = 1) : this.words[i + 1]++;
                            return (this.length = Math.max(this.length, i + 1)), this;
                        }),
                        (o.prototype.isubn = function (t) {
                            if ((n("number" == typeof t), n(t < 67108864), t < 0)) return this.iaddn(-t);
                            if (0 !== this.negative) return (this.negative = 0), this.iaddn(t), (this.negative = 1), this;
                            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0)) (this.words[0] = -this.words[0]), (this.negative = 1);
                            else for (var i = 0; i < this.length && this.words[i] < 0; i++) (this.words[i] += 67108864), (this.words[i + 1] -= 1);
                            return this._strip();
                        }),
                        (o.prototype.addn = function (t) {
                            return this.clone().iaddn(t);
                        }),
                        (o.prototype.subn = function (t) {
                            return this.clone().isubn(t);
                        }),
                        (o.prototype.iabs = function () {
                            return (this.negative = 0), this;
                        }),
                        (o.prototype.abs = function () {
                            return this.clone().iabs();
                        }),
                        (o.prototype._ishlnsubmul = function (t, i, e) {
                            var r,
                                o,
                                s = t.length + e;
                            this._expand(s);
                            var h = 0;
                            for (r = 0; r < t.length; r++) {
                                o = (0 | this.words[r + e]) + h;
                                var u = (0 | t.words[r]) * i;
                                (h = ((o -= 67108863 & u) >> 26) - ((u / 67108864) | 0)), (this.words[r + e] = 67108863 & o);
                            }
                            for (; r < this.length - e; r++) (h = (o = (0 | this.words[r + e]) + h) >> 26), (this.words[r + e] = 67108863 & o);
                            if (0 === h) return this._strip();
                            for (n(-1 === h), h = 0, r = 0; r < this.length; r++) (h = (o = -(0 | this.words[r]) + h) >> 26), (this.words[r] = 67108863 & o);
                            return (this.negative = 1), this._strip();
                        }),
                        (o.prototype._wordDiv = function (t, i) {
                            var e = (this.length, t.length),
                                n = this.clone(),
                                r = t,
                                s = 0 | r.words[r.length - 1];
                            0 != (e = 26 - this._countBits(s)) && ((r = r.ushln(e)), n.iushln(e), (s = 0 | r.words[r.length - 1]));
                            var h,
                                u = n.length - r.length;
                            if ("mod" !== i) {
                                ((h = new o(null)).length = u + 1), (h.words = new Array(h.length));
                                for (var a = 0; a < h.length; a++) h.words[a] = 0;
                            }
                            var l = n.clone()._ishlnsubmul(r, 1, u);
                            0 === l.negative && ((n = l), h && (h.words[u] = 1));
                            for (var m = u - 1; m >= 0; m--) {
                                var p = 67108864 * (0 | n.words[r.length + m]) + (0 | n.words[r.length + m - 1]);
                                for (p = Math.min((p / s) | 0, 67108863), n._ishlnsubmul(r, p, m); 0 !== n.negative; ) p--, (n.negative = 0), n._ishlnsubmul(r, 1, m), n.isZero() || (n.negative ^= 1);
                                h && (h.words[m] = p);
                            }
                            return h && h._strip(), n._strip(), "div" !== i && 0 !== e && n.iushrn(e), {div: h || null, mod: n};
                        }),
                        (o.prototype.divmod = function (t, i, e) {
                            return (
                                n(!t.isZero()),
                                this.isZero()
                                    ? {div: new o(0), mod: new o(0)}
                                    : 0 !== this.negative && 0 === t.negative
                                    ? ((h = this.neg().divmod(t, i)), "mod" !== i && (r = h.div.neg()), "div" !== i && ((s = h.mod.neg()), e && 0 !== s.negative && s.iadd(t)), {div: r, mod: s})
                                    : 0 === this.negative && 0 !== t.negative
                                    ? ((h = this.divmod(t.neg(), i)), "mod" !== i && (r = h.div.neg()), {div: r, mod: h.mod})
                                    : 0 != (this.negative & t.negative)
                                    ? ((h = this.neg().divmod(t.neg(), i)), "div" !== i && ((s = h.mod.neg()), e && 0 !== s.negative && s.isub(t)), {div: h.div, mod: s})
                                    : t.length > this.length || this.cmp(t) < 0
                                    ? {div: new o(0), mod: this}
                                    : 1 === t.length
                                    ? "div" === i
                                        ? {div: this.divn(t.words[0]), mod: null}
                                        : "mod" === i
                                        ? {div: null, mod: new o(this.modrn(t.words[0]))}
                                        : {div: this.divn(t.words[0]), mod: new o(this.modrn(t.words[0]))}
                                    : this._wordDiv(t, i)
                            );
                            var r, s, h;
                        }),
                        (o.prototype.div = function (t) {
                            return this.divmod(t, "div", !1).div;
                        }),
                        (o.prototype.mod = function (t) {
                            return this.divmod(t, "mod", !1).mod;
                        }),
                        (o.prototype.umod = function (t) {
                            return this.divmod(t, "mod", !0).mod;
                        }),
                        (o.prototype.divRound = function (t) {
                            var i = this.divmod(t);
                            if (i.mod.isZero()) return i.div;
                            var e = 0 !== i.div.negative ? i.mod.isub(t) : i.mod,
                                n = t.ushrn(1),
                                r = t.andln(1),
                                o = e.cmp(n);
                            return o < 0 || (1 === r && 0 === o) ? i.div : 0 !== i.div.negative ? i.div.isubn(1) : i.div.iaddn(1);
                        }),
                        (o.prototype.modrn = function (t) {
                            var i = t < 0;
                            i && (t = -t), n(t <= 67108863);
                            for (var e = (1 << 26) % t, r = 0, o = this.length - 1; o >= 0; o--) r = (e * r + (0 | this.words[o])) % t;
                            return i ? -r : r;
                        }),
                        (o.prototype.modn = function (t) {
                            return this.modrn(t);
                        }),
                        (o.prototype.idivn = function (t) {
                            var i = t < 0;
                            i && (t = -t), n(t <= 67108863);
                            for (var e = 0, r = this.length - 1; r >= 0; r--) {
                                var o = (0 | this.words[r]) + 67108864 * e;
                                (this.words[r] = (o / t) | 0), (e = o % t);
                            }
                            return this._strip(), i ? this.ineg() : this;
                        }),
                        (o.prototype.divn = function (t) {
                            return this.clone().idivn(t);
                        }),
                        (o.prototype.egcd = function (t) {
                            n(0 === t.negative), n(!t.isZero());
                            var i = this,
                                e = t.clone();
                            i = 0 !== i.negative ? i.umod(t) : i.clone();
                            for (var r = new o(1), s = new o(0), h = new o(0), u = new o(1), a = 0; i.isEven() && e.isEven(); ) i.iushrn(1), e.iushrn(1), ++a;
                            for (var l = e.clone(), m = i.clone(); !i.isZero(); ) {
                                for (var p = 0, f = 1; 0 == (i.words[0] & f) && p < 26; ++p, f <<= 1);
                                if (p > 0) for (i.iushrn(p); p-- > 0; ) (r.isOdd() || s.isOdd()) && (r.iadd(l), s.isub(m)), r.iushrn(1), s.iushrn(1);
                                for (var d = 0, c = 1; 0 == (e.words[0] & c) && d < 26; ++d, c <<= 1);
                                if (d > 0) for (e.iushrn(d); d-- > 0; ) (h.isOdd() || u.isOdd()) && (h.iadd(l), u.isub(m)), h.iushrn(1), u.iushrn(1);
                                i.cmp(e) >= 0 ? (i.isub(e), r.isub(h), s.isub(u)) : (e.isub(i), h.isub(r), u.isub(s));
                            }
                            return {a: h, b: u, gcd: e.iushln(a)};
                        }),
                        (o.prototype._invmp = function (t) {
                            n(0 === t.negative), n(!t.isZero());
                            var i = this,
                                e = t.clone();
                            i = 0 !== i.negative ? i.umod(t) : i.clone();
                            for (var r, s = new o(1), h = new o(0), u = e.clone(); i.cmpn(1) > 0 && e.cmpn(1) > 0; ) {
                                for (var a = 0, l = 1; 0 == (i.words[0] & l) && a < 26; ++a, l <<= 1);
                                if (a > 0) for (i.iushrn(a); a-- > 0; ) s.isOdd() && s.iadd(u), s.iushrn(1);
                                for (var m = 0, p = 1; 0 == (e.words[0] & p) && m < 26; ++m, p <<= 1);
                                if (m > 0) for (e.iushrn(m); m-- > 0; ) h.isOdd() && h.iadd(u), h.iushrn(1);
                                i.cmp(e) >= 0 ? (i.isub(e), s.isub(h)) : (e.isub(i), h.isub(s));
                            }
                            return (r = 0 === i.cmpn(1) ? s : h).cmpn(0) < 0 && r.iadd(t), r;
                        }),
                        (o.prototype.gcd = function (t) {
                            if (this.isZero()) return t.abs();
                            if (t.isZero()) return this.abs();
                            var i = this.clone(),
                                e = t.clone();
                            (i.negative = 0), (e.negative = 0);
                            for (var n = 0; i.isEven() && e.isEven(); n++) i.iushrn(1), e.iushrn(1);
                            for (;;) {
                                for (; i.isEven(); ) i.iushrn(1);
                                for (; e.isEven(); ) e.iushrn(1);
                                var r = i.cmp(e);
                                if (r < 0) {
                                    var o = i;
                                    (i = e), (e = o);
                                } else if (0 === r || 0 === e.cmpn(1)) break;
                                i.isub(e);
                            }
                            return e.iushln(n);
                        }),
                        (o.prototype.invm = function (t) {
                            return this.egcd(t).a.umod(t);
                        }),
                        (o.prototype.isEven = function () {
                            return 0 == (1 & this.words[0]);
                        }),
                        (o.prototype.isOdd = function () {
                            return 1 == (1 & this.words[0]);
                        }),
                        (o.prototype.andln = function (t) {
                            return this.words[0] & t;
                        }),
                        (o.prototype.bincn = function (t) {
                            n("number" == typeof t);
                            var i = t % 26,
                                e = (t - i) / 26,
                                r = 1 << i;
                            if (this.length <= e) return this._expand(e + 1), (this.words[e] |= r), this;
                            for (var o = r, s = e; 0 !== o && s < this.length; s++) {
                                var h = 0 | this.words[s];
                                (o = (h += o) >>> 26), (h &= 67108863), (this.words[s] = h);
                            }
                            return 0 !== o && ((this.words[s] = o), this.length++), this;
                        }),
                        (o.prototype.isZero = function () {
                            return 1 === this.length && 0 === this.words[0];
                        }),
                        (o.prototype.cmpn = function (t) {
                            var i,
                                e = t < 0;
                            if (0 !== this.negative && !e) return -1;
                            if (0 === this.negative && e) return 1;
                            if ((this._strip(), this.length > 1)) i = 1;
                            else {
                                e && (t = -t), n(t <= 67108863, "Number is too big");
                                var r = 0 | this.words[0];
                                i = r === t ? 0 : r < t ? -1 : 1;
                            }
                            return 0 !== this.negative ? 0 | -i : i;
                        }),
                        (o.prototype.cmp = function (t) {
                            if (0 !== this.negative && 0 === t.negative) return -1;
                            if (0 === this.negative && 0 !== t.negative) return 1;
                            var i = this.ucmp(t);
                            return 0 !== this.negative ? 0 | -i : i;
                        }),
                        (o.prototype.ucmp = function (t) {
                            if (this.length > t.length) return 1;
                            if (this.length < t.length) return -1;
                            for (var i = 0, e = this.length - 1; e >= 0; e--) {
                                var n = 0 | this.words[e],
                                    r = 0 | t.words[e];
                                if (n !== r) {
                                    n < r ? (i = -1) : n > r && (i = 1);
                                    break;
                                }
                            }
                            return i;
                        }),
                        (o.prototype.gtn = function (t) {
                            return 1 === this.cmpn(t);
                        }),
                        (o.prototype.gt = function (t) {
                            return 1 === this.cmp(t);
                        }),
                        (o.prototype.gten = function (t) {
                            return this.cmpn(t) >= 0;
                        }),
                        (o.prototype.gte = function (t) {
                            return this.cmp(t) >= 0;
                        }),
                        (o.prototype.ltn = function (t) {
                            return -1 === this.cmpn(t);
                        }),
                        (o.prototype.lt = function (t) {
                            return -1 === this.cmp(t);
                        }),
                        (o.prototype.lten = function (t) {
                            return this.cmpn(t) <= 0;
                        }),
                        (o.prototype.lte = function (t) {
                            return this.cmp(t) <= 0;
                        }),
                        (o.prototype.eqn = function (t) {
                            return 0 === this.cmpn(t);
                        }),
                        (o.prototype.eq = function (t) {
                            return 0 === this.cmp(t);
                        }),
                        (o.red = function (t) {
                            return new x(t);
                        }),
                        (o.prototype.toRed = function (t) {
                            return n(!this.red, "Already a number in reduction context"), n(0 === this.negative, "red works only with positives"), t.convertTo(this)._forceRed(t);
                        }),
                        (o.prototype.fromRed = function () {
                            return n(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this);
                        }),
                        (o.prototype._forceRed = function (t) {
                            return (this.red = t), this;
                        }),
                        (o.prototype.forceRed = function (t) {
                            return n(!this.red, "Already a number in reduction context"), this._forceRed(t);
                        }),
                        (o.prototype.redAdd = function (t) {
                            return n(this.red, "redAdd works only with red numbers"), this.red.add(this, t);
                        }),
                        (o.prototype.redIAdd = function (t) {
                            return n(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, t);
                        }),
                        (o.prototype.redSub = function (t) {
                            return n(this.red, "redSub works only with red numbers"), this.red.sub(this, t);
                        }),
                        (o.prototype.redISub = function (t) {
                            return n(this.red, "redISub works only with red numbers"), this.red.isub(this, t);
                        }),
                        (o.prototype.redShl = function (t) {
                            return n(this.red, "redShl works only with red numbers"), this.red.shl(this, t);
                        }),
                        (o.prototype.redMul = function (t) {
                            return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.mul(this, t);
                        }),
                        (o.prototype.redIMul = function (t) {
                            return n(this.red, "redMul works only with red numbers"), this.red._verify2(this, t), this.red.imul(this, t);
                        }),
                        (o.prototype.redSqr = function () {
                            return n(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this);
                        }),
                        (o.prototype.redISqr = function () {
                            return n(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this);
                        }),
                        (o.prototype.redSqrt = function () {
                            return n(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this);
                        }),
                        (o.prototype.redInvm = function () {
                            return n(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this);
                        }),
                        (o.prototype.redNeg = function () {
                            return n(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this);
                        }),
                        (o.prototype.redPow = function (t) {
                            return n(this.red && !t.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, t);
                        });
                    var w = {k256: null, p224: null, p192: null, p25519: null};
                    function b(t, i) {
                        (this.name = t), (this.p = new o(i, 16)), (this.n = this.p.bitLength()), (this.k = new o(1).iushln(this.n).isub(this.p)), (this.tmp = this._tmp());
                    }
                    function _() {
                        b.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f");
                    }
                    function T() {
                        b.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001");
                    }
                    function k() {
                        b.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff");
                    }
                    function S() {
                        b.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed");
                    }
                    function x(t) {
                        if ("string" == typeof t) {
                            var i = o._prime(t);
                            (this.m = i.p), (this.prime = i);
                        } else n(t.gtn(1), "modulus must be greater than 1"), (this.m = t), (this.prime = null);
                    }
                    function A(t) {
                        x.call(this, t),
                            (this.shift = this.m.bitLength()),
                            this.shift % 26 != 0 && (this.shift += 26 - (this.shift % 26)),
                            (this.r = new o(1).iushln(this.shift)),
                            (this.r2 = this.imod(this.r.sqr())),
                            (this.rinv = this.r._invmp(this.m)),
                            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
                            (this.minv = this.minv.umod(this.r)),
                            (this.minv = this.r.sub(this.minv));
                    }
                    (b.prototype._tmp = function () {
                        var t = new o(null);
                        return (t.words = new Array(Math.ceil(this.n / 13))), t;
                    }),
                        (b.prototype.ireduce = function (t) {
                            var i,
                                e = t;
                            do {
                                this.split(e, this.tmp), (i = (e = (e = this.imulK(e)).iadd(this.tmp)).bitLength());
                            } while (i > this.n);
                            var n = i < this.n ? -1 : e.ucmp(this.p);
                            return 0 === n ? ((e.words[0] = 0), (e.length = 1)) : n > 0 ? e.isub(this.p) : void 0 !== e.strip ? e.strip() : e._strip(), e;
                        }),
                        (b.prototype.split = function (t, i) {
                            t.iushrn(this.n, 0, i);
                        }),
                        (b.prototype.imulK = function (t) {
                            return t.imul(this.k);
                        }),
                        r(_, b),
                        (_.prototype.split = function (t, i) {
                            for (var e = 4194303, n = Math.min(t.length, 9), r = 0; r < n; r++) i.words[r] = t.words[r];
                            if (((i.length = n), t.length <= 9)) return (t.words[0] = 0), void (t.length = 1);
                            var o = t.words[9];
                            for (i.words[i.length++] = o & e, r = 10; r < t.length; r++) {
                                var s = 0 | t.words[r];
                                (t.words[r - 10] = ((s & e) << 4) | (o >>> 22)), (o = s);
                            }
                            (o >>>= 22), (t.words[r - 10] = o), 0 === o && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
                        }),
                        (_.prototype.imulK = function (t) {
                            (t.words[t.length] = 0), (t.words[t.length + 1] = 0), (t.length += 2);
                            for (var i = 0, e = 0; e < t.length; e++) {
                                var n = 0 | t.words[e];
                                (i += 977 * n), (t.words[e] = 67108863 & i), (i = 64 * n + ((i / 67108864) | 0));
                            }
                            return 0 === t.words[t.length - 1] && (t.length--, 0 === t.words[t.length - 1] && t.length--), t;
                        }),
                        r(T, b),
                        r(k, b),
                        r(S, b),
                        (S.prototype.imulK = function (t) {
                            for (var i = 0, e = 0; e < t.length; e++) {
                                var n = 19 * (0 | t.words[e]) + i,
                                    r = 67108863 & n;
                                (n >>>= 26), (t.words[e] = r), (i = n);
                            }
                            return 0 !== i && (t.words[t.length++] = i), t;
                        }),
                        (o._prime = function (t) {
                            if (w[t]) return w[t];
                            var i;
                            if ("k256" === t) i = new _();
                            else if ("p224" === t) i = new T();
                            else if ("p192" === t) i = new k();
                            else {
                                if ("p25519" !== t) throw new Error("Unknown prime " + t);
                                i = new S();
                            }
                            return (w[t] = i), i;
                        }),
                        (x.prototype._verify1 = function (t) {
                            n(0 === t.negative, "red works only with positives"), n(t.red, "red works only with red numbers");
                        }),
                        (x.prototype._verify2 = function (t, i) {
                            n(0 == (t.negative | i.negative), "red works only with positives"), n(t.red && t.red === i.red, "red works only with red numbers");
                        }),
                        (x.prototype.imod = function (t) {
                            return this.prime ? this.prime.ireduce(t)._forceRed(this) : (l(t, t.umod(this.m)._forceRed(this)), t);
                        }),
                        (x.prototype.neg = function (t) {
                            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
                        }),
                        (x.prototype.add = function (t, i) {
                            this._verify2(t, i);
                            var e = t.add(i);
                            return e.cmp(this.m) >= 0 && e.isub(this.m), e._forceRed(this);
                        }),
                        (x.prototype.iadd = function (t, i) {
                            this._verify2(t, i);
                            var e = t.iadd(i);
                            return e.cmp(this.m) >= 0 && e.isub(this.m), e;
                        }),
                        (x.prototype.sub = function (t, i) {
                            this._verify2(t, i);
                            var e = t.sub(i);
                            return e.cmpn(0) < 0 && e.iadd(this.m), e._forceRed(this);
                        }),
                        (x.prototype.isub = function (t, i) {
                            this._verify2(t, i);
                            var e = t.isub(i);
                            return e.cmpn(0) < 0 && e.iadd(this.m), e;
                        }),
                        (x.prototype.shl = function (t, i) {
                            return this._verify1(t), this.imod(t.ushln(i));
                        }),
                        (x.prototype.imul = function (t, i) {
                            return this._verify2(t, i), this.imod(t.imul(i));
                        }),
                        (x.prototype.mul = function (t, i) {
                            return this._verify2(t, i), this.imod(t.mul(i));
                        }),
                        (x.prototype.isqr = function (t) {
                            return this.imul(t, t.clone());
                        }),
                        (x.prototype.sqr = function (t) {
                            return this.mul(t, t);
                        }),
                        (x.prototype.sqrt = function (t) {
                            if (t.isZero()) return t.clone();
                            var i = this.m.andln(3);
                            if ((n(i % 2 == 1), 3 === i)) {
                                var e = this.m.add(new o(1)).iushrn(2);
                                return this.pow(t, e);
                            }
                            for (var r = this.m.subn(1), s = 0; !r.isZero() && 0 === r.andln(1); ) s++, r.iushrn(1);
                            n(!r.isZero());
                            var h = new o(1).toRed(this),
                                u = h.redNeg(),
                                a = this.m.subn(1).iushrn(1),
                                l = this.m.bitLength();
                            for (l = new o(2 * l * l).toRed(this); 0 !== this.pow(l, a).cmp(u); ) l.redIAdd(u);
                            for (var m = this.pow(l, r), p = this.pow(t, r.addn(1).iushrn(1)), f = this.pow(t, r), d = s; 0 !== f.cmp(h); ) {
                                for (var c = f, y = 0; 0 !== c.cmp(h); y++) c = c.redSqr();
                                n(y < d);
                                var v = this.pow(m, new o(1).iushln(d - y - 1));
                                (p = p.redMul(v)), (m = v.redSqr()), (f = f.redMul(m)), (d = y);
                            }
                            return p;
                        }),
                        (x.prototype.invm = function (t) {
                            var i = t._invmp(this.m);
                            return 0 !== i.negative ? ((i.negative = 0), this.imod(i).redNeg()) : this.imod(i);
                        }),
                        (x.prototype.pow = function (t, i) {
                            if (i.isZero()) return new o(1).toRed(this);
                            if (0 === i.cmpn(1)) return t.clone();
                            var e = new Array(16);
                            (e[0] = new o(1).toRed(this)), (e[1] = t);
                            for (var n = 2; n < e.length; n++) e[n] = this.mul(e[n - 1], t);
                            var r = e[0],
                                s = 0,
                                h = 0,
                                u = i.bitLength() % 26;
                            for (0 === u && (u = 26), n = i.length - 1; n >= 0; n--) {
                                for (var a = i.words[n], l = u - 1; l >= 0; l--) {
                                    var m = (a >> l) & 1;
                                    r !== e[0] && (r = this.sqr(r)), 0 !== m || 0 !== s ? ((s <<= 1), (s |= m), (4 == ++h || (0 === n && 0 === l)) && ((r = this.mul(r, e[s])), (h = 0), (s = 0))) : (h = 0);
                                }
                                u = 26;
                            }
                            return r;
                        }),
                        (x.prototype.convertTo = function (t) {
                            var i = t.umod(this.m);
                            return i === t ? i.clone() : i;
                        }),
                        (x.prototype.convertFrom = function (t) {
                            var i = t.clone();
                            return (i.red = null), i;
                        }),
                        (o.mont = function (t) {
                            return new A(t);
                        }),
                        r(A, x),
                        (A.prototype.convertTo = function (t) {
                            return this.imod(t.ushln(this.shift));
                        }),
                        (A.prototype.convertFrom = function (t) {
                            var i = this.imod(t.mul(this.rinv));
                            return (i.red = null), i;
                        }),
                        (A.prototype.imul = function (t, i) {
                            if (t.isZero() || i.isZero()) return (t.words[0] = 0), (t.length = 1), t;
                            var e = t.imul(i),
                                n = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                                r = e.isub(n).iushrn(this.shift),
                                o = r;
                            return r.cmp(this.m) >= 0 ? (o = r.isub(this.m)) : r.cmpn(0) < 0 && (o = r.iadd(this.m)), o._forceRed(this);
                        }),
                        (A.prototype.mul = function (t, i) {
                            if (t.isZero() || i.isZero()) return new o(0)._forceRed(this);
                            var e = t.mul(i),
                                n = e.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                                r = e.isub(n).iushrn(this.shift),
                                s = r;
                            return r.cmp(this.m) >= 0 ? (s = r.isub(this.m)) : r.cmpn(0) < 0 && (s = r.iadd(this.m)), s._forceRed(this);
                        }),
                        (A.prototype.invm = function (t) {
                            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
                        });
                })((t = e.nmd(t)), this);
            },
            601: () => {},
        },
        i = {};
    function e(n) {
        var r = i[n];
        if (void 0 !== r) return r.exports;
        var o = (i[n] = {id: n, loaded: !1, exports: {}});
        return t[n].call(o.exports, o, o.exports, e), (o.loaded = !0), o.exports;
    }
    (e.n = (t) => {
        var i = t && t.__esModule ? () => t.default : () => t;
        return e.d(i, {a: i}), i;
    }),
        (e.d = (t, i) => {
            for (var n in i) e.o(i, n) && !e.o(t, n) && Object.defineProperty(t, n, {enumerable: !0, get: i[n]});
        }),
        (e.o = (t, i) => Object.prototype.hasOwnProperty.call(t, i)),
        (e.r = (t) => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0});
        }),
        (e.nmd = (t) => ((t.paths = []), t.children || (t.children = []), t));
    var n = {};
    (() => {
        "use strict";
        e.r(n), e.d(n, {TamtamContractAdaptor: () => a, TamtamContractLowStub: () => u});
        var t = e(550),
            i = e.n(t);
        const r = JSON.parse(
            '{"Mt":[{"inputs":[{"internalType":"uint256","name":"initMintFee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"mintFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"nftState","outputs":[{"components":[{"internalType":"string","name":"workId","type":"string"},{"internalType":"uint8","name":"royalty","type":"uint8"},{"internalType":"address","name":"royaltyReceiver","type":"address"},{"internalType":"bool","name":"isTrading","type":"bool"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bool","name":"resale","type":"bool"}],"internalType":"struct NFTState","name":"","type":"tuple"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"newMintFee","type":"uint256"}],"name":"setMintFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"},{"components":[{"internalType":"string","name":"workId","type":"string"},{"internalType":"uint8","name":"royalty","type":"uint8"},{"internalType":"address","name":"royaltyReceiver","type":"address"},{"internalType":"bool","name":"isTrading","type":"bool"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bool","name":"resale","type":"bool"}],"internalType":"struct NFTState","name":"state1","type":"tuple"}],"name":"setNFTState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenOwner","type":"address"},{"internalType":"string","name":"workId","type":"string"},{"internalType":"uint8","name":"royalty","type":"uint8"},{"internalType":"address","name":"royaltyReceiver","type":"address"},{"internalType":"string","name":"uri","type":"string"}],"name":"mint","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"buyNFT","outputs":[],"stateMutability":"payable","type":"function","payable":true}]}'
        );
        var o = function () {
                return (
                    (o =
                        Object.assign ||
                        function (t) {
                            for (var i, e = 1, n = arguments.length; e < n; e++) for (var r in (i = arguments[e])) Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
                            return t;
                        }),
                    o.apply(this, arguments)
                );
            },
            s = function (t, i, e, n) {
                return new (e || (e = Promise))(function (r, o) {
                    function s(t) {
                        try {
                            u(n.next(t));
                        } catch (t) {
                            o(t);
                        }
                    }
                    function h(t) {
                        try {
                            u(n.throw(t));
                        } catch (t) {
                            o(t);
                        }
                    }
                    function u(t) {
                        var i;
                        t.done
                            ? r(t.value)
                            : ((i = t.value),
                              i instanceof e
                                  ? i
                                  : new e(function (t) {
                                        t(i);
                                    })).then(s, h);
                    }
                    u((n = n.apply(t, i || [])).next());
                });
            },
            h = function (t, i) {
                var e,
                    n,
                    r,
                    o,
                    s = {
                        label: 0,
                        sent: function () {
                            if (1 & r[0]) throw r[1];
                            return r[1];
                        },
                        trys: [],
                        ops: [],
                    };
                return (
                    (o = {next: h(0), throw: h(1), return: h(2)}),
                    "function" == typeof Symbol &&
                        (o[Symbol.iterator] = function () {
                            return this;
                        }),
                    o
                );
                function h(o) {
                    return function (h) {
                        return (function (o) {
                            if (e) throw new TypeError("Generator is already executing.");
                            for (; s; )
                                try {
                                    if (((e = 1), n && (r = 2 & o[0] ? n.return : o[0] ? n.throw || ((r = n.return) && r.call(n), 0) : n.next) && !(r = r.call(n, o[1])).done)) return r;
                                    switch (((n = 0), r && (o = [2 & o[0], r.value]), o[0])) {
                                        case 0:
                                        case 1:
                                            r = o;
                                            break;
                                        case 4:
                                            return s.label++, {value: o[1], done: !1};
                                        case 5:
                                            s.label++, (n = o[1]), (o = [0]);
                                            continue;
                                        case 7:
                                            (o = s.ops.pop()), s.trys.pop();
                                            continue;
                                        default:
                                            if (!((r = (r = s.trys).length > 0 && r[r.length - 1]) || (6 !== o[0] && 2 !== o[0]))) {
                                                s = 0;
                                                continue;
                                            }
                                            if (3 === o[0] && (!r || (o[1] > r[0] && o[1] < r[3]))) {
                                                s.label = o[1];
                                                break;
                                            }
                                            if (6 === o[0] && s.label < r[1]) {
                                                (s.label = r[1]), (r = o);
                                                break;
                                            }
                                            if (r && s.label < r[2]) {
                                                (s.label = r[2]), s.ops.push(o);
                                                break;
                                            }
                                            r[2] && s.ops.pop(), s.trys.pop();
                                            continue;
                                    }
                                    o = i.call(t, s);
                                } catch (t) {
                                    (o = [6, t]), (n = 0);
                                } finally {
                                    e = r = 0;
                                }
                            if (5 & o[0]) throw o[1];
                            return {value: o[0] ? o[1] : void 0, done: !0};
                        })([o, h]);
                    };
                }
            },
            u = (function () {
                function t(t, i) {
                    this.contract = new t.eth.Contract(r.Mt, i);
                }
                return (
                    (t.prototype.mintFee = function () {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (t) {
                                return [
                                    2,
                                    this.contract.methods
                                        .mintFee()
                                        .call()
                                        .then(function (t) {
                                            return new (i())(t);
                                        }),
                                ];
                            });
                        });
                    }),
                    (t.prototype.nftState = function (t) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (e) {
                                return [
                                    2,
                                    this.contract.methods
                                        .nftState(t.toString())
                                        .call()
                                        .then(function (t) {
                                            return (function (t) {
                                                var e = ["workId", "royalty", "royaltyReceiver", "isTrading", "price", "resale"].reduce(function (i, e) {
                                                    return (i[e] = t[e]), i;
                                                }, {});
                                                return (e.price = new (i())(e.price)), e;
                                            })(t);
                                        }),
                                ];
                            });
                        });
                    }),
                    (t.prototype.setNFTState = function (t, i, e) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (n) {
                                return [2, this.contract.methods.setNFTState(i.toString(), o(o({}, e), {price: e.price.toString()})).send({from: t})];
                            });
                        });
                    }),
                    (t.prototype.setMintFee = function (t, i) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (e) {
                                return [2, this.contract.methods.setMintFee(i.toString()).send({from: t})];
                            });
                        });
                    }),
                    (t.prototype.mint = function (t, i, e, n, r, o) {
                        return this.contract.methods.mint(t, i, e, n, r).send({from: t, value: o.toString()});
                    }),
                    (t.prototype.buyNFT = function (t, i, e) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return [4, this.contract.methods.buyNFT(i).send({from: t, value: e.toString()})];
                                    case 1:
                                        return [2, n.sent()];
                                }
                            });
                        });
                    }),
                    (t.prototype.ownerOf = function (t) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (i) {
                                switch (i.label) {
                                    case 0:
                                        return [4, this.contract.methods.ownerOf(t.toString()).call()];
                                    case 1:
                                        return [2, i.sent()];
                                }
                            });
                        });
                    }),
                    t
                );
            })(),
            a = (function () {
                function t(t) {
                    this.contract = t;
                }
                return (
                    (t.prototype.mintToken = function (t, i, e, n, r, o) {
                        return s(this, void 0, void 0, function () {
                            var s;
                            return h(this, function (h) {
                                return (
                                    (s = this.contract.mint(t, i, e, n, r, o)),
                                    [
                                        2,
                                        new Promise(function (t, i) {
                                            s.on("receipt", function (e) {
                                                e.events ? t(e.events.Transfer.returnValues.tokenId) : i(new Error("this path assumed impossible"));
                                            }),
                                                s.on("error", function (t) {
                                                    return i(t);
                                                });
                                        }),
                                    ]
                                );
                            });
                        });
                    }),
                    (t.prototype.markForSale = function (t, i, e) {
                        return s(this, void 0, void 0, function () {
                            var n, r;
                            return h(this, function (s) {
                                switch (s.label) {
                                    case 0:
                                        return [4, this.contract.nftState(i)];
                                    case 1:
                                        return (n = s.sent()), (r = o(o({}, n), {isTrading: !0, price: e})), [4, this.contract.setNFTState(t, i, r)];
                                    case 2:
                                        return [2, s.sent()];
                                }
                            });
                        });
                    }),
                    (t.prototype.changeSalePrice = function (t, i, e) {
                        return s(this, void 0, void 0, function () {
                            var n, r;
                            return h(this, function (s) {
                                switch (s.label) {
                                    case 0:
                                        return [4, this.contract.nftState(i)];
                                    case 1:
                                        return (n = s.sent()), (r = o(o({}, n), {price: e})), [4, this.contract.setNFTState(t, i, r)];
                                    case 2:
                                        return [2, s.sent()];
                                }
                            });
                        });
                    }),
                    (t.prototype.buyNFT = function (t, i, e) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return [4, this.contract.buyNFT(t, i, e)];
                                    case 1:
                                        return [2, n.sent()];
                                }
                            });
                        });
                    }),
                    (t.prototype.mintFee = function () {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (t) {
                                return [2, this.contract.mintFee()];
                            });
                        });
                    }),
                    (t.prototype.getTokenSaleStatus = function (t) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (i) {
                                switch (i.label) {
                                    case 0:
                                        return [4, this.contract.nftState(t)];
                                    case 1:
                                        return [2, i.sent().isTrading];
                                }
                            });
                        });
                    }),
                    (t.prototype.getTokenPrice = function (t) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (i) {
                                switch (i.label) {
                                    case 0:
                                        return [4, this.contract.nftState(t)];
                                    case 1:
                                        return [2, i.sent().price];
                                }
                            });
                        });
                    }),
                    (t.prototype.getTokenOwner = function (t) {
                        return s(this, void 0, void 0, function () {
                            return h(this, function (i) {
                                return [2, this.contract.ownerOf(t)];
                            });
                        });
                    }),
                    t
                );
            })();
    })(),
        (tamtam = n);
})();
export default tamtam