package com.GDGSocialMedia.controller;


import com.GDGSocialMedia.models.Comment;
import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.services.CommentService;
import com.GDGSocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/comments/post/{postId}")
    public Comment createComment (@RequestBody Comment comment, @RequestHeader ("Authorization") String jwt,@PathVariable Integer postId) throws Exception {

        User user=userService.findUserByJwt(jwt);

        Comment createdComment=commentService.createComment(comment ,postId,user.getId());


        return createdComment;
    }

    @PutMapping("/api/comments/like/{commentId}")
    public Comment likeComment (@RequestHeader ("Authorization") String jwt,@PathVariable Integer commentId) throws Exception {

        User user=userService.findUserByJwt(jwt);

        Comment likeComment=commentService.likeComment(commentId ,user.getId());


        return likeComment;
    }
}
