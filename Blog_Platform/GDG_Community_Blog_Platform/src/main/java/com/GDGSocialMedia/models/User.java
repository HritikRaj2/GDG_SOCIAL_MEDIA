package com.GDGSocialMedia.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;

    @JsonIgnore
    private String password;

    @Column(name = "followers_list", columnDefinition = "TEXT")
    private String followersJson = "[]";

    @Column(name = "following_list", columnDefinition = "TEXT")
    private String followingJson = "[]";

    private String gender;

    @ManyToMany
    @JsonIgnore
    private List<Post> savedPost = new ArrayList<>();

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public List<Post> getSavedPost() { return savedPost; }
    public void setSavedPost(List<Post> savedPost) { this.savedPost = savedPost; }

    public String getProfilePicture() { return ""; }

    // Followers helpers
    public List<Integer> getFollowers() {
        return parseJson(followersJson);
    }

    public void setFollowers(List<Integer> followers) {
        this.followersJson = toJson(followers);
    }

    public String getFollowersJson() { return followersJson; }
    public void setFollowersJson(String followersJson) { this.followersJson = followersJson; }

    // Following helpers
    public List<Integer> getFollowing() {
        return parseJson(followingJson);
    }

    public void setFollowing(List<Integer> following) {
        this.followingJson = toJson(following);
    }

    public String getFollowingJson() { return followingJson; }
    public void setFollowingJson(String followingJson) { this.followingJson = followingJson; }

    private List<Integer> parseJson(String json) {
        if (json == null || json.equals("[]") || json.isEmpty()) return new ArrayList<>();
        try {
            json = json.replace("[", "").replace("]", "").trim();
            if (json.isEmpty()) return new ArrayList<>();
            List<Integer> list = new ArrayList<>();
            for (String s : json.split(",")) {
                list.add(Integer.parseInt(s.trim()));
            }
            return list;
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    private String toJson(List<Integer> list) {
        if (list == null || list.isEmpty()) return "[]";
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < list.size(); i++) {
            sb.append(list.get(i));
            if (i < list.size() - 1) sb.append(",");
        }
        sb.append("]");
        return sb.toString();
    }
}