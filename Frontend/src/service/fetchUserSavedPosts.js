import {addSavedPosts} from '../store/authSlice.js'

export const fetchUserSavedPosts = async ({axios,savedPosts,dispatch,toast}) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/u3/get/user/saved/posts?totalPosts=${savedPosts.length}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        res.data.posts.forEach((post) => {
          dispatch(addSavedPosts({ post }));
        });
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };