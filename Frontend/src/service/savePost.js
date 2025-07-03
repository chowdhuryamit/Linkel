
export const savePostFunction = async (axios,postId,toast) => {
    try {
        const res = await axios.patch("http://localhost:8000/api/u2/save/post",{postId},{withCredentials:true});
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