package com.ganesh.repository;

import com.ganesh.model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepository extends JpaRepository<Invitation,Long> {
    Invitation findByToken(String token);

    Invitation findByEmail(String userEmail);
}
