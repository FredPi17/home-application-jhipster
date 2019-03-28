package com.fred.homeapp.repository;

import com.fred.homeapp.domain.Meteo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Meteo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MeteoRepository extends JpaRepository<Meteo, Long> {

}
