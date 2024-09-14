import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../Firebase/Firebase";
function generateRandomFileName(extension) {
    const timestamp = Date.now(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 10000); // Random number
    return `file_${timestamp}_${randomNum}.${extension}`;
}
const uploadphotos = async (userid, file) => {
    try {
        const randomFileName = generateRandomFileName("png");
        await uploadBytes(ref(storage, userid + "/" + randomFileName), file);
        // console.log(res);
        let res = await getDownloadURL(ref(storage, userid + "/" + randomFileName));
        return res;

    } catch (error) {
        console.log(error);

    }
}
export { uploadphotos }