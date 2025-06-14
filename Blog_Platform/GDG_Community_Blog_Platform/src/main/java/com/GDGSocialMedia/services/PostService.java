package com.GDGSocialMedia.services;

import com.GDGSocialMedia.models.Post;

import java.util.List;

public interface PostService {
    Post createNewPost(Post post,Integer userId) throws Exception;

    String deletePost(Integer postId, Integer userId) throws Exception;

    List<Post> findPostByUserId(Integer userId);

    Post findPostById(Integer postId) throws Exception;

    List<Post> findAllPost();

    List<Post> findRecentPosts(int limit);

    Post savedPost(Integer postId,Integer userId) throws Exception;

    Post likePost(Integer postId , Integer userId) throws Exception;
}
