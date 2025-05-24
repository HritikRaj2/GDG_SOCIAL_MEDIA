package com.GDGSocialMedia.services;

import com.GDGSocialMedia.models.User;

import java.util.List;

public interface UserService {

    public User registerUser(User user);

    public User findUserById(Integer userId) throws Exception;

    public User findUserByEmail(String email);

    public User followUser(Integer userid1, Integer userid2) throws Exception;

    public User updateUser(User user,Integer userId) throws Exception;

    public List<User> searchUser(String query);
}
