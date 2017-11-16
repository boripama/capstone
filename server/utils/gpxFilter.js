// https://scotch.io/tutorials/express-file-uploads-with-multer

const gpxFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.gpx$/)) {
    return cb(new Error('Only gpx files are allowed'), false);
  }
  cb(null, true);
};

module.exports = gpxFilter;
