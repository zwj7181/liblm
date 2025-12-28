use std::time::{Instant};

use axum::{
    routing::{get, post},
    Router,
};
use helper::{
    server_routes::{
        build_dep, check_version, create_user, pack_all, server_home, test_route,
        ServerState,
    },
    utils::{get_cwd, get_serve_pack_url, SERVER_PORT, SERVE_PACK},
};
use tower_http::services::ServeDir;

#[tokio::main]
async fn main() {
    let cwd = get_cwd();
    println!("cwd {cwd}");
    let start = Instant::now();
    // initialize tracing
    tracing_subscriber::fmt::init();
    let serve_dir_from_dist = ServeDir::new(SERVE_PACK);
    // build our application with a route
    let s = ServerState::new();
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(server_home))
        .route("/test", get(test_route))
        .route("/build_dep", get(build_dep))
        .route("/check_version", get(check_version))
        .route("/pack_all", get(pack_all))
        .nest_service(&get_serve_pack_url(""), serve_dir_from_dist)
        .route("/users", post(create_user))
        .with_state(s);

    // run our app with hyper, listening globally on port 3000
    let listen_bind = format!("0.0.0.0:{}", SERVER_PORT);
    let listener = tokio::net::TcpListener::bind(listen_bind).await.unwrap();
    println!("listen on port {}", SERVER_PORT);
    axum::serve(listener, app).await.unwrap();
}
