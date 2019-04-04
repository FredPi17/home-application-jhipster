package com.fred.homeapp.service;

import com.fred.homeapp.domain.Ville;
import com.fred.homeapp.repository.VilleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Ville.
 */
@Service
@Transactional
public class VilleService {

    private final Logger log = LoggerFactory.getLogger(VilleService.class);

    private final VilleRepository villeRepository;

    public VilleService(VilleRepository villeRepository) {
        this.villeRepository = villeRepository;
    }

    /**
     * Save a ville.
     *
     * @param ville the entity to save
     * @return the persisted entity
     */
    public Ville save(Ville ville) {
        log.debug("Request to save Ville : {}", ville);
        return villeRepository.save(ville);
    }

    /**
     * Get all the villes.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Ville> findAll() {
        log.debug("Request to get all Villes");
        return villeRepository.findAll();
    }


    /**
     * Get one ville by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Ville> findOne(Long id) {
        log.debug("Request to get Ville : {}", id);
        return villeRepository.findById(id);
    }

    /**
     * Delete the ville by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Ville : {}", id);
        villeRepository.deleteById(id);
    }

    /**
     * Get data from a city with coordinates
     * @param latitude latitude of the city
     * @param longitude longitude of the city
     * @return the string of the api call
     */
    public String getDataFromVille(String latitude, String longitude, String cityName) throws IOException {
        URL url;
        if (cityName.equals("")) {
            url = new URL("http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=da5bb7fa6e69c14a816b417bfb2fe11e&units=metric");
        }
        else {
            url = new URL("http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=da5bb7fa6e69c14a816b417bfb2fe11e&units=metric");
        }

        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("Accept", "application/json");

        if (con.getResponseCode() != 200) {
            throw new RuntimeException("Failed : HTTP error code : "
                + con.getResponseCode());
        }

        BufferedReader br = new BufferedReader(new InputStreamReader(
            (con.getInputStream())));

        StringBuilder output = new StringBuilder();
        String line = null;
        while ((line = br.readLine()) != null) {
            output.append(line + "\n");
        }
        String json = output.toString();
        con.disconnect();

        return json;
    }
}
