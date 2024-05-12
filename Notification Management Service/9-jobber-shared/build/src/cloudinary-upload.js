"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoUpload = exports.uploads = void 0;
var tslib_1 = require("tslib");
var cloudinary_1 = tslib_1.__importDefault(require("cloudinary"));
function uploads(file, public_id, overwrite, invalidate) {
    return new Promise(function (resolve) {
        cloudinary_1.default.v2.uploader.upload(file, {
            public_id: public_id,
            overwrite: overwrite,
            invalidate: invalidate,
            resource_type: 'auto' // zip, images
        }, function (error, result) {
            if (error)
                resolve(error);
            resolve(result);
        });
    });
}
exports.uploads = uploads;
function videoUpload(file, public_id, overwrite, invalidate) {
    return new Promise(function (resolve) {
        cloudinary_1.default.v2.uploader.upload(file, {
            public_id: public_id,
            overwrite: overwrite,
            invalidate: invalidate,
            chunk_size: 50000,
            resource_type: 'video'
        }, function (error, result) {
            if (error)
                resolve(error);
            resolve(result);
        });
    });
}
exports.videoUpload = videoUpload;
//# sourceMappingURL=cloudinary-upload.js.map