package com.fred.homeapp.service;

import com.fred.homeapp.domain.Meteo;
import com.fred.homeapp.repository.MeteoRepository;
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
 * Service Implementation for managing Meteo.
 */
@Service
@Transactional
public class MeteoService {

    private final Logger log = LoggerFactory.getLogger(MeteoService.class);

    private final MeteoRepository meteoRepository;

    public MeteoService(MeteoRepository meteoRepository) {
        this.meteoRepository = meteoRepository;
    }

    /**
     * Save a meteo.
     *
     * @param meteo the entity to save
     * @return the persisted entity
     */
    public Meteo save(Meteo meteo) {
        log.debug("Request to save Meteo : {}", meteo);
        return meteoRepository.save(meteo);
    }

    /**
     * Get all the meteos.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Meteo> findAll() {
        log.debug("Request to get all Meteos");
        return meteoRepository.findAll();
    }


    /**
     * Get one meteo by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Meteo> findOne(Long id) {
        log.debug("Request to get Meteo : {}", id);
        return meteoRepository.findById(id);
    }

    /**
     * Delete the meteo by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Meteo : {}", id);
        meteoRepository.deleteById(id);
    }

    /**
     * Get weather values from thingspeak
     * @param place the place to get values
     * @param nb int to know if we want one or multiple data
     * @return json object of returned values
     */
    public String getThingspeak(String place, int nb) throws IOException {
        URL url;
        switch (place){
            case "bureau":
                url = new URL("https://api.thingspeak.com/channels/202140/feeds.json?results="+ nb);
                break;
            case "exterieur":
                url = new URL("https://api.thingspeak.com/channels/261091/feeds.json?results="+ nb);
                break;
            case "salon":
                url = new URL("https://api.thingspeak.com/channels/202142/feeds.json?results="+nb);
                break;
            case "serveur":
                url = new URL("https://api.thingspeak.com/channels/584111/feeds.json?results="+ nb);
                break;

            default:
                url = new URL("https://api.thingspeak.com/channels/584111/feeds.json?results="+ nb);
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
