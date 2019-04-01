package com.fred.homeapp.web.rest;
import com.fred.homeapp.domain.Meteo;
import com.fred.homeapp.service.MeteoService;
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
 * REST controller for managing Meteo.
 */
@RestController
@RequestMapping("/api")
public class MeteoResource {

    private final Logger log = LoggerFactory.getLogger(MeteoResource.class);

    private static final String ENTITY_NAME = "meteo";

    private final MeteoService meteoService;

    public MeteoResource(MeteoService meteoService) {
        this.meteoService = meteoService;
    }

    /**
     * POST  /meteos : Create a new meteo.
     *
     * @param meteo the meteo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new meteo, or with status 400 (Bad Request) if the meteo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/meteos")
    public ResponseEntity<Meteo> createMeteo(@RequestBody Meteo meteo) throws URISyntaxException {
        log.debug("REST request to save Meteo : {}", meteo);
        if (meteo.getId() != null) {
            throw new BadRequestAlertException("A new meteo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Meteo result = meteoService.save(meteo);
        return ResponseEntity.created(new URI("/api/meteos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /meteos : Updates an existing meteo.
     *
     * @param meteo the meteo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated meteo,
     * or with status 400 (Bad Request) if the meteo is not valid,
     * or with status 500 (Internal Server Error) if the meteo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/meteos")
    public ResponseEntity<Meteo> updateMeteo(@RequestBody Meteo meteo) throws URISyntaxException {
        log.debug("REST request to update Meteo : {}", meteo);
        if (meteo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Meteo result = meteoService.save(meteo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, meteo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /meteos : get all the meteos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of meteos in body
     */
    @GetMapping("/meteos")
    public List<Meteo> getAllMeteos() {
        log.debug("REST request to get all Meteos");
        return meteoService.findAll();
    }

    /**
     * GET  /meteos/:id : get the "id" meteo.
     *
     * @param id the id of the meteo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the meteo, or with status 404 (Not Found)
     */
    @GetMapping("/meteos/{id}")
    public ResponseEntity<Meteo> getMeteo(@PathVariable Long id) {
        log.debug("REST request to get Meteo : {}", id);
        Optional<Meteo> meteo = meteoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(meteo);
    }

    /**
     * DELETE  /meteos/:id : delete the "id" meteo.
     *
     * @param id the id of the meteo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/meteos/{id}")
    public ResponseEntity<Void> deleteMeteo(@PathVariable Long id) {
        log.debug("REST request to delete Meteo : {}", id);
        meteoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * Get only the last data of the place
     * @param place place to get data
     * @return the last data of the place
     * @throws Exception
     */
    @GetMapping("/meteos/thingspeak/{place}/{nb}")
    public String getThingspeak(@PathVariable String place, @PathVariable Integer nb) throws Exception {
        log.debug("REST request to get values from: {} with {} data", place, nb);
        return meteoService.getThingspeak(place, nb);
    }


}
