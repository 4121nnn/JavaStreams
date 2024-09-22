package io.nuri.streams.controller;

import io.nuri.streams.config.ProblemTitleDtoAssembler;
import io.nuri.streams.dto.OneTimeToken;
import io.nuri.streams.dto.ProblemTitleDto;
import io.nuri.streams.dto.UserRequest;
import io.nuri.streams.service.ProblemService;
import io.nuri.streams.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicApiController {

    private final UserService userService;
    private final ProblemService problemService;
    private final PagedResourcesAssembler<ProblemTitleDto> pagedResourcesAssembler;
    private final ProblemTitleDtoAssembler problemTitleDtoAssembler;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public String signUp(@RequestBody @Valid UserRequest userRequest){
        return userService.createUser(userRequest);
    }

    @PutMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public String login(@RequestBody UserRequest userRequest){
       return userService.login(userRequest);
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public PagedModel<EntityModel<ProblemTitleDto>> getProblemTitles(Pageable pageable) {
        Page<ProblemTitleDto> problemTitleDtos = problemService.getProblemTitles(pageable);
        return pagedResourcesAssembler.toModel(problemTitleDtos, problemTitleDtoAssembler);
    }

    @PostMapping("/auth/oauth2/exchange")
    @ResponseStatus(HttpStatus.OK)
    public String exchangeOneTimeToken(@RequestBody OneTimeToken token){
        return userService.exchangeOneTimeToken(token.token());
    }



}
