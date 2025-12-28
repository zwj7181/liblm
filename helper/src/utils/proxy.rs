use axum::{
    extract::{Request, State},
    response::{IntoResponse, Response},
};
use hyper::{StatusCode, Uri};
use hyper_util::{client::legacy::connect::HttpConnector, rt::TokioExecutor};

#[derive(Clone)]
pub struct ProxyState {
    pub(crate) p_port: u16,
    pub(crate) p_host: String,
}

pub async fn proxy_handler(
    State(proxy_state): State<ProxyState>,
    mut req: Request,
) -> Result<Response, StatusCode> {
    let my_client = {
        
        hyper_util::client::legacy::Client::<(), ()>::builder(TokioExecutor::new())
            .build(HttpConnector::new())
    };
    let path = req.uri().path();
    let path_query = req
        .uri()
        .path_and_query()
        .map(|v| v.as_str())
        .unwrap_or(path);

    let uri = format!(
        "http://{}:{}{}",
        proxy_state.p_host, proxy_state.p_port, path_query
    );
    println!(" ==> {}", uri);
    *req.uri_mut() = Uri::try_from(uri).expect("try_from");

    Ok(my_client
        .request(req)
        .await
        .map_err(|_| StatusCode::BAD_REQUEST)?
        .into_response())
}
