import cloudinary from 'cloudinary';
export function uploads(file, public_id, overwrite, invalidate) {
  return new Promise(resolve => {
    cloudinary.v2.uploader.upload(file, {
      public_id,
      overwrite,
      invalidate,
      resource_type: 'auto' // zip, images
    }, (error, result) => {
      if (error) resolve(error);
      resolve(result);
    });
  });
}
export function videoUpload(file, public_id, overwrite, invalidate) {
  return new Promise(resolve => {
    cloudinary.v2.uploader.upload(file, {
      public_id,
      overwrite,
      invalidate,
      chunk_size: 50000,
      resource_type: 'video'
    }, (error, result) => {
      if (error) resolve(error);
      resolve(result);
    });
  });
}
//# sourceMappingURL=cloudinary-upload.js.map