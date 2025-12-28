use axum::{routing::any, Router};
use clap::Args;
use hyper::Uri;
use tokio::net::TcpListener;
use tower_http::{
    cors::CorsLayer,
    services::{ServeDir, ServeFile},
};

use crate::utils::{proxy_handler, ProxyState};

#[derive(Args,Clone)]
pub struct ServeAtArgs {
    /// 监听的目录
    pub dir: String,
    /// 监听的端口
    pub port: Option<u16>,

    /// 代理设置，例如 http://192.168.124.53:3351/api
    #[arg(short)]
    pub proxy: Option<String>,
}
macro_rules! ServeRouter {
    ($x:ident) => {
        Router::new()
            .fallback_service($x)
            .layer(CorsLayer::permissive())
    };
}
pub async fn serve_at(args: &ServeAtArgs) {
    let ServeAtArgs { port, dir, proxy } = args;
    let port = if let Some(p) = port { *p } else { 5566 };
    let target_path = std::path::Path::new(&dir);
    let idx_path = target_path.join("index.html");
    let serve_dir = ServeDir::new(target_path).fallback(ServeFile::new(idx_path));

    let make_service;
    if let Some(p_url) = proxy {
        let u = Uri::try_from(p_url).expect("uri try_from");
        let proxy_path = u.path();
        let proxy_host = u.host().unwrap();
        let proxy_port = u.port_u16().unwrap_or(80);
        let proxy_prefix = format!("{}/*path", proxy_path);
        make_service = ServeRouter!(serve_dir)
            .route(&proxy_prefix.clone(), any(proxy_handler))
            .with_state(ProxyState {
                p_port: proxy_port,
                p_host: proxy_host.to_owned(),
            });
    } else {
        make_service = ServeRouter!(serve_dir);
    }

    let addr = format!("0.0.0.0:{}", port);
    let tcp_listener = TcpListener::bind(addr).await.unwrap();
    println!("listening {} at {}", dir, port);
    axum::serve(tcp_listener, make_service).await.unwrap();
}
