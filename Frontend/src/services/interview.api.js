import { api } from "../features/auth/services/auth.api";

export async function generateInterviewReport(formData) {
  try {
    const response = await api.post("/interview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}