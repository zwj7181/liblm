use std::env;

use tokio::{fs::File, io::AsyncWriteExt, sync::mpsc::Sender};

use crate::server_routes::check_version_client;

use super::{get_server_url, DynErr, TransMsg};

pub async fn update_self(tx: Sender<TransMsg>) -> DynErr<()> {
    let ret = check_version_client().await;
    let mut exe_path = env::current_exe().unwrap();
    exe_path.set_file_name("tmp.exe");

    if let Some(msg) = ret {
        let url = get_server_url(&msg.data.url.unwrap());
        println!("正在下载新版本...");
        let resp = reqwest::get(url).await?;

        if resp.status().is_success() {
            let mut file = File::create(&exe_path).await.expect("创建文件失败");
            let stream = resp.bytes().await.expect("resp bytes");
            file.write_all(&stream).await.expect("write all ");
            tx.send(TransMsg {
                new_exe_path: Some(exe_path.to_string_lossy().to_string()),
                new_v: Some(msg.data.v),
            })
            .await?;
        } else {
            eprintln!("请求失败，状态码: {}", resp.status());
        }
    }
    tx.send(TransMsg {
        new_exe_path: None,
        new_v: None,
    })
    .await?;
    Ok(())
}
