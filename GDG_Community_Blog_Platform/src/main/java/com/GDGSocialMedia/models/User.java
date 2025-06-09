package com.GDGSocialMedia.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    
    @JsonIgnore
    private String password;
    
    private List<Integer> followers = new ArrayList<>();
    private List<Integer> following = new ArrayList<>();
    private String gender;

    @ManyToMany
    @JsonIgnore
    private List<Post> savedPost = new ArrayList<>();

    public User getUser() {
        return user;
    }


//    public User(Integer id, String firstName, String lastName, String email, String password, List<Integer> followers, List<Integer> following, String gender, List<Post> savedPost) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.email = email;
//        this.password = password;
//        this.followers = followers;
//        this.following = following;
//        this.gender = gender;
//        this.savedPost = savedPost;
//    }
//
//    public Integer getId() {
//        return id;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public List<Post> getSavedPost() {
//        return savedPost;
//    }
//
//    public void setSavedPost(List<Post> savedPost) {
//        this.savedPost = savedPost;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public List<Integer> getFollowers() {
//        return followers;
//    }
//
//    public void setFollowers(List<Integer> followers) {
//        this.followers = followers;
//    }
//
//    public List<Integer> getFollowing() {
//        return following;
//    }
//
//    public void setFollowing(List<Integer> following) {
//        this.following = following;
//    }
//
//    public String getGender() {
//        return gender;
//    }
//
//    public void setGender(String gender) {
//        this.gender = gender;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public void setId(Integer id) {
//        this.id = id;
//    }
//
//    public String getProfilePicture() {
//        return "";
//    }
    public User() {
        // Default constructor
    }

}
