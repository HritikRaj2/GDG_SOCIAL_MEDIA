package com.GDGSocialMedia.services;

import com.GDGSocialMedia.models.Chat;
import com.GDGSocialMedia.models.User;

import java.util.List;

public interface ChatSevice {

    public Chat createChat(User reqUser, User user2);

    public Chat findChatById (Integer chatId) throws Exception;

    public List<Chat> findUsersChat(Integer userId);

}
