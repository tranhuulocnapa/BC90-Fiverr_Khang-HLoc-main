export interface TUser {
    id: number;
    name: string;
    email: string;
    password: string;
    phone: string | null;
    birthday: string;
    avatar: string | null;
    gender: boolean;
    role: string;
    skill: string[] | null;
    certification: string[] | null;
}

export type TCongViec = {
    id: number;
    tenCongViec: string;
    danhGia: number;
    giaTien: number;
    hinhAnh: string;
    moTa: string;
    moTaNgan: string;
    saoCongViec: number;
    maChiTietLoaiCongViec: number;
    nguoiTao: number;
};

export type TJob = {
    id: number;
    congViec: TCongViec;
    tenLoaiCongViec: string;
    tenNhomChiTietLoai: string;
    tenChiTietLoai: string;
    tenNguoiTao: string;
    avatar: string;
};
export interface TSubtype {
    id: number;
    tenChiTiet: string;
    hinhAnh: string;
    maLoaiCongviec: number;
}
export type TComment = {
    id: number;
    ngayBinhLuan: string;
    noiDung: string;
    saoBinhLuan: number;
    tenNguoiBinhLuan: string;
    avatar: string;
};

export type TJobDetail = TJob & {
    chiTietLoai: any[];
};

export type TBookingHireJob = {
    id: number;
    maCongViec: number;
    congViec: TCongViec;
    maNguoiThue: number;
    ngayThue: string;
    hoanThanh: boolean;
};

export type AxiosResponse<T> = {
    content: T;
    message: string;
    statusCode: number;
};

export interface TBookingHireJobApi {
    id: number;
    maCongViec: number;
    maNguoiThue: number;
    ngayThue: string;
    hoanThanh: boolean;
    congViec: {
        tenCongViec: string;
        danhGia: number;
        giaTien: number;
        hinhAnh: string;
        moTa: string;
        moTaNgan: string;
        saoCongViec: number;
    };
}
export interface TBookingHireJobViewModel {
    id: number;
    maNguoiThue: number;
    tenCongViec: string;
    danhGia: number;
    giaTien: number;
    hinhAnh: string;
    moTa: string;
    moTaNgan: string;
    saoCongViec: number;
}
