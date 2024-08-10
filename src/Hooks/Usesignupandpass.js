import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Profile_pic from '../assets/profile_pic';
import { doc, setDoc, getDoc, getDocs, where, query, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, firestore } from '../Firebase/Firebase';
import { showerror, showsuccessalert } from '../Pages/Component/Toast/toast';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
const useSignInWithEmailAndPass = () => {
    const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const signup = async (inputs) => {
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname) {
            console.log("Fill all the fields");
            showerror("Fill all the fields");
            return null;

        }
        try {
            const newuser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
            if (!newuser && error) {
                console.log(error);
                return null;
            }
            if (newuser) {
                const userDoc = {
                    uid: newuser.user.uid,
                    email: inputs.email,
                    username: inputs.username,
                    fullname: inputs.fullname,
                    bio: "",
                    profilepicurl: "https://firebasestorage.googleapis.com/v0/b/instagramclone-78258.appspot.com/o/profilepic.png?alt=media&token=3f7fde3d-0bdf-4b4a-8d70-a66528fa98f2",
                    follower: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                    saved: []

                }
                await setDoc(doc(firestore, "users", newuser.user.uid), userDoc);
                showsuccessalert("User Created Successfully");
                localStorage.setItem("user-Info", JSON.stringify(userDoc));
                localStorage.setItem("logged", true);

                navigate("/");
                // window.location.reload();


            }
        } catch (error) {
            console.log(error);
        }
    }
    const logins = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            console.log("Fill all the fields");
            showerror("Fill all the fields");
            return null;

        }
        try {
            let res = await signInWithEmailAndPassword(auth, inputs.email, inputs.password);


            if (res) {
                console.log(res);

                let data = await getdatawithuid(res.user.uid)
                console.log(data);

                localStorage.setItem("user-Info", JSON.stringify(data))
                localStorage.setItem("logged", true);


                navigate("/")
                // window.location.reload();
                showsuccessalert("Logged in  Successfully");
            }
        } catch (error) {
            console.log(error);

        }
    }
    return { loading, error, signup, logins }
}

const useGoogleLogin = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const enablelogin = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const newuser = result.user;
                const docsnap = await getDoc(doc(firestore, "users", newuser.uid))
                console.log(docsnap.exists());
                if (!docsnap.exists()) {
                    const userDoc = {
                        uid: newuser.uid,
                        email: newuser.email,
                        username: newuser.displayName,
                        bio: "",
                        profilepicurl: "https://firebasestorage.googleapis.com/v0/b/instagramclone-78258.appspot.com/o/profilepic.png?alt=media&token=3f7fde3d-0bdf-4b4a-8d70-a66528fa98f2",
                        follower: [],
                        following: [],
                        posts: [],
                        createdAt: Date.now(),
                        saved: []
                    }

                    await setDoc(doc(firestore, "users", newuser.uid), userDoc);
                    showsuccessalert("User Created Successfully");
                    localStorage.setItem("user-Info", JSON.stringify(userDoc));
                    localStorage.setItem("logged", true);


                }
                else {
                    localStorage.setItem("user-Info", JSON.stringify(docsnap.data()))
                    localStorage.setItem("logged", true);
                    // window.dispatchEvent("storage");
                    console.log(docsnap.data())
                }
                navigate("/");
                window.location.reload();
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return { enablelogin }
}
const getdata = async (username) => {
    try {
        console.log(username);
        const q = query(collection(firestore, "users"), where("username", "==", username));
        const data = await getDocs(q);
        if (!data.empty) {
            let userdata;
            data.forEach((doc) => {
                userdata = doc.data();
            })
            console.log(userdata);
            return userdata
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null
    }

}
const getdatawithuid = async (id) => {
    try {
        // const q = query(collection(firestore, "users", id));
        const data = await getDoc(doc(firestore, "users", id));
        if (!data.empty) {
            return data.data()
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null
    }

}
const getimagedata = async (id) => {
    console.log(id);
    try {
        const data = await getDoc(doc(firestore, "posts", id));
        if (data.exists()) {
            return data.data();
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}
const getsuggestion = async () => {
    try {
        let res = await getDocs(collection(firestore, "users"))
        let data = [];
        res.forEach((doc) => {
            data.push(doc.data())
        })
        return data;
    } catch (error) {
        console.log(error);
        return null
    }
}
const updatesaved = async (id, bool, postid) => {
    console.log(postid);
    try {
        await updateDoc(doc(firestore, "users", id), { saved: bool ? arrayUnion(postid) : arrayRemove(postid) })
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}
const updateprofile = async (userid, bios, usernames) => {
    try {
        await updateDoc(doc(firestore, "users", userid), { bio: bios, username: usernames })
        return true;
    } catch (error) {
        console.log(error);
        return false

    }
}
export { useSignInWithEmailAndPass, useGoogleLogin, getdata, getimagedata, getdatawithuid, getsuggestion, updatesaved, updateprofile };