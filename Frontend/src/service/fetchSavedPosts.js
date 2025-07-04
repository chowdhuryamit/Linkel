export const fetchSavedPosts = async ({
  loadingRefSavedPost,
  axios,
  pageRefSavedPost,
  limitSavedPost,
  setSavedPost,
  setHasMoreSavedPost,
  toast,
}) => {
    
  if (loadingRefSavedPost.current) return;
  loadingRefSavedPost.current = true;
  try {
    const res = await axios.get(
      `http://localhost:8000/api/u2/get/user/savedPosts?page=${pageRefSavedPost.current}&limit=${limitSavedPost}`,
      { withCredentials: true }
    );
    //console.log(res);
    
    if (res.data.success) {
      setSavedPost((prev) => [...prev, ...res.data.posts]);
      setHasMoreSavedPost(res.data.hasMore);
      pageRefSavedPost.current += 1;
      console.log(pageRefSavedPost.current);
      
    }
    else{
        toast.warn(res.data.message);
    }
  } catch (error) {
    console.log(error);
    
    toast.error(error.response.data.message);
  } finally {
    loadingRefSavedPost.current = false;
  }
};
