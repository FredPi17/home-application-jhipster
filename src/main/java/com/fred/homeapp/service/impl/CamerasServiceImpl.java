package com.fred.homeapp.service.impl;

import com.fred.homeapp.service.CamerasService;
import com.fred.homeapp.domain.Cameras;
import com.fred.homeapp.repository.CamerasRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Cameras.
 */
@Service
@Transactional
public class CamerasServiceImpl implements CamerasService {

    private final Logger log = LoggerFactory.getLogger(CamerasServiceImpl.class);

    private final CamerasRepository camerasRepository;

    public CamerasServiceImpl(CamerasRepository camerasRepository) {
        this.camerasRepository = camerasRepository;
    }

    /**
     * Save a cameras.
     *
     * @param cameras the entity to save
     * @return the persisted entity
     */
    @Override
    public Cameras save(Cameras cameras) {
        log.debug("Request to save Cameras : {}", cameras);
        return camerasRepository.save(cameras);
    }

    /**
     * Get all the cameras.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Cameras> findAll() {
        log.debug("Request to get all Cameras");
        return camerasRepository.findAll();
    }


    /**
     * Get one cameras by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Cameras> findOne(Long id) {
        log.debug("Request to get Cameras : {}", id);
        return camerasRepository.findById(id);
    }

    /**
     * Delete the cameras by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Cameras : {}", id);
        camerasRepository.deleteById(id);
    }
}
