package io.nuri.streams.config;

import io.nuri.streams.dto.ProblemTitleDto;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.stereotype.Component;

@Component
public class ProblemTitleDtoAssembler implements RepresentationModelAssembler<ProblemTitleDto, EntityModel<ProblemTitleDto>> {

    @Override
    public EntityModel<ProblemTitleDto> toModel(ProblemTitleDto problemTitleDto) {
        // Here you can add HATEOAS links if needed
        return EntityModel.of(problemTitleDto);
    }
}
