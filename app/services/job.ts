import api from "./api";
import { TBookingHireJobApi } from "@/app/types";
// Lấy menu loại công việc
export const getJobMenu = async () => {
    const response = await api.get("cong-viec/lay-menu-loai-cong-viec");
    return response.data;
};

export const getJobsByCategory = async (categoryId: number) => {
    const response = await api.get(`cong-viec/lay-danh-sach-cong-viec-theo-loai/${categoryId}`);
    return response.data;
};

export const getJobsByName = async (name: string) => {
    const response = await api.get(`cong-viec/lay-danh-sach-cong-viec-theo-ten/${name}`);
    return response.data;
};

export const getJobsByDetailType = async (detailTypeId: number) => {
    const response = await api.get(`cong-viec/lay-cong-viec-theo-chi-tiet-loai/${detailTypeId}`);
    return response.data;
};

export const getJobDetail = async (id: number) => {
    const response = await api.get(`cong-viec/lay-cong-viec-chi-tiet/${id}`);
    return response.data;
};

export const getCommentsByJob = async (jobId: number) => {
    const response = await api.get(`binh-luan/lay-binh-luan-theo-cong-viec/${jobId}`);
    return response.data;
};

export const postComment = async (data: any) => {
    const response = await api.post("binh-luan", data);
    return response.data;
};

export const hireJob = async (data: any) => {
    const response = await api.post("thue-cong-viec", data);
    return response.data;
};

export const getHiredJobs = async (): Promise<TBookingHireJobApi[]> => {
    const response = await api.get("thue-cong-viec/lay-danh-sach-da-thue");
    return response.data.content;
};
