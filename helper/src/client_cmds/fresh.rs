use std::path::Path;

use lm_fe_rust::{my_helper::decompress_gz, utils::MyResult};
use tokio::{
    fs::{self, File},
    io::AsyncWriteExt,
    time::Instant,
};

use crate::utils::{get_serve_pack_url, get_server_url};

pub async fn do_fresh(name: &str)->MyResult<()> {
    println!("开始构建, 请稍等片刻...");

    let node_module_dir = Path::new("node_modules/@lm_fe");

    if !node_module_dir.exists() {
        fs::create_dir_all(&node_module_dir)
            .await
            .expect("创建node_modules失败");
    }

    let source = get_serve_pack_url(&format!("{name}.tar.gz"));
    let q = format!("name={name}");
    let mut build_url = get_server_url("/build_dep");
    let get_url = get_server_url(&source);
    build_url.set_query(Some(q.as_str()));
    let start = Instant::now();
    let r = reqwest::get(build_url.clone()).await.expect("拉取请求");
    let code = r.status();
    if code.is_success() {
        println!("开始安装");
        let resp = reqwest::get(get_url.clone()).await.expect("资源请求");

        let mut file = File::create("tmp.tar.gz").await.expect("创建文件失败");
        let stream = resp.bytes().await.expect("resp bytes");
        file.write_all(&stream).await.expect("write all ");

        decompress_gz("tmp.tar.gz", node_module_dir).await;

        println!("操作成功，耗时 {:?}", start.elapsed());
    } else {
        println!("构建出错 {}", r.text().await.expect("msg"))
    }
    Ok(())
}
