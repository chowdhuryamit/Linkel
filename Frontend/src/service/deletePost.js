export const handleDeletePost = async ({ id,axios,toast}) => {
  try {
    const Id = id.toString();
    const res = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/u3/delete/user/post?id=${Id}`,
      { withCredentials: true }
    );
    if (res.data.success) {
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
