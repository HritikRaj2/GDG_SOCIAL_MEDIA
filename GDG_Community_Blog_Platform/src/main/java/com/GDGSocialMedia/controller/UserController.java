package com.GDGSocialMedia.controller;


import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.repository.UserRepository;
import com.GDGSocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserService userService;


    @PostMapping("/save")
    public User createUser(@RequestBody User user){
        User savedUser=userService.registerUser(user);
        return savedUser;
    }

    @GetMapping("/user/{userId}")
    public User getUserById(@PathVariable("userId") Integer id) throws Exception{
        User user=userService.findUserById(id);
        return user;

    }

    @PutMapping("/users/{userId}")
    public User updateUser(@RequestBody User user , @PathVariable Integer userId) throws Exception{
        User updatedUser=userService.updateUser(user, userId);
        return updatedUser;
    }


    public User

}
