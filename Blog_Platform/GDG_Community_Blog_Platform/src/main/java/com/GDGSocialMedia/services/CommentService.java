package com.GDGSocialMedia.services;

import com.GDGSocialMedia.models.Comment;
import org.hibernate.annotations.Comments;

public interface CommentService {

    public Comment createComment(Comment comment,Integer postId,Integer userId) throws Exception;

    public Comment findCommentById(Integer CommentId) throws Exception;
    public  Comment likeComment(Integer commentId,Integer userId) throws Exception;
}
