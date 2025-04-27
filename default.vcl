vcl 4.0;

backend default {
    .host = "127.0.0.1";
    .port = "8081";
}

sub vcl_recv {
    if (req.url == "/api/automatepullreq") {
        return (pass);
    }
    if (req.url ~ "/protected/") {
        return (pass);
    }
    if (req.url ~ "/api/editRecipe") {
        return (pass);
    }
    if (req.url ~ "/api/addRecipe") {
        return (pass);
    }
    return (hash);
}

sub vcl_backend_response {
    unset beresp.http.Cache-Control;
    set beresp.http.Cache-Control = "herbivorene-cache, max-age=86400";
    set beresp.ttl = 86400s;
    return (deliver);
}

sub vcl_deliver {
    # Set headers to indicate whether the content was served from cache
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }

    return (deliver);
}
