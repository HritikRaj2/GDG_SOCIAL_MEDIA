package com.GDGSocialMedia.controller;

import com.GDGSocialMedia.dto.UserResponse;
import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.repository.UserRepository;
import com.GDGSocialMedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/api/allusers")
    public ResponseEntity<?> getAllUsers() {
        List<User> all = userService.getAll();
        if (all != null && !all.isEmpty()) {
            List<UserResponse> response = all.stream()
                    .map(UserResponse::fromUser)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/api/user/{userId}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable("userId") Integer id) throws Exception {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(UserResponse.fromUser(user), HttpStatus.OK);
    }

    @PutMapping("/api/users")
    public ResponseEntity<UserResponse> updateUser(
            @RequestHeader("Authorization") String jwt,
            @RequestBody User user) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        User updatedUser = userService.updateUser(user, reqUser.getId());
        return new ResponseEntity<>(UserResponse.fromUser(updatedUser), HttpStatus.OK);
    }

    @PutMapping("/api/user/follow/{userId2}")
    public ResponseEntity<UserResponse> followUserHandler(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Integer userId2) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        User user = userService.followUser(reqUser.getId(), userId2);
        return new ResponseEntity<>(UserResponse.fromUser(user), HttpStatus.OK);
    }

    @GetMapping("/api/users/search")
    public ResponseEntity<List<UserResponse>> searchUser(
            @RequestParam("query") String query) {
        List<User> users = userService.searchUser(query);
        List<UserResponse> response = users.stream()
                .map(UserResponse::fromUser)
                .collect(Collectors.toList());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/api/users/profile")
    public ResponseEntity<UserResponse> getUserFromToken(
            @RequestHeader("Authorization") String jwt) {
        User user = userService.findUserByJwt(jwt);
        return new ResponseEntity<>(UserResponse.fromUser(user), HttpStatus.OK);
    }
}