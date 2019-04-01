package com.fred.homeapp.repository;

import com.fred.homeapp.domain.Cameras;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Cameras entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CamerasRepository extends JpaRepository<Cameras, Long> {

}
