package com.fred.homeapp.service;

import com.fred.homeapp.domain.Courbes;
import com.fred.homeapp.repository.CourbesRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Courbes.
 */
@Service
@Transactional
public class CourbesService {

    private final Logger log = LoggerFactory.getLogger(CourbesService.class);

    private final CourbesRepository courbesRepository;

    public CourbesService(CourbesRepository courbesRepository) {
        this.courbesRepository = courbesRepository;
    }

    /**
     * Save a courbes.
     *
     * @param courbes the entity to save
     * @return the persisted entity
     */
    public Courbes save(Courbes courbes) {
        log.debug("Request to save Courbes : {}", courbes);
        return courbesRepository.save(courbes);
    }

    /**
     * Get all the courbes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Courbes> findAll() {
        log.debug("Request to get all Courbes");
        return courbesRepository.findAll();
    }


    /**
     * Get one courbes by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Courbes> findOne(Long id) {
        log.debug("Request to get Courbes : {}", id);
        return courbesRepository.findById(id);
    }

    /**
     * Delete the courbes by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Courbes : {}", id);
        courbesRepository.deleteById(id);
    }
}
