use crate::utils::{
    get_serve_pack_url, get_server_url, version_to_num, CLIENT_EXE_NAME, PKG_VERSION, SERVE_PACK,
};
use anyhow::{Context, Result};
use axum::{extract::Query, http::StatusCode, Json};
use lm_fe_rust::my_message::{json_data_msg, MyMessage};
use serde::{Deserialize, Serialize};
use std::path::Path;
use tokio::fs;

pub async fn check_version(q: Query<VersionQuery>) -> (StatusCode, Json<VersionMsg>) {
    let mut query_data = q.0;
    let is_windows = query_data.is_windows.map(|x| x == 1).unwrap_or(true);
    println!("query_data {:?}", query_data);
    let list = get_exe_list().await.context("exe list").unwrap();
    for entry in list {
        let name = entry.name;
        if name == query_data.n && is_windows == entry.is_exe {
            let v_str = entry.version;
            let v_num = version_to_num(&v_str);
            let q_num = version_to_num(&query_data.v);
            if v_num > q_num {
                query_data.v = v_str;
                query_data.url = Some(get_serve_pack_url(&entry.file_name));
                return (StatusCode::OK, json_data_msg(query_data, "new version"));
            }
        }
    }
    (
        StatusCode::OK,
        json_data_msg(query_data, "You're the latest version"),
    )
}
#[derive(Serialize)]
pub struct VersionFile {
    pub is_exe: bool,
    pub name: String,
    pub version: String,
    pub file_name: String,
}
pub async fn get_exe_list() -> Result<Vec<VersionFile>> {
    let path = Path::new(SERVE_PACK);
    if !path.exists() {
        fs::create_dir_all(SERVE_PACK).await?;
    }
    let entries = std::fs::read_dir(path)?;
    let result = entries
        .filter_map(|entry| {
            let entry = entry.unwrap();
            let path = entry.path();

            if path.is_file() {
                let file_name = path.file_name().unwrap().to_string_lossy().to_string();
                let a: Vec<String> = file_name
                    // .replace(".exe", "")
                    .split('-')
                    .map(|x| x.to_string())
                    .collect();
                if a.len() < 2 {
                    return None;
                }
                let version = a.get(1).unwrap();
                let exe_file = VersionFile {
                    is_exe: version.ends_with(".exe"),
                    name: a.first().unwrap().clone(),
                    version: version.replace(".exe", ""),
                    file_name,
                };
                return Some(exe_file);
            }
            None
        })
        .collect();
    Ok(result)
}

pub async fn check_version_client() -> Option<VersionMsg> {
    // let u = get_server_url(&format!(
    //     "/check_version?v={}&n={}",
    //     PKG_VERSION, CLIENT_EXE_NAME
    // ));
    let u = get_server_url(&format!(
        "/check_version?{}",
        VersionQuery::new(PKG_VERSION, CLIENT_EXE_NAME, cfg!(windows)).to_query()
    ));

    let r = reqwest::get(u).await;
    if r.is_err() {
        println!("更新服务未响应！");
        return None;
    }
    let resp = r.unwrap();
    if resp.status().is_success() {
        let res = resp.json::<VersionMsg>().await.expect("msg version");
        if res.data.url.is_some() {
            return Some(res);
        };
        None
    } else {
        None
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct VersionQuery {
    pub v: String,
    pub n: String,
    pub url: Option<String>,
    pub is_windows: Option<u8>,
}
impl VersionQuery {
    pub fn new(v: &str, n: &str, is_windows: bool) -> Self {
        Self {
            v: v.to_string(),
            n: n.to_string(),
            url: None,
            is_windows: Some(if is_windows { 1 } else { 0 }),
        }
    }
    pub fn to_query(&self) -> String {
        format!("v={}&n={}&is_windows={}", self.v, self.n, self.is_windows.unwrap_or(0))
    }
}
type VersionMsg = MyMessage<VersionQuery>;
