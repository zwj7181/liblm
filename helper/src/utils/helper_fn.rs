use lm_fe_rust::utils::MyResult;
use reqwest::Url;
use std::{collections::HashMap, env::current_exe};
use tokio::{
    fs::File,
    io::{AsyncBufReadExt, BufReader},
};

use crate::utils::SERVER_HOST;

use super::SERVE_PACK;

pub fn get_server_url(str: &str) -> Url {
    let base_u = Url::parse(SERVER_HOST).unwrap();
    base_u.join(str).expect("base url join")
}

pub fn get_exe_name() -> String {
    let exe_name_with_version = std::env::current_exe()
        .unwrap()
        .file_name()
        .unwrap()
        .to_string_lossy()
        .to_string()
        .replace(".exe", "");
    let exe_name = exe_name_with_version.split('-').next().unwrap();
    exe_name.to_string()
}

pub fn version_to_num(v: &str) -> usize {
    let dots = v
        .split('.')
        .map(|x| usize::from_str_radix(x, 10).unwrap_or(0));

    dots.reduce(|a, b| a * 10 + b).unwrap_or(0)
}

pub fn get_cwd() -> String {
    let cwd = std::env::current_dir()
        .expect("cwd")
        .to_string_lossy()
        .to_string();
    cwd
}

pub async fn dot_env_to_map() -> MyResult<HashMap<String, String>> {
    let mut m = HashMap::new();
    let file = File::open(".env").await;
    let file = match file {
        Ok(f) => f,
        Err(e) => {
            eprintln!("Failed to open .env file: {}, try to open .env.sh", e);
            File::open(".env.sh")
                .await
                .expect("Failed to open .env.sh file")
        }
    };
    let mut reader = BufReader::new(file);
    let mut s = String::new();
    // 逐行异步读取文件
    while reader.read_line(&mut s).await? != 0 {
        if !s.contains('=') || s.starts_with('#') {
            s.clear();
            continue;
        };
        let mut split_line = s.split('=');

        let mut format_str = || -> String {
            let q = split_line.next().unwrap_or("");
            q.replace(['\'', '"'], "")
                .replace("export", "")
                .trim()
                .to_string()
        };

        m.insert(format_str(), format_str());
        s.clear();
    }

    Ok(m)
}

pub fn get_serve_pack_url(src: &str) -> String {
    if src.is_empty() {
        return format!("/{}", SERVE_PACK);
    }
    format!("/{}/{}", SERVE_PACK, src)
}

pub async fn move_exe_to_vscode_dir() {
    let cur_exe = current_exe().unwrap().canonicalize().unwrap();
    // println!("cur_exe {}", cur_exe.display())
}

