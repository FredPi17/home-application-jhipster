package com.fred.homeapp.web.rest;
import com.fred.homeapp.domain.Courbes;
import com.fred.homeapp.service.CourbesService;
import com.fred.homeapp.web.rest.errors.BadRequestAlertException;
import com.fred.homeapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Courbes.
 */
@RestController
@RequestMapping("/api")
public class CourbesResource {

    private final Logger log = LoggerFactory.getLogger(CourbesResource.class);

    private static final String ENTITY_NAME = "courbes";

    private final CourbesService courbesService;

    public CourbesResource(CourbesService courbesService) {
        this.courbesService = courbesService;
    }

    /**
     * POST  /courbes : Create a new courbes.
     *
     * @param courbes the courbes to create
     * @return the ResponseEntity with status 201 (Created) and with body the new courbes, or with status 400 (Bad Request) if the courbes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/courbes")
    public ResponseEntity<Courbes> createCourbes(@RequestBody Courbes courbes) throws URISyntaxException {
        log.debug("REST request to save Courbes : {}", courbes);
        if (courbes.getId() != null) {
            throw new BadRequestAlertException("A new courbes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Courbes result = courbesService.save(courbes);
        return ResponseEntity.created(new URI("/api/courbes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /courbes : Updates an existing courbes.
     *
     * @param courbes the courbes to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated courbes,
     * or with status 400 (Bad Request) if the courbes is not valid,
     * or with status 500 (Internal Server Error) if the courbes couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/courbes")
    public ResponseEntity<Courbes> updateCourbes(@RequestBody Courbes courbes) throws URISyntaxException {
        log.debug("REST request to update Courbes : {}", courbes);
        if (courbes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Courbes result = courbesService.save(courbes);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, courbes.getId().toString()))
            .body(result);
    }

    /**
     * GET  /courbes : get all the courbes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of courbes in body
     */
    @GetMapping("/courbes")
    public List<Courbes> getAllCourbes() {
        log.debug("REST request to get all Courbes");
        return courbesService.findAll();
    }

    /**
     * GET  /courbes/:id : get the "id" courbes.
     *
     * @param id the id of the courbes to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the courbes, or with status 404 (Not Found)
     */
    @GetMapping("/courbes/{id}")
    public ResponseEntity<Courbes> getCourbes(@PathVariable Long id) {
        log.debug("REST request to get Courbes : {}", id);
        Optional<Courbes> courbes = courbesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(courbes);
    }

    /**
     * DELETE  /courbes/:id : delete the "id" courbes.
     *
     * @param id the id of the courbes to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/courbes/{id}")
    public ResponseEntity<Void> deleteCourbes(@PathVariable Long id) {
        log.debug("REST request to delete Courbes : {}", id);
        courbesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
