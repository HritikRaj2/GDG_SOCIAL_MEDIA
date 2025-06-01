package com.GDGSocialMedia.services;

import com.GDGSocialMedia.models.Chat;
import com.GDGSocialMedia.models.Message;
import com.GDGSocialMedia.models.User;
import org.springframework.stereotype.Service;

import java.util.List;


public interface MessageService {

    public Message createMessage(User user, Integer chatId, Message req) throws Exception;

    public List<Message> findChatMessages(Integer chatId) throws Exception;
}
