package com.GDGSocialMedia.services;

import com.GDGSocialMedia.models.Post;
import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.repository.PostRepository;
import com.GDGSocialMedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Post createNewPost(Post post, Integer userId) throws Exception {
        User user=userService.findUserById(userId);

        Post newPost=new Post();
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setVideo(post.getVideo());
        newPost.setUser(user);
        return postRepository.save(newPost);
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws Exception {

        Post post = findPostById(postId);
        User user=userService.findUserById(userId);

        if(post.getUser().getId()!=user.getId()){
            throw new Exception("You are try to deleting other user post");
        }
        postRepository.delete(post);
        return "post deleted sucessfully";
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {

        return postRepository.findPostByUserId(userId);


    }

    @Override
    public Post findPostById(Integer postId) throws Exception {

        Optional<Post> optional=postRepository.findById(postId);
        if(optional.isEmpty()){
            throw new Exception("Post not found with this id "+postId);
        }



        return optional.get();
    }

    @Override
    public List<Post> findAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post savedPost(Integer postId, Integer userId) throws Exception {

        Post post=findPostById(postId);
        User user=userService.findUserById(userId);
        if(user.getSavedPost().contains(post)){
            user.getSavedPost().remove(post);
        }else{
            user.getSavedPost().add(post);
        }
        userRepository.save(user);
        return post;
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws Exception{
        Post post = findPostById(postId);
        User user=userService.findUserById(userId);
        if(post.getLiked().contains(user)){
            post.getLiked().remove(user);
        }else{
            post.getLiked().add(user);
        }
        return postRepository.save(post);
    }
}
