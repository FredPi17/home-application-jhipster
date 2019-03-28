package com.fred.homeapp.repository;

import com.fred.homeapp.domain.Courbes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Courbes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourbesRepository extends JpaRepository<Courbes, Long> {

}
