package com.ganesh.service;


import com.ganesh.model.User;

import java.security.spec.ECField;

public interface UserService {
    User findUserProfileByJwt(String jwt) throws Exception;

    User findUserByEmail(String email) throws  Exception;

    User findUserById(Long userId) throws Exception;

    User updateUserProjectSize(User user, int number);


}
