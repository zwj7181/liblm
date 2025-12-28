
use axum::{extract::State, Json};
use lm_fe_rust::my_message::{json_data_msg, MyMessage};
use serde::Serialize;

use super::{get_exe_list, ServerState, VersionFile};

#[derive(Serialize)]
pub struct HomeMsg {
    exe: Vec<VersionFile>,
    elapsed: String,
}

pub async fn server_home(State(state): State<ServerState>) -> Json<MyMessage<HomeMsg>> {
    let l = get_exe_list().await.expect("get exe list");

    json_data_msg(
        HomeMsg {
            exe: l,
            elapsed: format!("{:#?}s", state.start.elapsed().as_secs()),
        },
        "ok?",
    )
}
