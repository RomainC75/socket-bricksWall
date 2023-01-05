"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toDate = void 0;
var _ = require("lodash");
var luxon_1 = require("luxon");
/**
 * parse value to date
 * a wrapper of luxon date parsers to allow taking multiple formats
 * @param val
 * @param {string | string[]} format
 */
function toDate(val, format) {
    var formats = _.isArray(format) ? format : [format];
    var dt;
    for (var _i = 0, formats_1 = formats; _i < formats_1.length; _i++) {
        var format_1 = formats_1[_i];
        dt = format_1 ? luxon_1.DateTime.fromFormat(val, format_1) : luxon_1.DateTime.fromISO(val);
        if (dt.isValid) {
            break;
        }
    }
    return dt;
}
exports.toDate = toDate;
//# sourceMappingURL=utils.js.map