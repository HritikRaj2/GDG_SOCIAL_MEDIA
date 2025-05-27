package com.GDGSocialMedia.services;

import com.GDGSocialMedia.config.JwtProvider;
import com.GDGSocialMedia.models.User;
import com.GDGSocialMedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {

        User newUser= new User();
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPassword(user.getPassword());
        newUser.setId(user.getId());
        User savedUser=userRepository.save(newUser);
        return savedUser;
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }

    @Override
    public User findUserById(Integer userId) throws Exception {
        Optional<User> user=userRepository.findById(userId);
        if(user.isPresent()){
            return user.get();
        }
        throw new Exception("User not exist"+ userId);
    }

    @Override
    public User findUserByEmail(String email) {
        User user=userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User followUser(Integer reqUserId, Integer userid2) throws Exception {
        User reqUser=findUserById(reqUserId);
        User user2=findUserById(userid2);

        user2.getFollowers().add(reqUser.getId());
        reqUser.getFollowing().add(user2.getId());

        userRepository.save(reqUser);
        userRepository.save(user2);

        return reqUser;
    }

    @Override
    public User updateUser(User user, Integer userId) throws Exception {
        Optional<User> user1= userRepository.findById(userId);
        if(user1.isEmpty()){
            throw new Exception("user not exist with id"+ userId);
        }
        User oldUser=user1.get();

        if(user.getFirstName()!=null){
            oldUser.setFirstName(user.getFirstName());
        }
        if(user.getLastName()!=null){
            oldUser.setLastName(user.getLastName());
        }
        if(user.getEmail()!=null){
            oldUser.setEmail(user.getEmail());
        }
        if(user.getGender()!=null){
            oldUser.setGender(user.getGender());
        }

        User updatedUser= userRepository.save(oldUser);

        return updatedUser;
    }

    @Override
    public List<User> searchUser(String query) {
        return userRepository.searchUser(query);
    }

    @Override
    public User findUserByJwt(String jwt){
        String email= JwtProvider.getEmailFromToken(jwt);
        User user=userRepository.findByEmail(email);

        return user;
    }
}
