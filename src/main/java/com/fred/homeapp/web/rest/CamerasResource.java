package com.fred.homeapp.web.rest;
import com.fred.homeapp.domain.Cameras;
import com.fred.homeapp.service.CamerasService;
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
 * REST controller for managing Cameras.
 */
@RestController
@RequestMapping("/api")
public class CamerasResource {

    private final Logger log = LoggerFactory.getLogger(CamerasResource.class);

    private static final String ENTITY_NAME = "cameras";

    private final CamerasService camerasService;

    public CamerasResource(CamerasService camerasService) {
        this.camerasService = camerasService;
    }

    /**
     * POST  /cameras : Create a new cameras.
     *
     * @param cameras the cameras to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cameras, or with status 400 (Bad Request) if the cameras has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cameras")
    public ResponseEntity<Cameras> createCameras(@RequestBody Cameras cameras) throws URISyntaxException {
        log.debug("REST request to save Cameras : {}", cameras);
        if (cameras.getId() != null) {
            throw new BadRequestAlertException("A new cameras cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cameras result = camerasService.save(cameras);
        return ResponseEntity.created(new URI("/api/cameras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cameras : Updates an existing cameras.
     *
     * @param cameras the cameras to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cameras,
     * or with status 400 (Bad Request) if the cameras is not valid,
     * or with status 500 (Internal Server Error) if the cameras couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cameras")
    public ResponseEntity<Cameras> updateCameras(@RequestBody Cameras cameras) throws URISyntaxException {
        log.debug("REST request to update Cameras : {}", cameras);
        if (cameras.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Cameras result = camerasService.save(cameras);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cameras.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cameras : get all the cameras.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cameras in body
     */
    @GetMapping("/cameras")
    public List<Cameras> getAllCameras() {
        log.debug("REST request to get all Cameras");
        return camerasService.findAll();
    }

    /**
     * GET  /cameras/:id : get the "id" cameras.
     *
     * @param id the id of the cameras to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cameras, or with status 404 (Not Found)
     */
    @GetMapping("/cameras/{id}")
    public ResponseEntity<Cameras> getCameras(@PathVariable Long id) {
        log.debug("REST request to get Cameras : {}", id);
        Optional<Cameras> cameras = camerasService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cameras);
    }

    /**
     * DELETE  /cameras/:id : delete the "id" cameras.
     *
     * @param id the id of the cameras to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cameras/{id}")
    public ResponseEntity<Void> deleteCameras(@PathVariable Long id) {
        log.debug("REST request to delete Cameras : {}", id);
        camerasService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
