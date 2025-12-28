use axum::{
    routing::{delete, get, post, put},
    Router,
};
use clap::Args;
use tokio::net::TcpListener;
use tower_http::cors::CorsLayer;

use crate::utils::{proxy_handler, ProxyState};

#[derive(Args, Clone, Copy)]
pub struct ProxyLocalArgs {
    /// 代理的本地端口
    port: u16,
    /// 暴露端口号
    export: Option<u16>,
}

pub async fn proxy_local(args: &ProxyLocalArgs) {
    let ProxyLocalArgs { port, export } = args;
    let export = if let Some(p) = export { *p } else { 4455 };

    let make_service = Router::new()
        .layer(CorsLayer::permissive())
        .route("/*path", post(proxy_handler))
        .route("/*path", get(proxy_handler))
        .route("/*path", put(proxy_handler))
        .route("/*path", delete(proxy_handler))
        .with_state(ProxyState {
            p_port: *port,
            p_host: "127.0.0.1".into(),
        });

    let addr = format!("0.0.0.0:{}", export);
    let tcp_listener = TcpListener::bind(addr).await.unwrap();
    println!("proxy {} to {}", port, export);
    axum::serve(tcp_listener, make_service).await.unwrap();
}
