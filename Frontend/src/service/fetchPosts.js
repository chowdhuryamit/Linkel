 export const fetchPosts = async ({loadingRef,axios,pageRef,limit,setPosts,setHasMore,toast}) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      const res = await axios.get(
        `http://localhost:8000/api/u2/get/public/posts?page=${pageRef.current}&limit=${limit}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setPosts((prev) => [...prev, ...res.data.posts]);
        setHasMore(res.data.hasMore);
        pageRef.current += 1;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      loadingRef.current = false;
    }
  };