package com.backend_gundam_ecommerce.repository.httpclient;

import com.backend_gundam_ecommerce.dto.response.OutboundUserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "outbound-user-client", url = "https://www.googleapis.com")
public interface OutboundUserClient {
    @GetMapping(value = "/oauth2/v1/userinfo")
    OutboundUserResponse exchangeToken(@RequestParam(name = "alt") String alt,
                                       @RequestParam(name = "access_token") String accessToken);

}
