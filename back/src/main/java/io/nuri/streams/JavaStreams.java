package io.nuri.streams;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class JavaStreams {

	public static void main(String[] args) {
		new SpringApplicationBuilder(JavaStreams.class)
				.bannerMode(Banner.Mode.OFF)
				.run(args);
	}
}

