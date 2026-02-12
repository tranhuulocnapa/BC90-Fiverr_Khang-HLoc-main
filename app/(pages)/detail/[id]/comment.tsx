"use client";
import React, { useRef, useEffect, useState } from "react";
import { StarFilled, StarOutlined, UserOutlined } from "@ant-design/icons";
import { postComment, getCommentsByJob } from "@/app/services/job";
import { TComment } from "@/app/types";
import { toast } from "sonner";

type CommentSectionProps = {
    jobId: string;
    initialComments: TComment[];
};

const CommentSection = ({ jobId, initialComments }: CommentSectionProps) => {
    const [comments, setComments] = useState<TComment[]>(initialComments);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAuthNotice, setShowAuthNotice] = useState(false);
    const [user, setUser] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkUser = () => {
            const storedUser = localStorage.getItem("USER_LOGIN");
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };
        checkUser();
        const interval = setInterval(checkUser, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchComments = async () => {
        try {
            const commentsData = await getCommentsByJob(Number(jobId));
            setComments(commentsData.content || []);
        } catch (error) {
            console.error("Failed to fetch comments:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => { fetchComments(); }, [jobId]);

    const handlePostComment = async () => {
        const currentUser = localStorage.getItem("USER_LOGIN");
        if (!currentUser) {
            setShowAuthNotice(true);
            setTimeout(() => {
                setShowAuthNotice(false);
                window.dispatchEvent(new CustomEvent("OPEN_AUTH_MODAL", { detail: { mode: "login" } }));
            }, 2000);
            return;
        }
        if (!newComment.trim() || isSubmitting) return;

        const parsedUser = JSON.parse(currentUser);
        const userId = parsedUser?.content?.user?.id;

        if (!userId) { setShowAuthNotice(true); return; }

        setIsSubmitting(true);
        try {
            const payLoad = {
                id: 0,
                MaCongViec: Number(jobId),
                MaNguoiBinhLuan: Number(userId),
                NgayBinhLuan: new Date().toISOString(),
                noiDung: newComment.trim(),
                saoBinhLuan: rating,
            };
            await postComment(payLoad);
            setNewComment("");
            setRating(0);
            fetchComments();
        } catch {
            toast.error("Failed to post comment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">{comments.length} Reviews</h2>
                {comments.map((comment) => (
                    <div key={comment.id} className="border-t py-4">
                        <div className="flex items-center mb-2">
                            {comment.avatar ? <img src={comment.avatar} alt={comment.tenNguoiBinhLuan} className="w-10 h-10 rounded-full" /> : <UserOutlined size={20} className="text-[#65727D] " />}
                            <div>
                                <h5 className="font-bold px-4 text-black leading-tight text-sm sm:text-base">{comment.tenNguoiBinhLuan}</h5>
                                <p className="text-xs px-4 text-[#65727D]  font-medium">{new Date(comment.ngayBinhLuan).toLocaleDateString()}</p>
                                <div className="flex items-center px-4 text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        i < comment.saoBinhLuan ? <StarFilled key={i} /> : <StarOutlined key={i} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700">{comment.noiDung}</p>
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Leave some comments</h2>
                <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} onClick={() => setRating(i + 1)} className="cursor-pointer text-yellow-500">
                            {i < rating ? <StarFilled /> : <StarOutlined />}
                        </span>
                    ))}
                    <span className="ml-2 font-bold">Rating</span>
                </div>
                <textarea
                    className="w-full p-4 border rounded-lg"
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button
                    onClick={handlePostComment}
                    className="mt-4 px-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
                >
                    Comment
                </button>
            </div>
        </>
    );
};

export default CommentSection;
