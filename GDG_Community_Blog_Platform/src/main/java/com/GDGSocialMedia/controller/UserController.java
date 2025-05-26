package com.GDGSocialMedia.controller;


import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.repository.UserRepository;
import com.GDGSocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;


    @GetMapping("/api/allusers")
    public ResponseEntity<?> getAllUsers(){
        List<User> all=userService.getAll();
        if(all !=null && !all.isEmpty()){
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping("/save")
    public User createUser(@RequestBody User user){
        User savedUser=userService.registerUser(user);
        return savedUser;
    }

    @GetMapping("/api/user/{userId}")
    public User getUserById(@PathVariable("userId") Integer id) throws Exception{
        User user=userService.findUserById(id);
        return user;

    }

    @PutMapping("/api/users/{userId}")
    public User updateUser(@RequestBody User user , @PathVariable Integer userId) throws Exception{
        User updatedUser=userService.updateUser(user, userId);
        return updatedUser;
    }

    @PutMapping("/api/user/follow/{userId1}/{userId2}")
    public User followUserHandler(@PathVariable Integer userId1 , @PathVariable Integer userId2) throws Exception{
        User user= userService.followUser(userId1,userId2);
        return user;
    }


    @GetMapping("/api/users/search")
    public List<User> searchUser(@RequestParam("query") String query){
        List<User> users=userService.searchUser(query);
        return users;
    }



}
