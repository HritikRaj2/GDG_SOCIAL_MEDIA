package com.GDGSocialMedia.models;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer Id;

    private String chat_name;

    private String chat_image;


    @ManyToMany
    private List<User> users=new ArrayList<>();

    private LocalDateTime timestamp;


}
