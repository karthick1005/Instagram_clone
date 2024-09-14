import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../Firebase/Firebase";
import { deleteObject, ref } from "firebase/storage";

const uploadposttodb = async (userid, img, caption, username) => {
    try {
        const newpost = {
            caption: caption,
            img: [img],
            likes: [],
            username: username,
            userid: userid,
            time: Timestamp.now()
        }
        console.log(newpost);

        let res = await addDoc(collection(firestore, "posts"), newpost)
        console.log(res.id);
        console.log(userid)
        await updateDoc(doc(firestore, "users", userid), { posts: arrayUnion(res.id) })


        return true;
    } catch (error) {
        console.log(error);

    }
}
const removeposttodb = async (postid, userid, img) => {
    try {
        await updateDoc(doc(firestore, "users", userid), { posts: arrayRemove(postid) });
        await deleteFile(img[0]);
        await deleteDoc(doc(firestore, "posts", postid))
        return true
    } catch (error) {
        console.log(error);

    }
}
const extractFilePath = (downloadURL) => {
    console.log(downloadURL);

    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/instagramclone-78258.appspot.com/o/";
    if (downloadURL.startsWith(baseUrl)) {
        let filePath = downloadURL.replace(baseUrl, "");
        const queryIndex = filePath.indexOf("?");
        if (queryIndex !== -1) {
            filePath = decodeURIComponent(filePath.substring(0, queryIndex));
        }
        return filePath;
    }
    throw new Error("Invalid download URL");
};

// Function to delete the file
const deleteFile = async (downloadURL) => {
    try {
        const filePath = extractFilePath(downloadURL);
        const fileRef = ref(storage, filePath);
        await deleteObject(fileRef);
        console.log("File deleted successfully");
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};
export { uploadposttodb, removeposttodb }