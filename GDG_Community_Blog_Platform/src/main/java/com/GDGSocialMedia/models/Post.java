package com.GDGSocialMedia.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;

    private String caption;
    private String image;
    private String video;

    @ManyToOne
    @JsonIgnore
    private User user;

    private LocalDateTime createdAt;

    @OneToMany
    @JsonIgnore
    private List<User> liked = new ArrayList<>();

    @OneToMany
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();


}
