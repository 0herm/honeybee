vcl 4.0;

backend default {
    .host = "127.0.0.1";
    .port = "8081";
}

acl purge {
    "localhost";
    "127.0.0.1";
}

sub vcl_recv {
    if (req.method == "BAN") {
        if (!client.ip ~ purge) {
            return (synth(405));
        }
        if (!req.http.x-invalidate-pattern) {
            return (purge);
        }
        ban("req.url ~ " + req.http.x-invalidate-pattern);
        return (synth(200,"Ban added"));
    }
    if (req.url ~ "/protected/" || (req.method != "GET" && req.method != "HEAD")) {
        return (pass);
    }
    if (req.http.Cookie) {
        set req.http.X-Theme = regsub(req.http.Cookie, ".*theme=([^;]+);?.*", "\1");
    }
    return (hash);
}

sub vcl_hash {
    hash_data(req.http.X-Theme);
}

sub vcl_backend_response {
    set beresp.ttl = 7d;
    return (deliver);
}

sub vcl_deliver {
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }
    return (deliver);
}
