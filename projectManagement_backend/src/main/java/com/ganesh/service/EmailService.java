package com.ganesh.service;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;


public interface EmailService {

    void sendEmailWithToken(String userEmail,String link) throws MessagingException;
}
