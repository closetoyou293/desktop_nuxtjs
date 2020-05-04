'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Setting = new Schema({
    of: { type: Schema.Types.ObjectId, ref: 'Users' },
    theme: {
        dark: { type: Boolean, default: true },
        effect: { type: Boolean, default: true },
        color: { type: String, default: '#efbb35' },
        background: { type: String, default: '/image/bg1.png' }
    }
});

module.exports = Setting;
//# sourceMappingURL=setting.js.map