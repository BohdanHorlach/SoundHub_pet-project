const { bucket } = require("../config/firebase-config");

class AudioUploader{
  async upload(filePath, outputName){
    const [uploadFile] = await bucket.upload(filePath, {
      destination: `${outputName}`,
      metadata: {
        contentType: "audio/mpeg",
      },
    });

    await uploadFile.makePublic();
    return uploadFile.publicUrl();
  }

  async deleteFileFromFirebase(filename) {
    try {
      await bucket.file(filename).delete();
      console.log(`Deleted file ${filename} from Firebase Storage`);
    } catch (error) {
      console.warn(`Failed to delete ${filename} from Firebase Storage:`, error.message);
    }
  }
}

module.exports = new AudioUploader();