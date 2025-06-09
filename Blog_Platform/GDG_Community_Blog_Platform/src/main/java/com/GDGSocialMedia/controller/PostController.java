package com.GDGSocialMedia.controller;

import com.GDGSocialMedia.dto.PostResponse;
import com.GDGSocialMedia.models.Post;
import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.response.ApiResponse;
import com.GDGSocialMedia.services.PostService;
import com.GDGSocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.HashMap;

@RestController
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private UserService userService;

    @PostMapping("/api/posts")
    public ResponseEntity<Post> createPost(@RequestHeader("Authorization")String jwt,@RequestBody Post post) throws Exception{
        User reqUser=userService.findUserByJwt(jwt);

        Post createdPost=postService.createNewPost(post,reqUser.getId());
        return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/post/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@RequestHeader("Authorization") String jwt ,@PathVariable Integer postId)throws Exception{
        User reqUser=userService.findUserByJwt(jwt);

        String message=postService.deletePost(postId,reqUser.getId());
        ApiResponse response=new ApiResponse(message,true);
        return new ResponseEntity<ApiResponse>(response,HttpStatus.OK);
    }

    @GetMapping("/api/posts/{postId}")
    public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId)throws Exception{
        Post post=postService.findPostById(postId);
        return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
    }

    @GetMapping("/api/posts/user/{userId}")
    public ResponseEntity<List<Post>> findUserPost(@PathVariable Integer userId){
        List<Post> post=postService.findPostByUserId(userId);
        return new ResponseEntity<List<Post>>(post,HttpStatus.OK);
    }

    @GetMapping("/api/posts")
    public ResponseEntity<List<PostResponse>> findAllPost(@RequestHeader("Authorization") String jwt) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        List<Post> posts = postService.findAllPost();
        // Sort by creation date and limit to 10
        posts.sort((p1, p2) -> p2.getCreatedAt().compareTo(p1.getCreatedAt()));
        List<PostResponse> recentPosts = posts.stream()
            .limit(10)
            .map(PostResponse::fromPost)
            .collect(Collectors.toList());
        return new ResponseEntity<>(recentPosts, HttpStatus.OK);
    }

    @PutMapping("/api/post/{postId}")
    public ResponseEntity<Post> savedPostHandler(@RequestHeader("Authorization")String jwt,@PathVariable Integer postId) throws Exception{
        User reqUser=userService.findUserByJwt(jwt);

        Post post=postService.savedPost(postId,reqUser.getId());
        return new ResponseEntity<Post>(post,HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/post/like/{postId}")
    public ResponseEntity<Post> likePostHandler(@RequestHeader("Authorization")String jwt,@PathVariable Integer postId) throws Exception{
        User reqUser=userService.findUserByJwt(jwt);

        Post post=postService.likePost(postId,reqUser.getId());
        return new ResponseEntity<Post>(post,HttpStatus.OK);
    }





}
