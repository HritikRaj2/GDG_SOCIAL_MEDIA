package com.GDGSocialMedia.controller;


import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.repository.UserRepository;
import com.GDGSocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;
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

    @PutMapping("/api/users")
    public User updateUser(@RequestHeader("Authorization")String jwt ,@RequestBody User user ) throws Exception{
        User reqUser=userService.findUserByJwt(jwt);
        User updatedUser=userService.updateUser(user, reqUser.getId());
        return updatedUser;
    }

    @PutMapping("/api/user/follow/{userId2}")
    public User followUserHandler(@RequestHeader("Authorization")String jwt,@PathVariable Integer userId2) throws Exception{
        User reqUser=userService.findUserByJwt(jwt);
        User user= userService.followUser(reqUser.getId(),userId2);
        return user;
    }


    @GetMapping("/api/users/search")
    public List<User> searchUser(@RequestParam("query") String query){
        List<User> users=userService.searchUser(query);
        return users;
    }

    @GetMapping("/api/users/profile")
    public User getUserFromToken(@RequestHeader ("Authorization") String jwt){

        User user=userService.findUserByJwt(jwt);

        user.setPassword(null);
//        String email=
//        System.out.println("jwt---- "+jwt);
        return user;
    }






}
