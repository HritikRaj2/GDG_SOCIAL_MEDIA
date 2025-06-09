package com.GDGSocialMedia.repository;

import com.GDGSocialMedia.models.Chat;
import com.GDGSocialMedia.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

//    @Query("SELECT c FROM Chat c JOIN c.users u WHERE u.id = :userId")
//    List<Chat> findByUserId(@Param("userId") Integer userId);

    List<Chat> findByUsersId(Integer userId);

    @Query("SELECT c FROM Chat c WHERE :user MEMBER OF c.users AND :reqUser MEMBER OF c.users")
    Chat findChatByUsersId(@Param("user") User user, @Param("reqUser") User reqUser);

}
