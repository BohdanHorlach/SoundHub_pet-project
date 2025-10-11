const { bucket } = require("../config/firebase-config");

class AudioUploader{
  /**
   * 
   * @param {string} filePath - local path to file
   * @param {string} destination - destination of file
   * @returns {string, string} publicUrl (for use in browsers) and storagePath(for download and delete)
   */
  async upload(filePath, destination){
    const [uploadFile] = await bucket.upload(filePath, {
      destination: `${destination}`,
      metadata: {
        contentType: "audio/mpeg",
        contentDisposition: `attachment; filename="${destination}"`,
      },
    });

    await uploadFile.makePublic();
    const publicUrl = uploadFile.publicUrl();
    
    return { publicUrl, storagePath: destination };
  }


 /**
   * Delete file from Firebase Storage
   * @param {string} storagePath - destenation to file in bucket
   */
 async delete(storagePath) {
  if (!storagePath) {
    console.warn("AudioUploader.delete(): storagePath is empty");
    return;
  }

  try {
    await bucket.file(storagePath).delete();
    console.log(`Deleted file from Firebase Storage: ${storagePath}`);
  } catch (err) {
    if (err.code === 404) {
      console.warn(`File not found in Firebase Storage: ${storagePath}`);
    } else {
      console.error(`Error deleting file ${storagePath}:`, err.message);
    }
  }
}
}

module.exports = new AudioUploader();