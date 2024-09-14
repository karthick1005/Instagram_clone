import { addDoc, arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "../Firebase/Firebase"

const getcommentswithid = async (postid) => {
    try {
        let res = await getDocs(collection(firestore, "posts", postid, "comments"));
        let result = [];
        let docsid = []
        res.forEach((docs) => {
            docsid.push(docs.id);
            result.push(docs.data())
        })
        return { result, docsid }
    } catch (error) {
        return null
    }
}
const updatecomments = async (postid, commentid, userid, bool) => {
    try {
        await updateDoc(doc(firestore, "posts", postid, "comments", commentid), { likes: bool ? arrayUnion(userid) : arrayRemove(userid) })
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}
const addnewcomment = async (postid, userid, comments, name, url) => {
    try {
        const newcomment = {
            comment: comments,
            likes: [],
            userid: userid,
            username: name,
            pic: url
        }
        // firestore.collection("posts").doc(postid).collection("comments").add(newcomment).then(docRef => {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        //     .catch(error => {
        //         console.error("Error adding document: ", error);
        //     });
        const postDocRef = doc(firestore, 'posts', postid);
        const commentsCollectionRef = collection(postDocRef, 'comments');
        await addDoc(commentsCollectionRef, newcomment);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
export { getcommentswithid, updatecomments, addnewcomment }