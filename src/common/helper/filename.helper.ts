export class Helper {
  static customFileName(req, file, cb) {
    // console.log(file);
    const originalName = file.originalname.split('.')[0];
    const extName = file.originalname.split('.')[1];
    cb(null, Date.now() + '-' + originalName + '.' + extName);
  }
}
