export const getUserProfile = async ({axios,userId,setUserData,setMessage}) => {
    try {
        const res= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/u2/user/profile?userId=${userId}`,{withCredentials:true});
        if(res.data.success){
            setUserData(res.data.userData);
        }
        else{
            setUserData(null);
            setMessage(res.data.message);
        }
    } catch (error) {
        setUserData(null);
        setMessage(res.data.message);
    }
};
