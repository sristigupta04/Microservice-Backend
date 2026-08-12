export const getUserById = async (
  userId: string,
  token: string
) => {
  try {
    const response = await axios.get(
      `${env.USER_SERVICE_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "User service request failed",
    };
  }
};