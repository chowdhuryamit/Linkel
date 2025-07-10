 export const fetchPosts = async ({loadingRef,axios,pageRef,limit,setPosts,setHasMore,toast}) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/u2/get/public/posts?page=${pageRef.current}&limit=${limit}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log(res.data);
        
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