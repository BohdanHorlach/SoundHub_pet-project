const Ffmpeg = require("fluent-ffmpeg");

class AudioConverter{

  async convertToMp3(inputPath, outputPath, format) {
    await new Promise((resolve, reject) => {
      Ffmpeg(inputPath)
        .toFormat(format)
        .on("error", reject)
        .on("end", resolve)
        .save(outputPath);
    });
  }
}

module.exports = new AudioConverter();