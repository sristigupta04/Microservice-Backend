export const getUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = String(req.params.id);

    const user = await getUserById(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(
      error.response?.status || 500
    ).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to get user",
    });
  }
};