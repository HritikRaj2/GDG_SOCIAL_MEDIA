package com.GDGSocialMedia.dto;

import com.GDGSocialMedia.models.Post;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostResponse {
    private Integer id;
    private String caption;
    private String image;
    private String video;
    private LocalDateTime createdAt;
    private UserResponse user;
    private boolean liked;
    private int likes;

    @Data
    public static class UserResponse {
        private Integer id;
        private String firstName;
        private String lastName;
        private String email;
        private String profilePicture;
    }

    public static PostResponse fromPost(Post post) {
        PostResponse response = new PostResponse();
        response.setId(post.getId());
        response.setCaption(post.getCaption());
        response.setImage(post.getImage());
        response.setVideo(post.getVideo());
        response.setCreatedAt(post.getCreatedAt());
        response.setLiked(post.getLiked() != null && !post.getLiked().isEmpty());
        response.setLikes(post.getLiked() != null ? post.getLiked().size() : 0);

        if (post.getUser() != null) {
            UserResponse userResponse = new UserResponse();
            userResponse.setId(post.getUser().getId());
            userResponse.setFirstName(post.getUser().getFirstName());
            userResponse.setLastName(post.getUser().getLastName());
            userResponse.setEmail(post.getUser().getEmail());
            userResponse.setProfilePicture(post.getUser().getProfilePicture());
            response.setUser(userResponse);
        }

        return response;
    }
} 