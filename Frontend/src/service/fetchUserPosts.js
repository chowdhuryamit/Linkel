import {addPosts} from '../store/authSlice.js'

export const fetchUserPosts = async ({axios,userPosts,dispatch,toast}) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/u3/get/user/posts?totalPosts=${userPosts.length}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        res.data.posts.forEach((post) => {
          dispatch(addPosts({ post }));
        });
      } else {
        toast.warn(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };