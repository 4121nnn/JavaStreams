package io.nuri.streams.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.nuri.streams.dto.ProblemRequest;
import io.nuri.streams.entity.Problem;
import io.nuri.streams.service.ProblemService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AdminControllerTest {

    private MockMvc mockMvc;

    @Mock
    private ProblemService problemService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testCreateProblemWithAdminRole() throws Exception {
        Problem problem = Problem.builder()
                .title("New Title")
                .description("New Description")
                .difficulty("EASY")
                .template("class Solution {}")
                .build();
        ProblemRequest problemRequest = new ProblemRequest(
                problem,
                "class TestRunner{ }"
        );


        when(problemService.createProblem(any(ProblemRequest.class))).thenReturn(problem);

        mockMvc.perform(post("/api/admin/problem")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(problemRequest)))
                .andExpect(status().isCreated());

        verify(problemService, times(1)).createProblem(any(ProblemRequest.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testUpdateProblemWithAdminRole() throws Exception {
        Problem problem = Problem.builder()
                .id("new_title")
                .title("New Title")
                .description("New Description")
                .difficulty("EASY")
                .template("class Solution {}")
                .build();
        ProblemRequest problemRequest = new ProblemRequest(
                problem,
                "class TestRunner{ }"
        );

        mockMvc.perform(put("/api/admin/problem")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(problemRequest)))
                .andExpect(status().isOk());

        verify(problemService, times(1)).updateProblem(any(ProblemRequest.class));
    }

}
