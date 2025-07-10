
export const savePostFunction = async (axios,postId,toast) => {
    try {
        const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/u2/save/post`,{postId},{withCredentials:true});
        if(res.data.success){
            toast.success(res.data.message);
        }
        else{
            toast.warn(res.data.message);
        }
    } catch (error) {
        //console.log(error);
        toast.error(error.response.data.message);
    }
}