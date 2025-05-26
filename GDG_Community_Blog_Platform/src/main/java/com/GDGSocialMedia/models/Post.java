package com.GDGSocialMedia.models;


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
    private User user;

    private LocalDateTime createdAt;

    @OneToMany
    private List<User> liked=new ArrayList<>();

}
