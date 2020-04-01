"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zlib_1 = require("zlib");
const url_1 = require("url");
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const reg = /<h1>(.*)<\/h1>/;
exports.default = (url, headers = {}) => {
    const fetch = url.startsWith('https') ? https_1.default.get : http_1.default.get;
    const options = Object.assign(url_1.parse(url), { headers: Object.assign({ 'Accept-Encoding': 'gzip, deflate' }, headers) });
    return new Promise((resolve, reject) => {
        fetch(options, res => {
            const ce = res.headers['content-encoding'];
            let data = '';
            let op = res;
            if (ce === 'deflate')
                res.pipe(op = zlib_1.createDeflate());
            if (ce === 'gzip')
                res.pipe(op = zlib_1.createGunzip());
            op.on('data', chunk => data += chunk);
            op.once('error', reject);
            op.once('end', () => {
                if (res.statusCode === 400)
                    return reject(new Error(reg.test(data) ? data.match(reg)[1] : data));
                if (res.statusCode !== 200)
                    return reject(new Error(res.statusMessage));
                try {
                    resolve(JSON.parse(data));
                }
                catch (_) {
                    reject(new Error(data));
                }
            });
        });
    });
};
