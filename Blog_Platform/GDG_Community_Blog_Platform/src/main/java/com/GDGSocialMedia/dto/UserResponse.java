package com.GDGSocialMedia.dto;

import com.GDGSocialMedia.models.User;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserResponse {

    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String profilePicture;
    private List<Integer> followers;
    private List<Integer> following;

    public static UserResponse fromUser(User user) {
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setGender(user.getGender());
        dto.setProfilePicture(user.getProfilePicture());
        dto.setFollowers(user.getFollowers() != null ? user.getFollowers() : new ArrayList<>());
        dto.setFollowing(user.getFollowing() != null ? user.getFollowing() : new ArrayList<>());
        return dto;
    }
}