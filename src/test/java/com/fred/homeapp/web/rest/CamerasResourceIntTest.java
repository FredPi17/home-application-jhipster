package com.fred.homeapp.web.rest;

import com.fred.homeapp.HomeApplicationApp;

import com.fred.homeapp.domain.Cameras;
import com.fred.homeapp.repository.CamerasRepository;
import com.fred.homeapp.service.CamerasService;
import com.fred.homeapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.fred.homeapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CamerasResource REST controller.
 *
 * @see CamerasResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HomeApplicationApp.class)
public class CamerasResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LINK = "AAAAAAAAAA";
    private static final String UPDATED_LINK = "BBBBBBBBBB";

    @Autowired
    private CamerasRepository camerasRepository;

    @Autowired
    private CamerasService camerasService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCamerasMockMvc;

    private Cameras cameras;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CamerasResource camerasResource = new CamerasResource(camerasService);
        this.restCamerasMockMvc = MockMvcBuilders.standaloneSetup(camerasResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cameras createEntity(EntityManager em) {
        Cameras cameras = new Cameras()
            .name(DEFAULT_NAME)
            .link(DEFAULT_LINK);
        return cameras;
    }

    @Before
    public void initTest() {
        cameras = createEntity(em);
    }

    @Test
    @Transactional
    public void createCameras() throws Exception {
        int databaseSizeBeforeCreate = camerasRepository.findAll().size();

        // Create the Cameras
        restCamerasMockMvc.perform(post("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cameras)))
            .andExpect(status().isCreated());

        // Validate the Cameras in the database
        List<Cameras> camerasList = camerasRepository.findAll();
        assertThat(camerasList).hasSize(databaseSizeBeforeCreate + 1);
        Cameras testCameras = camerasList.get(camerasList.size() - 1);
        assertThat(testCameras.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCameras.getLink()).isEqualTo(DEFAULT_LINK);
    }

    @Test
    @Transactional
    public void createCamerasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = camerasRepository.findAll().size();

        // Create the Cameras with an existing ID
        cameras.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCamerasMockMvc.perform(post("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cameras)))
            .andExpect(status().isBadRequest());

        // Validate the Cameras in the database
        List<Cameras> camerasList = camerasRepository.findAll();
        assertThat(camerasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCameras() throws Exception {
        // Initialize the database
        camerasRepository.saveAndFlush(cameras);

        // Get all the camerasList
        restCamerasMockMvc.perform(get("/api/cameras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cameras.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].link").value(hasItem(DEFAULT_LINK.toString())));
    }
    
    @Test
    @Transactional
    public void getCameras() throws Exception {
        // Initialize the database
        camerasRepository.saveAndFlush(cameras);

        // Get the cameras
        restCamerasMockMvc.perform(get("/api/cameras/{id}", cameras.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cameras.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.link").value(DEFAULT_LINK.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCameras() throws Exception {
        // Get the cameras
        restCamerasMockMvc.perform(get("/api/cameras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCameras() throws Exception {
        // Initialize the database
        camerasService.save(cameras);

        int databaseSizeBeforeUpdate = camerasRepository.findAll().size();

        // Update the cameras
        Cameras updatedCameras = camerasRepository.findById(cameras.getId()).get();
        // Disconnect from session so that the updates on updatedCameras are not directly saved in db
        em.detach(updatedCameras);
        updatedCameras
            .name(UPDATED_NAME)
            .link(UPDATED_LINK);

        restCamerasMockMvc.perform(put("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCameras)))
            .andExpect(status().isOk());

        // Validate the Cameras in the database
        List<Cameras> camerasList = camerasRepository.findAll();
        assertThat(camerasList).hasSize(databaseSizeBeforeUpdate);
        Cameras testCameras = camerasList.get(camerasList.size() - 1);
        assertThat(testCameras.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCameras.getLink()).isEqualTo(UPDATED_LINK);
    }

    @Test
    @Transactional
    public void updateNonExistingCameras() throws Exception {
        int databaseSizeBeforeUpdate = camerasRepository.findAll().size();

        // Create the Cameras

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCamerasMockMvc.perform(put("/api/cameras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cameras)))
            .andExpect(status().isBadRequest());

        // Validate the Cameras in the database
        List<Cameras> camerasList = camerasRepository.findAll();
        assertThat(camerasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCameras() throws Exception {
        // Initialize the database
        camerasService.save(cameras);

        int databaseSizeBeforeDelete = camerasRepository.findAll().size();

        // Delete the cameras
        restCamerasMockMvc.perform(delete("/api/cameras/{id}", cameras.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cameras> camerasList = camerasRepository.findAll();
        assertThat(camerasList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cameras.class);
        Cameras cameras1 = new Cameras();
        cameras1.setId(1L);
        Cameras cameras2 = new Cameras();
        cameras2.setId(cameras1.getId());
        assertThat(cameras1).isEqualTo(cameras2);
        cameras2.setId(2L);
        assertThat(cameras1).isNotEqualTo(cameras2);
        cameras1.setId(null);
        assertThat(cameras1).isNotEqualTo(cameras2);
    }
}
