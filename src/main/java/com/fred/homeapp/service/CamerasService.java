package com.fred.homeapp.service;

import com.fred.homeapp.domain.Cameras;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Cameras.
 */
public interface CamerasService {

    /**
     * Save a cameras.
     *
     * @param cameras the entity to save
     * @return the persisted entity
     */
    Cameras save(Cameras cameras);

    /**
     * Get all the cameras.
     *
     * @return the list of entities
     */
    List<Cameras> findAll();


    /**
     * Get the "id" cameras.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Cameras> findOne(Long id);

    /**
     * Delete the "id" cameras.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
