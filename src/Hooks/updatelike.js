import { arrayRemove, arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore"
import { firestore } from "../Firebase/Firebase"

const Updatelikes = async (id, userid, bool) => {
    try {
        await updateDoc(doc(firestore, "posts", id), { likes: bool ? arrayUnion(userid) : arrayRemove(userid) });
        return true;
    } catch (error) {
        return false;
    }


}
const Updatefollowers = async (myid, followingid, bool) => {
    try {
        await updateDoc(doc(firestore, "users", myid), { following: bool ? arrayUnion(followingid) : arrayRemove(followingid) })
        await updateDoc(doc(firestore, "users", followingid), { follower: bool ? arrayUnion(myid) : arrayRemove(myid) })
        return bool;

    } catch (error) {
        console.log(error);

    }
}

export { Updatelikes, Updatefollowers }