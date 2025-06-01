package com.GDGSocialMedia.request;


import com.GDGSocialMedia.models.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class CreateChatRequest {

    private Integer userId;


}
