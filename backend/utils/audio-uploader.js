const { bucket } = require("../config/firebase-config");

class AudioUploader{
  async upload(filePath, outputName){
    const [uploadFile] = await bucket.upload(filePath, {
      destination: `${outputName}`,
      metadata: {
        contentType: "audio/mpeg",
        contentDisposition: `attachment; filename="${outputName}"`,
      },
    });

    await uploadFile.makePublic();
    const publicUrl = uploadFile.publicUrl();
    
    return { publicUrl, storagePath: outputName };
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